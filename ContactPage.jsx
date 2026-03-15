import { useState } from "react";

export default function ContactPage({ navigate }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 1400));
    setSending(false);
    setSubmitted(true);
  };

  const CONTACT_CARDS = [
    {
      icon: "✉️",
      label: "Email Us",
      value: "hello@learnpath.io",
      sub: "We reply within 24 hours",
    },
    {
      icon: "💬",
      label: "Live Chat",
      value: "Start a conversation",
      sub: "Mon–Fri, 9am–6pm EST",
    },
    {
      icon: "📍",
      label: "Office",
      value: "123 Learning Ave, SF",
      sub: "California, USA 94105",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.4; }
          70%  { transform: scale(1.18); opacity: 0;   }
          100% { transform: scale(1);   opacity: 0;   }
        }
        @keyframes checkPop {
          0%   { transform: scale(0) rotate(-20deg); opacity: 0; }
          70%  { transform: scale(1.2) rotate(4deg); opacity: 1; }
          100% { transform: scale(1)   rotate(0);    opacity: 1; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .cp-root {
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          background: #f7f7fc;
          padding-top: 68px;
        }

        /* ── Hero ── */
        .cp-hero {
          background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
          padding: 80px 32px 72px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .cp-hero::before {
          content: '';
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 60% 55% at 20% 50%, rgba(108,99,255,0.22) 0%, transparent 70%),
            radial-gradient(ellipse 50% 60% at 80% 40%, rgba(167,139,250,0.18) 0%, transparent 70%);
          pointer-events: none;
        }
        .cp-hero-eyebrow {
          display: inline-block;
          padding: 4px 14px;
          background: rgba(108,99,255,0.25);
          border: 1px solid rgba(108,99,255,0.5);
          border-radius: 100px;
          color: #c4b5fd;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 20px;
          animation: fadeUp 0.5s ease both;
        }
        .cp-hero-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(36px, 5vw, 58px);
          font-weight: 800;
          color: #fff;
          line-height: 1.1;
          margin: 0 0 16px;
          animation: fadeUp 0.55s 0.07s ease both;
        }
        .cp-hero-title span { color: #a78bfa; }
        .cp-hero-sub {
          font-size: 17px;
          color: rgba(255,255,255,0.65);
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.65;
          animation: fadeUp 0.55s 0.14s ease both;
        }

        /* ── Cards ── */
        .cp-cards-row {
          display: flex;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
          max-width: 880px;
          margin: -36px auto 0;
          padding: 0 24px;
          position: relative;
          z-index: 10;
          animation: fadeUp 0.55s 0.22s ease both;
        }
        .cp-card {
          background: #fff;
          border: 1.5px solid #ebebf5;
          border-radius: 18px;
          padding: 24px 28px;
          flex: 1;
          min-width: 200px;
          max-width: 260px;
          box-shadow: 0 8px 28px rgba(108,99,255,0.07);
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
        }
        .cp-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(108,99,255,0.13);
          border-color: #c4b5fd;
        }
        .cp-card-icon {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: #f0efff;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
          margin-bottom: 14px;
        }
        .cp-card-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          color: #9ca3af;
          margin-bottom: 4px;
        }
        .cp-card-value {
          font-size: 15px;
          font-weight: 700;
          color: #0f0c29;
          margin-bottom: 2px;
        }
        .cp-card-sub {
          font-size: 12.5px;
          color: #9ca3af;
        }

        /* ── Form section ── */
        .cp-form-wrap {
          max-width: 680px;
          margin: 56px auto 80px;
          padding: 0 24px;
          animation: fadeUp 0.55s 0.3s ease both;
        }
        .cp-form-box {
          background: #fff;
          border: 1.5px solid #ebebf5;
          border-radius: 24px;
          padding: 44px 48px;
          box-shadow: 0 12px 48px rgba(108,99,255,0.07);
        }
        .cp-form-title {
          font-family: 'Syne', sans-serif;
          font-size: 26px;
          font-weight: 800;
          color: #0f0c29;
          margin: 0 0 6px;
        }
        .cp-form-sub {
          font-size: 14px;
          color: #9ca3af;
          margin: 0 0 32px;
        }
        .cp-row { display: flex; gap: 18px; }
        .cp-field { display: flex; flex-direction: column; gap: 7px; flex: 1; margin-bottom: 20px; }
        .cp-label {
          font-size: 13px;
          font-weight: 600;
          color: #4a4a6a;
        }
        .cp-input, .cp-textarea {
          font-family: 'DM Sans', sans-serif;
          font-size: 14.5px;
          color: #0f0c29;
          background: #fafafe;
          border: 1.5px solid #e0e0f0;
          border-radius: 12px;
          padding: 12px 16px;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
          width: 100%;
          box-sizing: border-box;
        }
        .cp-input:focus, .cp-textarea:focus {
          border-color: #6C63FF;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(108,99,255,0.12);
        }
        .cp-textarea { resize: vertical; min-height: 130px; }

        .cp-submit {
          width: 100%;
          padding: 14px;
          border-radius: 13px;
          border: none;
          background: linear-gradient(135deg, #6C63FF, #4f46e5);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 6px 22px rgba(108,99,255,0.38);
          transition: transform 0.18s, box-shadow 0.18s, opacity 0.18s;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          margin-top: 8px;
        }
        .cp-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(108,99,255,0.5);
        }
        .cp-submit:disabled { opacity: 0.75; cursor: not-allowed; }

        .cp-spinner {
          width: 18px; height: 18px;
          border: 2.5px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        /* ── Success ── */
        .cp-success {
          text-align: center;
          padding: 20px 0 8px;
          animation: fadeUp 0.45s ease both;
        }
        .cp-check-wrap {
          position: relative;
          width: 72px; height: 72px;
          margin: 0 auto 20px;
        }
        .cp-check-ring {
          position: absolute; inset: 0;
          border-radius: 50%;
          background: rgba(108,99,255,0.18);
          animation: pulse-ring 1.8s ease infinite;
        }
        .cp-check-circle {
          position: absolute; inset: 6px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6C63FF, #4f46e5);
          display: flex; align-items: center; justify-content: center;
          animation: checkPop 0.5s 0.1s cubic-bezier(.34,1.56,.64,1) both;
        }
        .cp-success-title {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 800;
          color: #0f0c29;
          margin: 0 0 8px;
        }
        .cp-success-sub {
          font-size: 14.5px;
          color: #9ca3af;
          margin: 0 0 28px;
          line-height: 1.6;
        }
        .cp-back-btn {
          padding: "10px 28px";
          border-radius: 10px;
          border: 1.5px solid #e0e0f0;
          background: transparent;
          color: #4a4a6a;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.18s;
        }
        .cp-back-btn:hover { border-color: #6C63FF; color: #6C63FF; background: #f0efff; }

        @media (max-width: 560px) {
          .cp-form-box { padding: 28px 22px; }
          .cp-row { flex-direction: column; gap: 0; }
        }
      `}</style>

      <div className="cp-root">
       
        <div className="cp-hero">
          <div className="cp-hero-eyebrow">Get In Touch</div>
          <h1 className="cp-hero-title">
            We'd love to <span>hear from you</span>
          </h1>
          <p className="cp-hero-sub">
            Whether you have a question about courses, pricing, or anything else — our team is ready to answer.
          </p>
        </div>

    
        <div className="cp-cards-row">
          {CONTACT_CARDS.map((c) => (
            <div key={c.label} className="cp-card">
              <div className="cp-card-icon">{c.icon}</div>
              <div className="cp-card-label">{c.label}</div>
              <div className="cp-card-value">{c.value}</div>
              <div className="cp-card-sub">{c.sub}</div>
            </div>
          ))}
        </div>


        <div className="cp-form-wrap">
          <div className="cp-form-box">
            {submitted ? (
              <div className="cp-success">
                <div className="cp-check-wrap">
                  <div className="cp-check-ring" />
                  <div className="cp-check-circle">
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                      <path d="M6 13.5L10.5 18L20 9" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div className="cp-success-title">Message sent!</div>
                <p className="cp-success-sub">
                  Thanks for reaching out, <strong>{form.name}</strong>.<br />
                  We'll get back to you at <strong>{form.email}</strong> within 24 hours.
                </p>
                <button
                  className="cp-back-btn"
                  style={{ padding: "10px 28px" }}
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}>
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <div className="cp-form-title">Send us a message</div>
                <p className="cp-form-sub">Fill out the form and we'll be in touch soon.</p>

                <div className="cp-row">
                  <div className="cp-field">
                    <label className="cp-label">Your Name</label>
                    <input
                      className="cp-input"
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={set("name")}
                    />
                  </div>
                  <div className="cp-field">
                    <label className="cp-label">Email Address</label>
                    <input
                      className="cp-input"
                      type="email"
                      placeholder="jane@example.com"
                      value={form.email}
                      onChange={set("email")}
                    />
                  </div>
                </div>

                <div className="cp-field">
                  <label className="cp-label">Subject</label>
                  <input
                    className="cp-input"
                    placeholder="What's this about?"
                    value={form.subject}
                    onChange={set("subject")}
                  />
                </div>

                <div className="cp-field">
                  <label className="cp-label">Message</label>
                  <textarea
                    className="cp-textarea"
                    placeholder="Tell us how we can help..."
                    value={form.message}
                    onChange={set("message")}
                  />
                </div>

                <button
                  className="cp-submit"
                  onClick={handleSubmit}
                  disabled={sending || !form.name || !form.email || !form.message}>
                  {sending ? (
                    <><div className="cp-spinner" /> Sending…</>
                  ) : (
                    <>Send Message ✉️</>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}