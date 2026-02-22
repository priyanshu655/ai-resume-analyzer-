import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Nunito:wght@400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .register-page {
    min-height: 100vh;
    background: #0f0e17;
    font-family: 'Nunito', sans-serif;
    color: #fffffe;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  /* Background blobs */
  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    pointer-events: none;
  }

  .blob-teal {
    width: 420px; height: 420px;
    background: #2cb67d;
    top: -120px; left: -100px;
    opacity: 0.25;
  }

  .blob-pink {
    width: 300px; height: 300px;
    background: #e53170;
    bottom: -80px; right: -60px;
    opacity: 0.3;
  }

  .blob-orange {
    width: 260px; height: 260px;
    background: #ff8906;
    bottom: 120px; left: 60px;
    opacity: 0.15;
  }

  /* Card */
  .register-card {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 440px;
    margin: 24px;
    background: #1a1826;
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 28px;
    padding: 48px 40px;
    animation: fadeUp 0.5s ease;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Logo */
  .logo {
    font-family: 'Syne', sans-serif;
    font-size: 26px;
    font-weight: 800;
    letter-spacing: -0.5px;
    margin-bottom: 6px;
    text-align: center;
  }

  .logo .dot { color: #ff8906; }
  .logo .ai  { color: #e53170; }

  .register-tagline {
    text-align: center;
    font-size: 13px;
    color: #a7a9be;
    margin-bottom: 32px;
  }

  /* Step badge */
  .step-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 32px;
  }

  .step-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: rgba(255,255,255,0.12);
    transition: background 0.3s;
  }

  .step-dot.active { background: #e53170; width: 24px; border-radius: 4px; }
  .step-dot.done   { background: #2cb67d; }

  /* Divider */
  .divider {
    height: 1px;
    background: rgba(255,255,255,0.07);
    margin-bottom: 28px;
  }

  /* Field */
  .field {
    margin-bottom: 16px;
  }

  .field label {
    display: block;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #a7a9be;
    margin-bottom: 8px;
  }

  .input-wrap {
    position: relative;
  }

  .input-icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 15px;
    pointer-events: none;
  }

  .field input {
    width: 100%;
    padding: 14px 16px 14px 44px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 14px;
    font-family: 'Nunito', sans-serif;
    font-size: 14px;
    color: #fffffe;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
  }

  .field input:focus {
    border-color: #2cb67d;
    background: rgba(44,182,125,0.06);
  }

  .field input::placeholder { color: #4a4869; }

  /* Password strength */
  .strength-bar {
    display: flex;
    gap: 4px;
    margin-top: 8px;
  }

  .strength-seg {
    flex: 1;
    height: 3px;
    border-radius: 2px;
    background: rgba(255,255,255,0.08);
    transition: background 0.3s;
  }

  .strength-seg.weak   { background: #e53170; }
  .strength-seg.medium { background: #ff8906; }
  .strength-seg.strong { background: #2cb67d; }

  .strength-label {
    font-size: 11px;
    margin-top: 6px;
    color: #a7a9be;
  }

  /* Register button */
  .register-btn {
    width: 100%;
    margin-top: 24px;
    padding: 16px;
    border: none;
    border-radius: 14px;
    background: linear-gradient(135deg, #2cb67d 0%, #ff8906 100%);
    color: #fff;
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.02em;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    box-shadow: 0 8px 32px rgba(44,182,125,0.25);
  }

  .register-btn:hover:not(:disabled) {
    opacity: 0.88;
    transform: translateY(-1px);
  }

  .register-btn:disabled { opacity: 0.45; cursor: not-allowed; }

  .spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* Error / Success */
  .msg {
    margin-top: 14px;
    padding: 12px 16px;
    border-radius: 12px;
    font-size: 13px;
    text-align: center;
    animation: fadeUp 0.3s ease;
  }

  .msg.error   { background: rgba(229,49,112,0.1);  border: 1px solid rgba(229,49,112,0.25);  color: #e53170; }
  .msg.success { background: rgba(44,182,125,0.1);  border: 1px solid rgba(44,182,125,0.25);  color: #2cb67d; }

  /* Footer */
  .register-footer {
    margin-top: 24px;
    text-align: center;
    font-size: 12px;
    color: #4a4869;
  }

  .register-footer a {
    color: #e53170;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s;
  }

  .register-footer a:hover { color: #ff8906; }

  /* Terms */
  .terms {
    margin-top: 20px;
    font-size: 11px;
    color: #4a4869;
    text-align: center;
    line-height: 1.6;
  }

  .terms a { color: #a7a9be; text-decoration: underline; }
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

  return (
    <>
      <style>{styles}</style>
      <div className="register-page">
        <div className="blob blob-teal" />
        <div className="blob blob-pink" />
        <div className="blob blob-orange" />

        <div className="register-card">
          <div className="logo">res<span className="dot">.</span>ume<span className="ai">AI</span></div>
          <p className="register-tagline">Create your free account</p>

          {/* Step indicators */}
          <div className="step-row">
            <div className="step-dot active" />
            <div className="step-dot" />
            <div className="step-dot" />
          </div>

          <div className="divider" />

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
              <label>Email</label>
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
                    Password strength: <strong style={{ color: strength === 3 ? "#2cb67d" : strength === 2 ? "#ff8906" : "#e53170" }}>
                      {strengthLabels[strength]}
                    </strong>
                  </div>
                </>
              )}
            </div>

            <button className="register-btn" type="submit" disabled={loading}>
              {loading
                ? <><span className="spinner" /> Creating account…</>
                : "✦ Create Account"
              }
            </button>
          </form>

          {msg.text && <div className={`msg ${msg.type}`}>{msg.text}</div>}

          <p className="terms">
            By registering you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
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