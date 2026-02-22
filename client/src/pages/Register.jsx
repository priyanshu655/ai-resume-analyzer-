import { useState } from "react";
import API from "../services/Api";
import { useNavigate, Link } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #f7f5f0;
    --surface: #ffffff;
    --surface-2: #f0ede8;
    --border: #e5e0d8;
    --border-strong: #d0c8bc;
    --ink: #1a1714;
    --ink-2: #5a5550;
    --ink-3: #8a8480;
    --accent: #d4410b;
    --accent-2: #1a6b3c;
    --accent-3: #9a6700;
    --accent-pale: #fdf1ec;
    --accent-pale-2: #edf7f2;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
    --shadow-lg: 0 20px 60px rgba(0,0,0,0.10), 0 8px 24px rgba(0,0,0,0.06);
    --radius: 20px;
    --radius-sm: 10px;
    --radius-pill: 100px;
  }

  .register-page {
    min-height: 100vh;
    background: var(--bg);
    font-family: 'DM Sans', sans-serif;
    color: var(--ink);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  /* ── TEXTURE ── */
  .register-page::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  /* ── DECORATIVE ── */
  .deco {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
  }

  .deco-1 {
    width: 460px; height: 460px;
    background: radial-gradient(circle, rgba(26,107,60,0.09) 0%, transparent 70%);
    top: -150px; left: -150px;
  }

  .deco-2 {
    width: 380px; height: 380px;
    background: radial-gradient(circle, rgba(212,65,11,0.08) 0%, transparent 70%);
    bottom: -120px; right: -120px;
  }

  .deco-3 {
    width: 220px; height: 220px;
    background: radial-gradient(circle, rgba(154,103,0,0.07) 0%, transparent 70%);
    top: 35%; right: 8%;
  }

  .geo {
    position: absolute;
    pointer-events: none;
  }

  .geo-ring {
    width: 100px; height: 100px;
    border-radius: 50%;
    border: 1.5px solid var(--border);
    top: 14%; right: 10%;
    animation: floatA 9s ease-in-out infinite;
  }

  .geo-ring-2 {
    width: 54px; height: 54px;
    border-radius: 50%;
    border: 1.5px solid var(--border);
    bottom: 20%; left: 9%;
    animation: floatB 11s ease-in-out infinite;
  }

  .geo-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--border-strong);
    top: 28%; left: 7%;
    animation: floatA 13s ease-in-out infinite reverse;
  }

  .geo-cross {
    font-size: 18px;
    color: var(--border-strong);
    bottom: 25%; right: 8%;
    font-weight: 300;
    animation: floatB 10s ease-in-out infinite;
    user-select: none;
  }

  @keyframes floatA {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
  }

  @keyframes floatB {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-8px) rotate(8deg); }
  }

  /* ── CARD ── */
  .register-card {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 440px;
    margin: 24px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 48px 40px 40px;
    box-shadow: var(--shadow-lg);
    animation: fadeUp 0.5s ease;
  }

  .register-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent-2), #4ec789);
    border-radius: 24px 24px 0 0;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── LOGO ── */
  .logo-wrap { text-align: center; margin-bottom: 6px; }

  .logo {
    font-family: 'Fraunces', serif;
    font-size: 28px;
    font-weight: 900;
    color: var(--ink);
    letter-spacing: -0.5px;
    display: inline-flex;
    align-items: center;
    gap: 2px;
  }

  .logo-dot { color: var(--accent); }
  .logo-tag {
    font-size: 11px;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    background: var(--accent);
    color: white;
    padding: 2px 7px;
    border-radius: 5px;
    margin-left: 7px;
    letter-spacing: 0.05em;
    vertical-align: middle;
  }

  .register-tagline {
    text-align: center;
    font-size: 13px;
    color: var(--ink-3);
    margin-bottom: 28px;
    font-weight: 400;
  }

  /* ── STEP INDICATORS ── */
  .step-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    margin-bottom: 28px;
  }

  .step-pip {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    position: relative;
  }

  .step-pip-num {
    width: 28px; height: 28px;
    border-radius: 50%;
    border: 1.5px solid var(--border-strong);
    background: var(--surface);
    color: var(--ink-3);
    font-size: 11px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    position: relative;
    z-index: 1;
  }

  .step-pip.active .step-pip-num {
    background: var(--ink);
    border-color: var(--ink);
    color: white;
  }

  .step-pip.done .step-pip-num {
    background: var(--accent-2);
    border-color: var(--accent-2);
    color: white;
  }

  .step-pip-label {
    font-size: 9px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--ink-3);
    white-space: nowrap;
  }

  .step-pip.active .step-pip-label { color: var(--ink); }
  .step-pip.done .step-pip-label   { color: var(--accent-2); }

  .step-connector {
    flex: 1;
    height: 1.5px;
    background: var(--border);
    min-width: 36px;
    max-width: 60px;
    margin-top: -14px;
  }

  /* ── DIVIDER ── */
  .divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }

  .divider-line { flex: 1; height: 1px; background: var(--border); }

  .divider-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-3);
    white-space: nowrap;
  }

  /* ── FIELD ── */
  .field { margin-bottom: 16px; }

  .field label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink-2);
    margin-bottom: 8px;
  }

  .input-wrap { position: relative; }

  .input-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 14px;
    pointer-events: none;
    opacity: 0.6;
  }

  .field input {
    width: 100%;
    padding: 13px 16px 13px 42px;
    background: var(--surface-2);
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--ink);
    outline: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  }

  .field input:focus {
    border-color: var(--ink);
    background: var(--surface);
    box-shadow: 0 0 0 3px rgba(26,23,20,0.06);
  }

  .field input::placeholder { color: var(--ink-3); }

  /* ── PASSWORD STRENGTH ── */
  .strength-bar {
    display: flex;
    gap: 5px;
    margin-top: 10px;
  }

  .strength-seg {
    flex: 1;
    height: 3px;
    border-radius: 2px;
    background: var(--border);
    transition: background 0.3s;
  }

  .strength-seg.weak   { background: var(--accent); }
  .strength-seg.medium { background: #d4a017; }
  .strength-seg.strong { background: var(--accent-2); }

  .strength-label {
    font-size: 11px;
    margin-top: 7px;
    color: var(--ink-3);
    font-weight: 400;
  }

  .strength-label strong { font-weight: 600; }

  /* ── REGISTER BTN ── */
  .register-btn {
    width: 100%;
    margin-top: 24px;
    padding: 15px 24px;
    border: none;
    border-radius: var(--radius-sm);
    background: var(--ink);
    color: white;
    font-family: 'Fraunces', serif;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: -0.2px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    box-shadow: 0 4px 20px rgba(26,23,20,0.22);
    position: relative;
    overflow: hidden;
  }

  .register-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%);
  }

  .register-btn:hover:not(:disabled) {
    background: var(--accent-2);
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(26,107,60,0.28);
  }

  .register-btn:active:not(:disabled) { transform: translateY(0); }
  .register-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.35);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── MESSAGES ── */
  .msg {
    margin-top: 14px;
    padding: 11px 16px;
    border-radius: var(--radius-sm);
    font-size: 13px;
    text-align: center;
    animation: fadeUp 0.3s ease;
    font-weight: 500;
  }

  .msg.error   { background: var(--accent-pale);   border: 1px solid rgba(212,65,11,0.25);  color: var(--accent); }
  .msg.success { background: var(--accent-pale-2); border: 1px solid rgba(26,107,60,0.25);  color: var(--accent-2); }

  /* ── FOOTER ── */
  .register-footer {
    margin-top: 20px;
    text-align: center;
    font-size: 13px;
    color: var(--ink-3);
  }

  .register-footer a {
    color: var(--ink);
    text-decoration: none;
    font-weight: 600;
    border-bottom: 1px solid var(--border-strong);
    transition: all 0.18s ease;
    padding-bottom: 1px;
  }

  .register-footer a:hover {
    color: var(--accent);
    border-color: var(--accent);
  }

  /* ── TERMS ── */
  .terms {
    margin-top: 16px;
    font-size: 11px;
    color: var(--ink-3);
    text-align: center;
    line-height: 1.7;
  }

  .terms a {
    color: var(--ink-2);
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color 0.18s;
  }

  .terms a:hover { color: var(--ink); }

  /* ── MOBILE ── */
  @media (max-width: 480px) {
    .register-card {
      padding: 36px 24px 28px;
      border-radius: 20px;
      margin: 16px;
    }

    .geo-ring, .geo-ring-2, .geo-dot, .geo-cross { display: none; }
  }
