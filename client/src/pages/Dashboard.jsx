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
    --accent-3: #b5490d;
    --accent-pale: #fdf1ec;
    --accent-pale-2: #edf7f2;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
    --shadow-md: 0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04);
    --shadow-lg: 0 12px 40px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06);
    --radius: 16px;
    --radius-sm: 10px;
    --radius-pill: 100px;
  }

  .dashboard {
    min-height: 100vh;
    background: var(--bg);
    font-family: 'DM Sans', sans-serif;
    color: var(--ink);
  }

  /* ── TEXTURE OVERLAY ── */
  .dashboard::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  /* ── NAV ── */
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 32px;
    background: rgba(247,245,240,0.9);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .logo {
    font-family: 'Fraunces', serif;
    font-size: 22px;
    font-weight: 900;
    color: var(--ink);
    letter-spacing: -0.5px;
    display: flex;
    align-items: center;
    gap: 2px;
  }

  .logo-dot { color: var(--accent); }
  .logo-tag {
    font-size: 10px;
    font-weight: 600;
    font-family: 'DM Sans', sans-serif;
    background: var(--accent);
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
    margin-left: 6px;
    letter-spacing: 0.05em;
    vertical-align: middle;
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .btn-ghost {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    background: transparent;
    border: 1px solid var(--border-strong);
    color: var(--ink-2);
    padding: 8px 16px;
    border-radius: var(--radius-pill);
    cursor: pointer;
    transition: all 0.18s ease;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .btn-ghost:hover {
    background: var(--ink);
    border-color: var(--ink);
    color: white;
  }

  .btn-history {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    background: var(--accent-pale-2);
    border: 1px solid rgba(26,107,60,0.25);
    color: var(--accent-2);
    padding: 8px 16px;
    border-radius: var(--radius-pill);
    cursor: pointer;
    transition: all 0.18s ease;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .btn-history:hover {
    background: var(--accent-2);
    border-color: var(--accent-2);
    color: white;
  }

  /* ── HERO ── */
  .hero {
    text-align: center;
    padding: 64px 24px 44px;
    position: relative;
    z-index: 1;
  }

  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--accent-pale);
    border: 1px solid rgba(212,65,11,0.2);
    color: var(--accent);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: var(--radius-pill);
    margin-bottom: 24px;
  }

  .hero-eyebrow::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }

  .hero h1 {
    font-family: 'Fraunces', serif;
    font-size: clamp(36px, 6vw, 66px);
    font-weight: 900;
    line-height: 1.05;
    letter-spacing: -2px;
    color: var(--ink);
    margin-bottom: 18px;
  }

  .hero h1 em {
    font-style: italic;
    color: var(--accent);
  }

  .hero h1 .teal { color: var(--accent-2); }

  .hero-sub {
    font-size: 15px;
    color: var(--ink-2);
    max-width: 400px;
    margin: 0 auto;
    line-height: 1.8;
    font-weight: 400;
  }

  /* ── STEP INDICATORS ── */
  .steps {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    margin: 32px auto 0;
    max-width: 420px;
  }

  .step-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    flex: 1;
  }

  .step-num {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--surface);
    border: 1.5px solid var(--border-strong);
    color: var(--ink-3);
    font-size: 12px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .step-label {
    font-size: 10px;
    color: var(--ink-3);
    font-weight: 500;
    text-align: center;
    white-space: nowrap;
  }

  .step-line {
    flex: 1;
    height: 1px;
    background: var(--border-strong);
    margin-top: -26px;
    max-width: 48px;
  }

  /* ── MAIN ── */
  .main {
    position: relative;
    z-index: 1;
    max-width: 900px;
    margin: 0 auto;
    padding: 0 24px 100px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .full-col { grid-column: 1 / -1; }

  /* ── CARDS ── */
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 24px;
    box-shadow: var(--shadow-sm);
    transition: box-shadow 0.2s ease;
  }

  .card:hover {
    box-shadow: var(--shadow-md);
  }

  .card-header {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 18px;
  }

  .card-num {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: var(--ink);
    color: white;
    font-size: 11px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .card-title {
    font-family: 'Fraunces', serif;
    font-size: 16px;
    font-weight: 700;
    color: var(--ink);
    line-height: 1.2;
  }

  .card-sub {
    font-size: 12px;
    color: var(--ink-3);
    margin-top: 3px;
    font-weight: 400;
  }

  /* ── FILE DROP ── */
  .file-drop {
    border: 1.5px dashed var(--border-strong);
    border-radius: var(--radius-sm);
    padding: 32px 20px;
    text-align: center;
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease;
    background: var(--surface-2);
  }

  .file-drop:hover {
    border-color: var(--accent);
    background: var(--accent-pale);
  }

  .file-drop.has-file {
    border-style: solid;
    border-color: var(--accent-2);
    background: var(--accent-pale-2);
  }

  .file-drop input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    width: 100%;
  }

  .file-drop-icon {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: var(--surface);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    margin: 0 auto 12px;
    box-shadow: var(--shadow-sm);
  }

  .file-drop.has-file .file-drop-icon {
    background: var(--accent-pale-2);
    border-color: rgba(26,107,60,0.2);
  }

  .file-drop p {
    font-size: 12px;
    color: var(--ink-3);
    font-weight: 400;
  }

  .file-name {
    font-size: 12px;
    font-weight: 600 !important;
    color: var(--accent-2) !important;
    word-break: break-all;
  }

  .file-hint {
    font-size: 11px;
    color: var(--ink-3);
    margin-top: 4px;
    font-weight: 400;
  }

  /* ── TEXTAREA ── */
  textarea {
    width: 100%;
    height: 140px;
    background: var(--surface-2);
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 14px 16px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: var(--ink);
    resize: none;
    outline: none;
    line-height: 1.75;
    transition: border-color 0.2s, background 0.2s;
  }

  textarea:focus {
    border-color: var(--ink);
    background: white;
  }

  textarea::placeholder { color: var(--ink-3); }

  /* ── ANALYZE BTN ── */
  .analyze-btn {
    width: 100%;
    padding: 17px 24px;
    border: none;
    border-radius: var(--radius-sm);
    background: var(--ink);
    color: white;
    font-family: 'Fraunces', serif;
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.3px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    box-shadow: 0 4px 20px rgba(26,23,20,0.25);
    position: relative;
    overflow: hidden;
  }

  .analyze-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%);
  }

  .analyze-btn:hover:not(:disabled) {
    background: var(--accent);
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(212,65,11,0.35);
  }

  .analyze-btn:active:not(:disabled) {
    transform: translateY(0);
  }

  .analyze-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── SCORE CARD ── */
  .score-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 28px;
    display: flex;
    align-items: center;
    gap: 24px;
    box-shadow: var(--shadow-md);
    animation: fadeUp 0.5s ease;
    flex-wrap: wrap;
    position: relative;
    overflow: hidden;
  }

  .score-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--accent), #f5893e);
  }

  .score-card.good-score::before {
    background: linear-gradient(90deg, var(--accent-2), #4ec789);
  }

  .score-ring-wrap {
    flex-shrink: 0;
    position: relative;
    width: 100px;
    height: 100px;
  }

  .score-ring-svg {
    width: 100px;
    height: 100px;
    transform: rotate(-90deg);
  }

  .score-ring-bg {
    fill: none;
    stroke: var(--surface-2);
    stroke-width: 8;
  }

  .score-ring-fill {
    fill: none;
    stroke-width: 8;
    stroke-linecap: round;
    transition: stroke-dashoffset 1s ease;
  }

  .score-ring-text {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0;
  }

  .score-num {
    font-family: 'Fraunces', serif;
    font-size: 22px;
    font-weight: 900;
    line-height: 1;
  }

  .score-pct {
    font-size: 10px;
    color: var(--ink-3);
    font-weight: 500;
  }

  .score-info { flex: 1; min-width: 160px; }

  .score-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 6px;
    margin-bottom: 10px;
  }

  .score-badge.good { background: var(--accent-pale-2); color: var(--accent-2); }
  .score-badge.mid  { background: #fef9ec; color: #9a6700; }
  .score-badge.low  { background: var(--accent-pale); color: var(--accent); }

  .score-title {
    font-family: 'Fraunces', serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 6px;
    line-height: 1.2;
  }

  .score-desc { font-size: 13px; color: var(--ink-2); line-height: 1.7; }
  .score-desc strong { color: var(--ink); font-weight: 600; }

  /* ── RESULT GRID ── */
  .result-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    animation: fadeUp 0.5s ease 0.1s both;
  }

  .result-section {
    border-radius: var(--radius-sm);
    padding: 20px;
    border: 1px solid var(--border);
    background: var(--surface);
    box-shadow: var(--shadow-sm);
  }

  .rs-matched { border-top: 3px solid var(--accent-2); }
  .rs-missing { border-top: 3px solid var(--accent); }
  .rs-suggest { border-top: 3px solid #d4a017; grid-column: 1 / -1; }

  .rs-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .rs-matched .rs-label { color: var(--accent-2); }
  .rs-missing .rs-label { color: var(--accent); }
  .rs-suggest .rs-label { color: #9a6700; }

  .rs-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    flex-shrink: 0;
  }

  .result-section p {
    font-size: 13px;
    line-height: 1.8;
    color: var(--ink-2);
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── DIVIDER ── */
  .section-divider {
    display: flex;
    align-items: center;
    gap: 12px;
    grid-column: 1 / -1;
  }

  .section-divider-line {
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  .section-divider-label {
    font-size: 11px;
    font-weight: 600;
    color: var(--ink-3);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    white-space: nowrap;
  }

  /* ── MOBILE NAV HISTORY ── */
  .mobile-history-fab {
    display: none;
    position: fixed;
    bottom: 24px;
    right: 20px;
    z-index: 200;
    align-items: center;
    gap: 8px;
    background: var(--ink);
    color: white;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    padding: 13px 18px;
    border-radius: var(--radius-pill);
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 24px rgba(0,0,0,0.25);
    transition: all 0.2s ease;
  }

  .mobile-history-fab:hover {
    background: var(--accent-2);
    transform: translateY(-2px);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 680px) {
    .nav { padding: 12px 18px; }

    .logo { font-size: 19px; }

    .btn-history { display: none; }

    .mobile-history-fab { display: flex; }

    .hero { padding: 44px 20px 32px; }

    .hero h1 { letter-spacing: -1px; }

    .steps { display: none; }

    .main {
      grid-template-columns: 1fr;
      padding: 0 16px 90px;
      gap: 14px;
    }

    .result-grid { grid-template-columns: 1fr; }

    .rs-suggest { grid-column: 1 / -1; }

    .score-card {
      flex-direction: column;
      align-items: flex-start;
      padding: 24px 20px;
      gap: 18px;
    }

    .score-info { min-width: unset; }

    .card { padding: 20px; }
  }

  @media (max-width: 400px) {
    .logo-tag { display: none; }
    .btn-ghost span { display: none; }
    .score-ring-wrap { width: 80px; height: 80px; }
    .score-ring-svg { width: 80px; height: 80px; }
    .score-num { font-size: 18px; }
  }
`;

function ScoreRing({ score, colorClass }) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const stroke = colorClass === "good" ? "#1a6b3c" : colorClass === "mid" ? "#d4a017" : "#d4410b";

  return (
    <div className="score-ring-wrap">
      <svg className="score-ring-svg" viewBox="0 0 100 100">
        <circle className="score-ring-bg" cx="50" cy="50" r={radius} />
        <circle
          className="score-ring-fill"
          cx="50" cy="50" r={radius}
          stroke={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="score-ring-text">
        <span className="score-num" style={{ color: stroke }}>{score}</span>
        <span className="score-pct">/ 100</span>
      </div>
    </div>
  );
}

function Dashboard() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleUpload = async () => {
    if (!file) { alert("Please select a resume file"); return; }
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);
    try {
      setLoading(true);
      const res = await API.post("/resume/analyze", formData);
      setResult(res.data.result);
    } catch {
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const score = result?.analysis?.matchScore ?? 0;
  const colorClass = score >= 70 ? "good" : score >= 40 ? "mid" : "low";
  const scoreLabel = score >= 70 ? "Great match! 🎉" : score >= 40 ? "Moderate match" : "Needs work";
  const scoreBadgeText = score >= 70 ? "Strong" : score >= 40 ? "Partial" : "Weak";

  return (
    <>
      <style>{styles}</style>
      <div className="dashboard">

        <nav className="nav">
          <div className="logo">
            res<span className="logo-dot">.</span>ume
            <span className="logo-tag">AI</span>
          </div>
          <div className="nav-actions">
            <button className="btn-history" onClick={() => navigate("/history")}>
              🕒 History
            </button>
            <button className="btn-ghost" onClick={handleLogout}>
              <span>Sign out</span>
            </button>
          </div>
        </nav>

        <div className="hero">
          <div className="hero-eyebrow">AI-Powered Resume Analysis</div>
          <h1>
            Match your <em>résumé</em><br />
            to any job <span className="teal">instantly</span>
          </h1>
          <p className="hero-sub">
            Upload your resume and paste a job description to get an instant compatibility score with actionable improvement tips.
          </p>

          <div className="steps">
            <div className="step-item">
              <div className="step-num">1</div>
              <div className="step-label">Upload</div>
            </div>
            <div className="step-line" />
            <div className="step-item">
              <div className="step-num">2</div>
              <div className="step-label">Paste JD</div>
            </div>
            <div className="step-line" />
            <div className="step-item">
              <div className="step-num">3</div>
              <div className="step-label">Analyze</div>
            </div>
            <div className="step-line" />
            <div className="step-item">
              <div className="step-num">4</div>
              <div className="step-label">Improve</div>
            </div>
          </div>
        </div>

        <div className="main">

          <div className="card">
            <div className="card-header">
              <div className="card-num">1</div>
              <div>
                <div className="card-title">Upload Resume</div>
                <div className="card-sub">PDF or DOCX · Max 10 MB</div>
              </div>
            </div>
            <div className={`file-drop ${file ? "has-file" : ""}`}>
              <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files[0])} />
              <div className="file-drop-icon">{file ? "✅" : "📄"}</div>
              {file
                ? <p className="file-name">{file.name}</p>
                : <>
                    <p>Click or drag your file here</p>
                    <p className="file-hint">PDF · DOC · DOCX accepted</p>
                  </>
              }
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-num">2</div>
              <div>
                <div className="card-title">Job Description</div>
                <div className="card-sub">Paste the full posting below</div>
              </div>
            </div>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here — include requirements, responsibilities, and skills…"
            />
          </div>

          <div className="full-col">
            <button className="analyze-btn" onClick={handleUpload} disabled={loading}>
              {loading
                ? <><span className="spinner" /> Analyzing your resume…</>
                : "Analyze My Resume →"
              }
            </button>
          </div>

          {result?.analysis && (
            <>
              <div className="full-col section-divider">
                <div className="section-divider-line" />
                <div className="section-divider-label">Your Results</div>
                <div className="section-divider-line" />
              </div>

              <div className={`full-col score-card ${colorClass === "good" ? "good-score" : ""}`}>
                <ScoreRing score={score} colorClass={colorClass} />
                <div className="score-info">
                  <div className={`score-badge ${colorClass}`}>
                    <span className="rs-dot" />
                    {scoreBadgeText} match
                  </div>
                  <div className="score-title">{scoreLabel}</div>
                  <p className="score-desc">
                    Your resume aligns with <strong>{score}%</strong> of this role's requirements. Review the breakdown below to see where you can strengthen your application.
                  </p>
                </div>
              </div>

              <div className="full-col">
                <div className="result-grid">
                  <div className="result-section rs-matched">
                    <div className="rs-label"><span className="rs-dot" />Matched Skills</div>
                    <p>{result.analysis.matchedSkills}</p>
                  </div>
                  <div className="result-section rs-missing">
                    <div className="rs-label"><span className="rs-dot" />Missing Skills</div>
                    <p>{result.analysis.missingSkills}</p>
                  </div>
                  <div className="result-section rs-suggest">
                    <div className="rs-label"><span className="rs-dot" />Improvement Suggestions</div>
                    <p>{result.analysis.improvementSuggestions}</p>
                  </div>
                </div>
              </div>
            </>
          )}

        </div>

        {/* Mobile floating history button */}
        <button className="mobile-history-fab" onClick={() => navigate("/history")}>
          🕒 View History
        </button>

      </div>
    </>
  );
}

export default Dashboard;