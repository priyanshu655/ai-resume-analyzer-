import { useState } from "react";
import API from "../services/Api";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Nunito:wght@400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .login-page {
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
    opacity: 0.35;
  }

  .blob-pink {
    width: 400px; height: 400px;
    background: #e53170;
    top: -120px; right: -100px;
  }

  .blob-orange {
    width: 300px; height: 300px;
    background: #ff8906;
    bottom: -80px; left: -80px;
  }

  .blob-teal {
    width: 250px; height: 250px;
    background: #2cb67d;
    bottom: 100px; right: 80px;
    opacity: 0.18;
  }

  /* Card */
  .login-card {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 420px;
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
    margin-bottom: 8px;
    text-align: center;
  }

  .logo .dot   { color: #ff8906; }
  .logo .ai    { color: #e53170; }

  .login-tagline {
    text-align: center;
    font-size: 13px;
    color: #a7a9be;
    margin-bottom: 36px;
  }

  /* Divider */
  .divider {
    height: 1px;
    background: rgba(255,255,255,0.07);
    margin-bottom: 32px;
  }

  /* Field */
  .field {
    margin-bottom: 18px;
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
    border-color: #e53170;
    background: rgba(229,49,112,0.06);
  }

  .field input::placeholder { color: #4a4869; }

  /* Login button */
  .login-btn {
    width: 100%;
    margin-top: 28px;
    padding: 16px;
    border: none;
    border-radius: 14px;
    background: linear-gradient(135deg, #e53170 0%, #ff8906 100%);
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
    box-shadow: 0 8px 32px rgba(229,49,112,0.3);
  }

  .login-btn:hover:not(:disabled) {
    opacity: 0.88;
    transform: translateY(-1px);
  }

  .login-btn:disabled { opacity: 0.45; cursor: not-allowed; }

  .spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* Footer */
  .login-footer {
    margin-top: 24px;
    text-align: center;
    font-size: 12px;
    color: #4a4869;
  }

  .login-footer a {
    color: #e53170;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s;
  }

  .login-footer a:hover { color: #ff8906; }

  /* Error */
  .error-msg {
    margin-top: 14px;
    padding: 12px 16px;
    background: rgba(229,49,112,0.1);
    border: 1px solid rgba(229,49,112,0.25);
    border-radius: 12px;
    font-size: 13px;
    color: #e53170;
    text-align: center;
    animation: fadeUp 0.3s ease;
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
    } catch (err) {
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
        {/* Background blobs */}
        <div className="blob blob-pink" />
        <div className="blob blob-orange" />
        <div className="blob blob-teal" />

        <div className="login-card">
          <div className="logo">res<span className="dot">.</span>ume<span className="ai">AI</span></div>
          <p className="login-tagline">Sign in to analyze your résumé</p>

          <div className="divider" />

          <div className="field">
            <label>Email</label>
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
              : "✦ Sign In"
            }
          </button>

          {error && <div className="error-msg">{error}</div>}

          <p className="login-footer">
            Don't have an account? <a href="/register">Create one</a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;