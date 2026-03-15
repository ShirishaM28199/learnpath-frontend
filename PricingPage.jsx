import { useState } from "react";
import { FAQItem, PageFooter } from "../components/shared";

function PricingPage({ navigate }) {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: "Free", price: 0, annualPrice: 0, color: "#64748b", highlight: false,
      desc: "Great for exploring and getting started.",
      features: ["Access to 200+ free courses", "Progress tracking", "Mobile app access", "Community forums", "Completion badges"],
      missing: ["Certificates", "Offline downloads", "Priority support", "Live sessions"],
      cta: "Start Free",
    },
    {
      name: "Pro", price: 29, annualPrice: 19, color: "#6C63FF", highlight: true,
      badge: "Most Popular",
      desc: "Everything you need to learn fast and earn certificates.",
      features: ["Everything in Free", "All 12,000+ courses", "Official certificates", "Offline downloads", "Priority support", "Early access to new courses", "1-on-1 mentor sessions (2/mo)"],
      missing: ["Team dashboard", "Custom learning paths"],
      cta: "Start Pro Trial",
    },
    {
      name: "Teams", price: 49, annualPrice: 35, color: "#10b981", highlight: false,
      desc: "For companies investing in their team's growth.",
      features: ["Everything in Pro", "Up to 50 seats", "Team dashboard & analytics", "Custom learning paths", "SSO & SCIM", "Dedicated account manager", "Unlimited mentor sessions"],
      missing: [],
      cta: "Contact Sales",
    },
  ];

  const faqs = [
    { q: "Can I cancel anytime?", a: "Yes. Cancel anytime from your account settings. You'll keep access until the end of your billing period with no questions asked." },
    { q: "Is there a free trial for Pro?", a: "Absolutely — Pro comes with a 14-day free trial. No credit card required to start." },
    { q: "Do certificates expire?", a: "No. Once you earn a certificate it's yours forever, accessible from your profile and shareable to LinkedIn." },
    { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, PayPal, and UPI (for India). All payments are secured by Stripe." },
    { q: "Can I switch plans?", a: "Yes, you can upgrade or downgrade at any time. We'll prorate the difference on your next billing cycle." },
    { q: "Do you offer student discounts?", a: "Yes! Students with a valid .edu email get 50% off Pro. Apply at checkout." },
  ];

  return (
    <div style={{ paddingTop: 68 }}>
     
      <section style={{ background: "linear-gradient(160deg,#0f0c29,#1a1048)", padding: "80px 28px 100px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "10%", right: "5%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle,rgba(108,99,255,0.2) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", maxWidth: 640, margin: "0 auto" }}>
          <div style={{ display: "inline-block", padding: "6px 18px", borderRadius: 100, background: "rgba(108,99,255,0.2)", color: "#a5b4fc", fontSize: 13, fontWeight: 700, marginBottom: 20 }}>PRICING</div>
          <h1 style={{ fontSize: "clamp(34px,5vw,58px)", fontWeight: 800, color: "#fff", letterSpacing: "-2px", lineHeight: 1.15, marginBottom: 20 }}>
            Simple, transparent<br />
            <span style={{ background: "linear-gradient(135deg,#6C63FF,#FFD166)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>pricing.</span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 17, lineHeight: 1.7, marginBottom: 36 }}>No hidden fees. No surprise charges. Start free, upgrade when you're ready.</p>
        
          <div style={{ display: "inline-flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 100, padding: "6px 8px 6px 20px" }}>
            <span style={{ color: !annual ? "#fff" : "#64748b", fontSize: 14, fontWeight: 600, transition: "color 0.2s" }}>Monthly</span>
            <button onClick={() => setAnnual(a => !a)} style={{ width: 48, height: 26, borderRadius: 100, background: annual ? "#6C63FF" : "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", position: "relative", transition: "background 0.3s", flexShrink: 0 }}>
              <span style={{ position: "absolute", top: 3, left: annual ? 24 : 3, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left 0.25s", display: "block" }} />
            </button>
            <span style={{ color: annual ? "#fff" : "#64748b", fontSize: 14, fontWeight: 600, transition: "color 0.2s" }}>Annual</span>
            <span style={{ background: "#FFD166", color: "#1a1a2e", fontSize: 12, fontWeight: 800, padding: "3px 10px", borderRadius: 100 }}>Save 35%</span>
          </div>
        </div>
      </section>


      <section style={{ maxWidth: 1100, margin: "-48px auto 0", padding: "0 28px 80px", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24, position: "relative", zIndex: 10 }}>
        {plans.map(plan => (
          <div key={plan.name} style={{ background: plan.highlight ? "linear-gradient(160deg,#0f0c29,#1a1048)" : "#fff", borderRadius: 24, padding: "36px 32px", boxShadow: plan.highlight ? "0 24px 60px rgba(108,99,255,0.3)" : "0 4px 24px rgba(0,0,0,0.08)", border: plan.highlight ? "2px solid rgba(108,99,255,0.4)" : "2px solid #f0f4f8", position: "relative", overflow: "hidden" }}>
            {plan.highlight && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg,#6C63FF,#a78bfa,#FFD166)" }} />}
            {plan.badge && (
              <div style={{ position: "absolute", top: 20, right: 20, background: "linear-gradient(135deg,#6C63FF,#4f46e5)", color: "#fff", fontSize: 11, fontWeight: 800, padding: "4px 12px", borderRadius: 100 }}>{plan.badge}</div>
            )}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: plan.highlight ? "#a5b4fc" : plan.color, marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>{plan.name}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 52, fontWeight: 800, color: plan.highlight ? "#fff" : "#1a1a2e", letterSpacing: "-2px" }}>
                  ${annual ? plan.annualPrice : plan.price}
                </span>
                {plan.price > 0 && <span style={{ color: plan.highlight ? "#64748b" : "#94a3b8", fontSize: 15 }}>/mo</span>}
              </div>
              {plan.price > 0 && annual && <div style={{ fontSize: 13, color: plan.highlight ? "#64748b" : "#94a3b8" }}>billed ${(annual ? plan.annualPrice : plan.price) * 12}/year</div>}
              <p style={{ color: plan.highlight ? "#94a3b8" : "#64748b", fontSize: 14, marginTop: 12, lineHeight: 1.6 }}>{plan.desc}</p>
            </div>
            <button onClick={() => navigate("/register")}
              style={{ width: "100%", padding: "14px", borderRadius: 12, background: plan.highlight ? "linear-gradient(135deg,#6C63FF,#4f46e5)" : plan.name === "Teams" ? "linear-gradient(135deg,#10b981,#059669)" : "#f8f9fe", color: plan.highlight || plan.name === "Teams" ? "#fff" : "#1a1a2e", border: plan.highlight ? "none" : "2px solid #e2e8f0", fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 28, boxShadow: plan.highlight ? "0 4px 16px rgba(108,99,255,0.35)" : "none", transition: "all 0.2s" }}>
              {plan.cta} →
            </button>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {plan.features.map(f => (
                <div key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: plan.highlight ? "#a78bfa" : plan.color, fontWeight: 700, fontSize: 14, flexShrink: 0 }}>✓</span>
                  <span style={{ color: plan.highlight ? "#cbd5e0" : "#4a5568", fontSize: 14 }}>{f}</span>
                </div>
              ))}
              {plan.missing.map(f => (
                <div key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start", opacity: 0.4 }}>
                  <span style={{ color: "#94a3b8", fontSize: 14, flexShrink: 0 }}>✕</span>
                  <span style={{ color: "#94a3b8", fontSize: 14 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      
      <section style={{ background: "#fff", padding: "80px 28px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(24px,4vw,38px)", fontWeight: 800, color: "#1a1a2e", letterSpacing: "-1px" }}>Compare plans</h2>
          </div>
          <div style={{ borderRadius: 20, overflow: "hidden", border: "1px solid #e8ecf4", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", background: "#f8f9fe", padding: "16px 24px", borderBottom: "1px solid #e8ecf4" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.5 }}>Feature</span>
              {["Free","Pro","Teams"].map(p => <span key={p} style={{ fontSize: 14, fontWeight: 700, color: p === "Pro" ? "#6C63FF" : "#1a1a2e", textAlign: "center" }}>{p}</span>)}
            </div>
            {[
              ["Course library", "200+", "12,000+", "12,000+"],
              ["Completion certificates", "✕", "✓", "✓"],
              ["Offline downloads", "✕", "✓", "✓"],
              ["Mobile app", "✓", "✓", "✓"],
              ["Mentor sessions", "✕", "2/month", "Unlimited"],
              ["Team dashboard", "✕", "✕", "✓"],
              ["Priority support", "✕", "✓", "Dedicated"],
              ["Custom learning paths", "✕", "✕", "✓"],
              ["SSO / SCIM", "✕", "✕", "✓"],
            ].map(([feat, ...vals], i) => (
              <div key={feat} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", padding: "16px 24px", borderBottom: i < 8 ? "1px solid #f0f4f8" : "none", background: i % 2 === 0 ? "#fff" : "#fafafa", alignItems: "center" }}>
                <span style={{ fontSize: 14, color: "#4a5568", fontWeight: 500 }}>{feat}</span>
                {vals.map((v, vi) => (
                  <span key={vi} style={{ textAlign: "center", fontSize: 14, fontWeight: v === "✓" ? 700 : 500, color: v === "✓" ? "#6C63FF" : v === "✕" ? "#cbd5e0" : "#1a1a2e" }}>{v}</span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

    
      <section style={{ background: "#f8f9fe", padding: "80px 28px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-block", padding: "6px 18px", borderRadius: 100, background: "#f0efff", color: "#6C63FF", fontSize: 13, fontWeight: 700, marginBottom: 16 }}>FAQ</div>
            <h2 style={{ fontSize: "clamp(24px,4vw,38px)", fontWeight: 800, color: "#1a1a2e", letterSpacing: "-1px" }}>Common questions</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>


      <section style={{ background: "linear-gradient(135deg,#6C63FF,#4f46e5)", padding: "80px 28px", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(26px,4vw,44px)", fontWeight: 800, color: "#fff", marginBottom: 16, letterSpacing: "-1px" }}>Start learning today.</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, marginBottom: 36, lineHeight: 1.7 }}>Free forever on the basics. Upgrade when you need more. Cancel anytime.</p>
          <button onClick={() => navigate("/register")} style={{ padding: "16px 44px", borderRadius: 12, background: "#fff", color: "#4f46e5", border: "none", fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 24px rgba(0,0,0,0.2)" }}>Get Started Free →</button>
        </div>
      </section>

      <PageFooter navigate={navigate} />
    </div>
  );
}
export default PricingPage;