`;

function getStrength(pwd) {
  if (!pwd) return 0;
  if (pwd.length < 5) return 1;
  if (pwd.length < 9 || !/[0-9]/.test(pwd)) return 2;
  return 3;
}

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMsg({ type: "", text: "" });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setMsg({ type: "error", text: "Please fill in all fields." });
      return;
    }
    try {
      setLoading(true);
      await API.post("/auth/register", formData);
      setMsg({ type: "success", text: "Account created! Redirecting to login…" });
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setMsg({ type: "error", text: error.response?.data?.message || "Registration failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  const strength = getStrength(formData.password);
  const strengthLabels = ["", "Weak", "Fair", "Strong"];
  const strengthClass = ["", "weak", "medium", "strong"];
  const strengthColors = ["", "var(--accent)", "#d4a017", "var(--accent-2)"];

  // Derive step states based on filled fields
  const nameOk  = formData.name.trim().length > 0;
  const emailOk = formData.email.trim().length > 0;

  return (
    <>
      <style>{styles}</style>
      <div className="register-page">

        <div className="deco deco-1" />
        <div className="deco deco-2" />
        <div className="deco deco-3" />
        <div className="geo geo-ring" />
        <div className="geo geo-ring-2" />
        <div className="geo geo-dot" />
        <div className="geo geo-cross">✕</div>

        <div className="register-card">

          <div className="logo-wrap">
            <div className="logo">
              res<span className="logo-dot">.</span>ume
              <span className="logo-tag">AI</span>
            </div>
          </div>
          <p className="register-tagline">Create your free account in seconds</p>

          {/* Step indicators */}
          <div className="step-row">
            <div className={`step-pip ${nameOk ? "done" : "active"}`}>
              <div className="step-pip-num">{nameOk ? "✓" : "1"}</div>
              <div className="step-pip-label">Name</div>
            </div>
            <div className="step-connector" />
            <div className={`step-pip ${emailOk ? "done" : nameOk ? "active" : ""}`}>
              <div className="step-pip-num">{emailOk ? "✓" : "2"}</div>
              <div className="step-pip-label">Email</div>
            </div>
            <div className="step-connector" />
            <div className={`step-pip ${strength >= 3 ? "done" : emailOk ? "active" : ""}`}>
              <div className="step-pip-num">{strength >= 3 ? "✓" : "3"}</div>
              <div className="step-pip-label">Password</div>
            </div>
          </div>

          <div className="divider">
            <div className="divider-line" />
            <div className="divider-label">Your details</div>
            <div className="divider-line" />
          </div>

          <form onSubmit={handleRegister}>
            <div className="field">
              <label>Full Name</label>
              <div className="input-wrap">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Jane Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label>Email address</label>
              <div className="input-wrap">
                <span className="input-icon">✉️</span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label>Password</label>
              <div className="input-wrap">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Min. 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              {formData.password && (
                <>
                  <div className="strength-bar">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`strength-seg ${i <= strength ? strengthClass[strength] : ""}`}
                      />
                    ))}
                  </div>
                  <div className="strength-label">
                    Password strength:{" "}
                    <strong style={{ color: strengthColors[strength] }}>
                      {strengthLabels[strength]}
                    </strong>
                  </div>
                </>
              )}
            </div>

            <button className="register-btn" type="submit" disabled={loading}>
              {loading
                ? <><span className="spinner" /> Creating account…</>
                : "Create Account →"
              }
            </button>
          </form>

          {msg.text && <div className={`msg ${msg.type}`}>{msg.text}</div>}

          <p className="terms">
            By registering you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
          </p>

          <p className="register-footer">
            Already have an account? <Link to="/">Sign in</Link>
          </p>

        </div>
      </div>
    </>
  );
}

export default Register;