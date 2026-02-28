import { onDocumentUpdated } from 'firebase-functions/v2/firestore';
import { onCall, HttpsError, onRequest } from 'firebase-functions/v2/https';
import admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';

admin.initializeApp();
const db = admin.firestore();

// Initialize Express App
const app = express();

// Use CORS with origin true (allows Vercel production domain)
app.use(cors({ origin: true }));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Example route for MongoDB/Secrets (Gen 2 compatible)
app.get('/api-config', (req, res) => {
    res.json({
        mongodbSet: !!process.env.MONGODB_URI,
        secretKeySet: !!process.env.SECRET_KEY
    });
});

// Primary API Function Export
export const api = onRequest(app);

// CRUD Helper Methods
const getCollection = async (coll, res) => {
    try {
        const snapshot = await db.collection(coll).get();
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getDoc = async (coll, id, res) => {
    try {
        const doc = await db.collection(coll).doc(id).get();
        if (!doc.exists) return res.status(404).json({ error: 'Not found' });
        res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createDoc = async (coll, data, res) => {
    try {
        const docRef = await db.collection(coll).add({ ...data, createdAt: admin.firestore.FieldValue.serverTimestamp() });
        res.status(201).json({ id: docRef.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateDoc = async (coll, id, data, res) => {
    try {
        await db.collection(coll).doc(id).update({ ...data, updatedAt: admin.firestore.FieldValue.serverTimestamp() });
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteDoc = async (coll, id, res) => {
    try {
        await db.collection(coll).doc(id).delete();
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Routes
['students', 'faculty', 'circulars'].forEach(coll => {
    app.get(`/${coll}`, (req, res) => getCollection(coll, res));
    app.get(`/${coll}/:id`, (req, res) => getDoc(coll, req.params.id, res));
    app.post(`/${coll}`, (req, res) => createDoc(coll, req.body, res));
    app.patch(`/${coll}/:id`, (req, res) => updateDoc(coll, req.params.id, req.body, res));
    app.delete(`/${coll}/:id`, (req, res) => deleteDoc(coll, req.params.id, res));
});

// Seed route
app.get('/seed', async (req, res) => {
    try {
        const batch = db.batch();

        // Sample Students
        const students = [
            { name: "John Doe", rollNumber: "22QIS01", branch: "CSE", cgpa: 8.5 },
            { name: "Jane Smith", rollNumber: "22QIS02", branch: "ECE", cgpa: 9.0 },
            { name: "Bob Johnson", rollNumber: "22QIS03", branch: "MECH", cgpa: 7.5 },
            { name: "Alice Brown", rollNumber: "22QIS04", branch: "CIVIL", cgpa: 8.0 },
            { name: "Charlie Davis", rollNumber: "22QIS05", branch: "CSDS", cgpa: 8.8 }
        ];

        // Sample Faculty
        const faculty = [
            { name: "Dr. Rama Rao", department: "CSE", role: "HOD" },
            { name: "Prof. Lakshmi", department: "ECE", role: "Professor" }
        ];

        // Sample Circulars
        const circulars = [
            { title: "Exam Schedule", category: "Exam", date: "2026-03-01" },
            { title: "Placement Drive", category: "Placement", date: "2026-03-05" },
            { title: "Holiday Notice", category: "General", date: "2026-03-10" }
        ];

        students.forEach(s => batch.set(db.collection('students').doc(), s));
        faculty.forEach(f => batch.set(db.collection('faculty').doc(), f));
        circulars.forEach(c => batch.set(db.collection('circulars').doc(), c));

        await batch.commit();
        res.status(200).json({ message: "Seeding complete" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Existing Firestore and Callable Functions
// ...

/**
 * 1. Performance Risk Prediction
 * Triggered automatically when a student doc is updated.
 */
export const calculateRiskScore = onDocumentUpdated("students/{studentId}", async (event) => {
    const newValue = event.data.after.data();
    const oldValue = event.data.before.data();

    // Prevent infinite loops and only run if relevant data changed
    if (newValue.attendance === oldValue.attendance &&
        newValue.cgpa === oldValue.cgpa &&
        newValue.internalMarks === oldValue.internalMarks) {
        return null;
    }

    const attendance = newValue.attendance || 0;
    const cgpaPercent = (newValue.cgpa || 0) * 10;
    const internalMarksPercent = newValue.internalMarks || 0;

    // Formula: (0.4 * Attendance) + (0.3 * CGPA%) + (0.3 * InternalMarks%)
    const riskScore = (0.4 * attendance) + (0.3 * cgpaPercent) + (0.3 * internalMarksPercent);

    let riskLevel = "Safe";
    if (riskScore < 60) riskLevel = "High Risk";
    else if (riskScore < 75) riskLevel = "Moderate Risk";

    console.log(`Updating student ${event.params.studentId} with Risk Score: ${riskScore} (${riskLevel})`);

    return event.data.after.ref.update({
        riskScore: Math.round(riskScore),
        riskLevel: riskLevel
    });
});

/**
 * 2. Smart Placement Readiness Score
 * Callable function for students to get their latest score.
 */
export const getPlacementReadiness = onCall(async (request) => {
    const uid = request.auth?.uid;
    if (!uid) throw new HttpsError('unauthenticated', 'The function must be called while authenticated.');

    const studentDoc = await db.collection('students').doc(uid).get();
    if (!studentDoc.exists) throw new HttpsError('not-found', 'Student profile not found.');

    const data = studentDoc.data();
    const resumeScore = data.resumeScore || 0;
    const cgpaPercent = (data.cgpa || 0) * 10;
    const skillsCount = (data.skills || []).length;
    const internshipCount = (data.internships || []).length;

    const skillScore = (skillsCount / 8) * 100;
    const internshipScore = Math.min((internshipCount / 3) * 100, 100);

    // Formula: (0.35 * ResumeScore) + (0.25 * CGPA%) + (0.25 * SkillScore) + (0.15 * InternshipScore)
    const placementScore = (0.35 * resumeScore) + (0.25 * cgpaPercent) + (0.25 * skillScore) + (0.15 * internshipScore);

    let level = "Needs Improvement";
    if (placementScore > 80) level = "Excellent";
    else if (placementScore > 60) level = "Good";

    const result = {
        score: Math.round(placementScore),
        level: level,
        lastCalculated: admin.firestore.FieldValue.serverTimestamp()
    };

    await db.collection('students').doc(uid).update({ placementReadinessScore: result.score });

    return result;
});

/**
 * 3. Skill Gap Analyzer
 */
export const analyzeSkillGap = onCall(async (request) => {
    const uid = request.auth?.uid;
    const { companyName } = request.data;

    if (!uid || !companyName) throw new HttpsError('invalid-argument', 'Missing student UID or company name.');

    const [studentDoc, companyDoc] = await Promise.all([
        db.collection('students').doc(uid).get(),
        db.collection('companySkills').where('name', '==', companyName).limit(1).get()
    ]);

    if (!studentDoc.exists || companyDoc.empty) throw new HttpsError('not-found', 'Student or Company data missing.');

    const studentSkills = studentDoc.data().skills || [];
    const requiredSkills = companyDoc.docs[0].data().skills || [];

    const commonSkills = studentSkills.filter(s => requiredSkills.includes(s));
    const missingSkills = requiredSkills.filter(s => !studentSkills.includes(s));
    const matchPercent = (commonSkills.length / requiredSkills.length) * 100;

    return {
        matchPercentage: Math.round(matchPercent),
        missingSkills: missingSkills,
        commonSkills: commonSkills
    };
});

/**
 * 4. Auth: Set Custom Claims
 * Securely set user roles.
 */
export const setUserRole = onCall(async (request) => {
    if (!request.auth?.token.admin) {
        throw new HttpsError('permission-denied', 'Only admins can set user roles.');
    }

    const { targetUid, role, branch } = request.data;
    const claims = {
        admin: role === 'Admin',
        faculty: role === 'Faculty',
        student: role === 'Student',
        branch: branch
    };

    await admin.auth().setCustomUserClaims(targetUid, claims);
    await db.collection('users').doc(targetUid).update({ role, branch });

    return { success: true };
});

/**
 * 5. Digital ID Card Generator
 */
export const generateDigitalID = onCall(async (request) => {
    const uid = request.auth?.uid;
    if (!uid) throw new HttpsError('unauthenticated', 'Must be authenticated.');

    const studentDoc = await db.collection('students').doc(uid).get();
    if (!studentDoc.exists) throw new HttpsError('not-found', 'Student data not found.');

    const data = studentDoc.data();

    // Logic to generate QR code or unique identifier can reside here
    // For now returning the structured data for the frontend component to render
    return {
        name: data.name,
        rollNumber: data.rollNumber,
        branch: data.branch,
        validUntil: "2028-06-30",
        idHash: Buffer.from(`${uid}-${data.rollNumber}`).toString('base64'),
        photoUrl: data.photoUrl || null
    };
});
