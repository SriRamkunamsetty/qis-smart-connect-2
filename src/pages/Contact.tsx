import { useState } from 'react';
import { Mail, Phone, MapPin, ChevronDown, ChevronUp, Send } from 'lucide-react';

const faqs = [
  { q: 'What is the admission process?', a: 'Applications open in January. Submit online application, clear merit-based selection, verify documents, and complete fee payment.' },
  { q: 'What scholarships are available?', a: 'We offer merit scholarships (up to 100% fee waiver), sports scholarships, and need-based financial aid.' },
  { q: 'What is the average placement package?', a: 'The average CTC offered is 8.5 LPA, with the highest package reaching 42 LPA from top MNCs.' },
  { q: 'Is on-campus accommodation available?', a: 'Yes, we have separate hostel facilities for boys and girls with all modern amenities, sports, and dining.' },
  { q: 'What entrance exams are accepted?', a: 'JEE Mains, KCET, COMEDK, and our own institute-level entrance test are all accepted.' },
];

export default function Contact() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [sent, setSent] = useState(false);

  return (
    <div className="page-transition min-h-screen pt-28 pb-20">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <h1 className="section-title mb-4">Get in <span className="gradient-text">Touch</span></h1>
          <p className="section-subtitle">We'd love to hear from you. Reach out anytime.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {[
              { icon: MapPin, label: 'Visit Us', value: 'Ongole, Prakasam District, Andhra Pradesh - 523272', color: 'text-red-500 bg-red-500/10' },
              { icon: Phone, label: 'Call Us', value: '+91 80 2345 6789\n+91 80 2345 6790', color: 'text-green-500 bg-green-500/10' },
              { icon: Mail, label: 'Email Us', value: 'info@qiscet.edu.in\nadmissions@qiscet.edu.in', color: 'text-primary bg-primary/10' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="feature-card flex gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold mb-1">{label}</p>
                  {value.split('\n').map(v => (
                    <p key={v} className="text-sm text-muted-foreground">{v}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* Office Hours */}
            <div className="feature-card p-5">
              <h4 className="font-medium text-sm mb-3">Office Hours</h4>
              <div className="space-y-2">
                {[
                  { day: 'Monday - Friday', hours: '9:00 AM – 5:00 PM' },
                  { day: 'Saturday', hours: '9:00 AM – 1:00 PM' },
                  { day: 'Sunday', hours: 'Closed' },
                ].map(item => (
                  <div key={item.day} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{item.day}</span>
                    <span className="font-medium">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="feature-card p-8 text-center h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                  <Send className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="font-grotesk font-bold text-xl mb-2">Message Sent!</h3>
                <p className="text-muted-foreground text-sm mb-6">We'll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} className="btn-outline text-sm">Send Another</button>
              </div>
            ) : (
              <form
                className="feature-card p-8 space-y-5"
                onSubmit={e => { e.preventDefault(); setSent(true); }}
              >
                <h3 className="font-grotesk font-bold text-xl">Send us a Message</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {[
                    { label: 'Full Name', placeholder: 'John Doe', type: 'text' },
                    { label: 'Email', placeholder: 'john@email.com', type: 'email' },
                    { label: 'Phone', placeholder: '+91 XXXXX XXXXX', type: 'tel' },
                    { label: 'Subject', placeholder: 'Inquiry about admission', type: 'text' },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="block text-sm font-medium mb-2">{f.label}</label>
                      <input
                        type={f.type}
                        placeholder={f.placeholder}
                        className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-all"
                        required
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us how we can help..."
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-all resize-none"
                    required
                  />
                </div>
                <button type="submit" className="btn-primary w-full justify-center">
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="font-grotesk font-bold text-2xl text-center mb-8">Frequently Asked <span className="gradient-text">Questions</span></h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="feature-card">
                <button
                  className="w-full text-left flex items-start justify-between gap-4"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm font-medium">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  }
                </button>
                {openFaq === i && (
                  <p className="text-sm text-muted-foreground mt-3 pt-3 border-t border-border animate-fade-in leading-relaxed">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
