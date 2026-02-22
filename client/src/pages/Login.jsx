import { useState } from "react";
import API from "../services/Api";
import { useNavigate } from "react-router-dom";

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
    --accent-pale: #fdf1ec;
    --accent-pale-2: #edf7f2;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
    --shadow-md: 0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04);
    --shadow-lg: 0 20px 60px rgba(0,0,0,0.10), 0 8px 24px rgba(0,0,0,0.06);
    --radius: 20px;
    --radius-sm: 10px;
    --radius-pill: 100px;
  }

  .login-page {
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
  .login-page::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  /* ── DECORATIVE SHAPES ── */
  .deco {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
  }

  .deco-1 {
    width: 480px; height: 480px;
    background: radial-gradient(circle, rgba(212,65,11,0.09) 0%, transparent 70%);
    top: -160px; right: -160px;
  }

  .deco-2 {
    width: 360px; height: 360px;
    background: radial-gradient(circle, rgba(26,107,60,0.08) 0%, transparent 70%);
    bottom: -120px; left: -120px;
  }

  .deco-3 {
    width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(212,65,11,0.06) 0%, transparent 70%);
    top: 40%; left: 8%;
  }

  /* ── GEOMETRIC ACCENTS ── */
  .geo {
    position: absolute;
    pointer-events: none;
  }

  .geo-ring {
    width: 120px; height: 120px;
    border-radius: 50%;
    border: 1.5px solid var(--border);
    top: 12%; left: 10%;
    animation: floatA 8s ease-in-out infinite;
  }

  .geo-ring-2 {
    width: 60px; height: 60px;
    border-radius: 50%;
    border: 1.5px solid var(--border);
    bottom: 18%; right: 12%;
    animation: floatB 10s ease-in-out infinite;
  }

  .geo-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--border-strong);
    bottom: 30%; left: 6%;
    animation: floatA 12s ease-in-out infinite reverse;
  }

  .geo-cross {
    font-size: 18px;
    color: var(--border-strong);
    top: 22%; right: 9%;
    font-weight: 300;
    animation: floatB 9s ease-in-out infinite;
    user-select: none;
  }

  @keyframes floatA {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
  }

  @keyframes floatB {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-8px) rotate(8deg); }
  }

  /* ── CARD ── */
  .login-card {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 420px;
    margin: 24px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 48px 40px 40px;
    box-shadow: var(--shadow-lg);
    animation: fadeUp 0.5s ease;
  }

  .login-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent), #f07040);
    border-radius: 24px 24px 0 0;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── LOGO ── */
  .logo-wrap {
    text-align: center;
    margin-bottom: 6px;
  }

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

  .login-tagline {
    text-align: center;
    font-size: 13px;
    color: var(--ink-3);
    margin-bottom: 36px;
    font-weight: 400;
    line-height: 1.6;
  }

  /* ── DIVIDER ── */
  .divider {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 28px;
  }

  .divider-line {
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  .divider-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-3);
    white-space: nowrap;
  }

  /* ── FIELD ── */
  .field {
    margin-bottom: 16px;
  }

  .field label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink-2);
    margin-bottom: 8px;
  }

  .input-wrap {
    position: relative;
  }

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

  /* ── LOGIN BTN ── */
  .login-btn {
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

  .login-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%);
  }

  .login-btn:hover:not(:disabled) {
    background: var(--accent);
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(212,65,11,0.32);
  }

  .login-btn:active:not(:disabled) {
    transform: translateY(0);
  }

  .login-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.35);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── ERROR ── */
  .error-msg {
    margin-top: 14px;
    padding: 11px 16px;
    background: var(--accent-pale);
    border: 1px solid rgba(212,65,11,0.25);
    border-radius: var(--radius-sm);
    font-size: 13px;
    color: var(--accent);
    text-align: center;
    animation: fadeUp 0.3s ease;
    font-weight: 500;
  }

  /* ── FOOTER ── */
  .login-footer {
    margin-top: 24px;
    text-align: center;
    font-size: 13px;
    color: var(--ink-3);
  }

  .login-footer a {
    color: var(--ink);
    text-decoration: none;
    font-weight: 600;
    border-bottom: 1px solid var(--border-strong);
    transition: all 0.18s ease;
    padding-bottom: 1px;
  }

  .login-footer a:hover {
    color: var(--accent);
    border-color: var(--accent);
  }

  /* ── TRUST ROW ── */
  .trust-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-top: 28px;
    padding-top: 20px;
    border-top: 1px solid var(--border);
  }

  .trust-item {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    color: var(--ink-3);
    font-weight: 500;
  }

  .trust-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: var(--accent-2);
    flex-shrink: 0;
  }

  /* ── MOBILE ── */
  @media (max-width: 480px) {
    .login-card {
      padding: 36px 24px 28px;
      border-radius: 20px;
      margin: 16px;
    }

    .geo-ring, .geo-ring-2, .geo-dot, .geo-cross { display: none; }
  }
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <>
      <style>{styles}</style>
      <div className="login-page">

        {/* Decorative background */}
        <div className="deco deco-1" />
        <div className="deco deco-2" />
        <div className="deco deco-3" />
        <div className="geo geo-ring" />
        <div className="geo geo-ring-2" />
        <div className="geo geo-dot" />
        <div className="geo geo-cross">✕</div>

        <div className="login-card">
          <div className="logo-wrap">
            <div className="logo">
              res<span className="logo-dot">.</span>ume
              <span className="logo-tag">AI</span>
            </div>
          </div>
          <p className="login-tagline">Sign in to analyze your résumé</p>

          <div className="divider">
            <div className="divider-line" />
            <div className="divider-label">Welcome back</div>
            <div className="divider-line" />
          </div>

          <div className="field">
            <label>Email address</label>
            <div className="input-wrap">
              <span className="input-icon">✉️</span>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          <div className="field">
            <label>Password</label>
            <div className="input-wrap">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          <button className="login-btn" onClick={handleLogin} disabled={loading}>
            {loading
              ? <><span className="spinner" /> Signing in…</>
              : "Sign In →"
            }
          </button>

          {error && <div className="error-msg">{error}</div>}

          <p className="login-footer">
            Don't have an account? <a href="/register">Create one</a>
          </p>

          <div className="trust-row">
            <div className="trust-item"><span className="trust-dot" />Secure login</div>
            <div class="trust-item"><span class="trust-dot" />No spam</div>
            <div className="trust-item"><span className="trust-dot" />Free to use</div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Login;