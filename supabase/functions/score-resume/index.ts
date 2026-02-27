import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { resume, action } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    let systemPrompt = "";
    let userPrompt = "";

    if (action === "score") {
      systemPrompt = `You are an expert resume reviewer and career counselor. Analyze the resume and return a JSON response with this exact structure:
{
  "score": <number 0-100>,
  "breakdown": {
    "skills": <number 0-20>,
    "experience": <number 0-20>,
    "education": <number 0-15>,
    "projects": <number 0-20>,
    "formatting": <number 0-10>,
    "keywords": <number 0-15>
  },
  "suggestions": ["suggestion1", "suggestion2", ...],
  "missingKeywords": ["keyword1", "keyword2", ...],
  "bulletImprovements": ["improved bullet1", "improved bullet2", ...]
}
Be strict but fair. A typical fresh graduate with basic info should score 30-50. Only well-rounded resumes score 70+.`;
      userPrompt = `Score this resume:\n\nName: ${resume.name}\nEmail: ${resume.email}\nPhone: ${resume.phone}\nSummary: ${resume.summary}\nEducation: ${resume.education}\nSkills: ${resume.skills}\nProjects: ${resume.projects}\nExperience: ${resume.experience}`;
    } else if (action === "enhance") {
      systemPrompt = `You are an expert resume writer. Improve the provided bullet points and descriptions to be more impactful, using action verbs and quantifiable achievements. Return JSON:
{
  "enhancedSummary": "improved summary",
  "enhancedExperience": "improved experience with bullet points",
  "enhancedProjects": "improved projects with impact metrics"
}`;
      userPrompt = `Enhance this resume content:\nSummary: ${resume.summary}\nExperience: ${resume.experience}\nProjects: ${resume.projects}\nSkills: ${resume.skills}`;
    } else if (action === "skill-gap") {
      systemPrompt = `You are a career advisor. Given a student's current skills and their dream company, analyze the skill gap. Return JSON:
{
  "matchPercentage": <number 0-100>,
  "matchedSkills": ["skill1", "skill2"],
  "missingSkills": ["skill1", "skill2"],
  "recommendations": ["recommendation1", "recommendation2"],
  "learningPath": [{"skill": "name", "resource": "where to learn", "timeEstimate": "X weeks"}]
}`;
      userPrompt = `Student skills: ${resume.skills}\nDream company: ${resume.company}\nBranch: ${resume.branch}`;
    } else if (action === "career-roadmap") {
      systemPrompt = `You are a career counselor. Given a career goal, provide a detailed roadmap. Return JSON:
{
  "title": "Career Goal",
  "stages": [
    {"phase": "Phase 1", "duration": "X months", "skills": ["skill1"], "courses": ["course1"], "certifications": ["cert1"], "activities": ["activity1"]}
  ],
  "internshipTypes": ["type1"],
  "expectedSalary": { "entry": "X LPA", "mid": "X LPA", "senior": "X LPA" }
}`;
      userPrompt = `Career goal: ${resume.careerGoal}\nCurrent branch: ${resume.branch}\nCurrent skills: ${resume.skills}`;
    } else {
      return new Response(JSON.stringify({ error: "Invalid action" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add more credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiResult = await response.json();
    const content = aiResult.choices?.[0]?.message?.content || "";

    // Extract JSON from response
    let parsed;
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : { error: "Could not parse AI response" };
    } catch {
      parsed = { error: "Could not parse AI response", raw: content };
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("score-resume error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
