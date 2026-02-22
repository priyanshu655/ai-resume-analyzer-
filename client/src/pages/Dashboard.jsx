import { useState } from "react";
import API from "../services/Api";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Nunito:wght@400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .dashboard {
    min-height: 100vh;
    background: #0f0e17;
    font-family: 'Nunito', sans-serif;
    color: #fffffe;
  }

  /* ── NAV ── */
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    backdrop-filter: blur(12px);
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(15,14,23,0.85);
    gap: 10px;
  }

  .logo {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.5px;
    flex-shrink: 0;
  }

  .logo .dot { color: #ff8906; }
  .logo .ai  { color: #e53170; }

  .logout-btn {
    font-family: 'Nunito', sans-serif;
    font-size: 12px;
    font-weight: 600;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.12);
    color: #a7a9be;
    padding: 8px 14px;
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }

  .logout-btn:hover {
    background: #e53170;
    border-color: #e53170;
    color: #fff;
  }

  .history-btn {
    font-family: 'Nunito', sans-serif;
    font-size: 12px;
    font-weight: 600;
    background: rgba(44,182,125,0.12);
    border: 1px solid rgba(44,182,125,0.3);
    color: #2cb67d;
    padding: 8px 14px;
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }

  .history-btn:hover {
    background: #2cb67d;
    border-color: #2cb67d;
    color: #0f0e17;
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: nowrap;
  }

  /* ── HERO ── */
  .hero {
    text-align: center;
    padding: 52px 20px 36px;
    position: relative;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: 0; left: 50%;
    transform: translateX(-50%);
    width: min(600px, 100%); height: 300px;
    background: radial-gradient(ellipse, rgba(229,49,112,0.18) 0%, transparent 70%);
    pointer-events: none;
  }

  .badge {
    display: inline-block;
    background: rgba(255,137,6,0.12);
    border: 1px solid rgba(255,137,6,0.3);
    color: #ff8906;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 6px 16px;
    border-radius: 100px;
    margin-bottom: 20px;
  }

  .hero h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(28px, 7vw, 58px);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -1px;
    margin-bottom: 14px;
  }

  .hero h1 .pink   { color: #e53170; }
  .hero h1 .orange { color: #ff8906; }
  .hero h1 .teal   { color: #2cb67d; }

  .hero p {
    font-size: 14px;
    color: #a7a9be;
    max-width: 420px;
    margin: 0 auto;
    line-height: 1.7;
  }

  /* ── MAIN GRID ── */
  .main {
    max-width: 860px;
    margin: 0 auto;
    padding: 0 16px 80px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .full-col { grid-column: 1 / -1; }

  /* ── CARDS ── */
  .card {
    background: #1a1826;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 22px;
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 16px;
  }

  .card-icon {
    width: 36px; height: 36px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }

  .icon-pink   { background: rgba(229,49,112,0.15); }
  .icon-orange { background: rgba(255,137,6,0.15); }

  .card-title {
    font-family: 'Syne', sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #fffffe;
  }

  .card-sub {
    font-size: 11px;
    color: #a7a9be;
    margin-top: 2px;
  }

  /* ── FILE INPUT ── */
  .file-drop {
    border: 2px dashed rgba(229,49,112,0.3);
    border-radius: 14px;
    padding: 28px 16px;
    text-align: center;
    cursor: pointer;
    position: relative;
    transition: all 0.2s;
    background: rgba(229,49,112,0.04);
  }

  .file-drop:hover {
    border-color: #e53170;
    background: rgba(229,49,112,0.08);
  }

  .file-drop.has-file {
    border-color: #2cb67d;
    background: rgba(44,182,125,0.06);
    border-style: solid;
  }

  .file-drop input {
    position: absolute;
    inset: 0;
    opacity: 0;
    cursor: pointer;
    width: 100%;
  }

  .file-drop-icon {
    font-size: 26px;
    margin-bottom: 8px;
  }

  .file-drop p { font-size: 12px; color: #a7a9be; }
  .file-drop .file-name { font-size: 12px; font-weight: 600; color: #2cb67d; word-break: break-all; }

  /* ── TEXTAREA ── */
  textarea {
    width: 100%;
    height: 130px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 14px;
    padding: 14px;
    font-family: 'Nunito', sans-serif;
    font-size: 13px;
    color: #fffffe;
    resize: none;
    outline: none;
    line-height: 1.7;
    transition: border-color 0.2s;
  }

  textarea:focus { border-color: #ff8906; }
  textarea::placeholder { color: #4a4869; }

  /* ── BUTTON ── */
  .analyze-btn {
    width: 100%;
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
    touch-action: manipulation;
  }

  .analyze-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
  .analyze-btn:active:not(:disabled) { transform: translateY(0); opacity: 0.85; }
  .analyze-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }

  .spinner {
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── SCORE CARD ── */
  .score-card {
    background: #1a1826;
    border: 1px solid rgba(229,49,112,0.2);
    border-radius: 20px;
    padding: 28px 22px;
    display: flex;
    align-items: center;
    gap: 22px;
    animation: fadeUp 0.5s ease;
    flex-wrap: wrap;
  }

  .score-ring {
    flex-shrink: 0;
    width: 96px; height: 96px;
    border-radius: 50%;
    background: conic-gradient(#e53170 0%, #ff8906 var(--pct, 0%), rgba(255,255,255,0.06) var(--pct, 0%));
    display: flex; align-items: center; justify-content: center;
    position: relative;
  }

  .score-ring::after {
    content: '';
    position: absolute;
    inset: 10px;
    border-radius: 50%;
    background: #1a1826;
  }

  .score-num {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 800;
    position: relative;
    z-index: 1;
    line-height: 1;
  }

  .score-info { flex: 1; min-width: 160px; }

  .score-info h3 {
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 6px;
  }

  .score-info p { font-size: 13px; color: #a7a9be; }

  .score-good   { color: #2cb67d; }
  .score-mid    { color: #ff8906; }
  .score-low    { color: #e53170; }

  /* ── RESULT SECTIONS ── */
  .result-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    animation: fadeUp 0.5s ease;
  }

  .result-section {
    border-radius: 16px;
    padding: 20px;
  }

  .rs-matched { background: rgba(44,182,125,0.08);  border: 1px solid rgba(44,182,125,0.2); }
  .rs-missing { background: rgba(229,49,112,0.08);  border: 1px solid rgba(229,49,112,0.2); }
  .rs-suggest { background: rgba(255,137,6,0.08);   border: 1px solid rgba(255,137,6,0.2); grid-column: 1 / -1; }

  .rs-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .rs-matched .rs-label { color: #2cb67d; }
  .rs-missing .rs-label { color: #e53170; }
  .rs-suggest .rs-label { color: #ff8906; }

  .rs-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: currentColor;
    display: inline-block;
    flex-shrink: 0;
  }

  .result-section p { font-size: 13px; line-height: 1.75; color: #c8cad8; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── MOBILE RESPONSIVE ── */

  /* Tablets & small desktops (≤ 640px) → single column everything */
  @media (max-width: 640px) {
    .nav {
      padding: 12px 16px;
    }

    .logo {
      font-size: 18px;
    }

    .history-btn,
    .logout-btn {
      font-size: 11px;
      padding: 7px 11px;
    }

    /* On very small screens, hide the label text on history button, show just icon */
    .history-btn-label { display: none; }

    .hero {
      padding: 36px 16px 28px;
    }

    .hero p {
      font-size: 13px;
    }

    /* Stack the two cards vertically */
    .main {
      grid-template-columns: 1fr;
      padding: 0 14px 60px;
      gap: 14px;
    }

    /* result grid: stack matched/missing vertically */
    .result-grid {
      grid-template-columns: 1fr;
    }

    .rs-suggest {
      grid-column: 1 / -1;
    }

    .score-card {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
      padding: 22px 18px;
    }

    .score-info { min-width: unset; }

    .card {
      padding: 18px;
    }

    .file-drop {
      padding: 22px 14px;
    }

    textarea {
      height: 120px;
    }

    .analyze-btn {
      font-size: 14px;
      padding: 15px;
    }
  }

  /* Extra small phones (≤ 380px) */
  @media (max-width: 380px) {
    .logo { font-size: 16px; }

    .history-btn { display: none; }

    .hero h1 { font-size: 26px; letter-spacing: -0.5px; }

    .score-ring {
      width: 80px; height: 80px;
    }

    .score-num { font-size: 17px; }
  }
`;

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
  const scoreColor = score >= 70 ? "score-good" : score >= 40 ? "score-mid" : "score-low";
  const scoreLabel = score >= 70 ? "Great match! 🎉" : score >= 40 ? "Moderate match" : "Needs improvement";

  return (
    <>
      <style>{styles}</style>
      <div className="dashboard">

        <nav className="nav">
          <div className="logo">res<span className="dot">.</span>ume<span className="ai">AI</span></div>
          <div className="nav-actions">
            <button className="history-btn" onClick={() => navigate("/history")}>
              🕒 <span className="history-btn-label">View History</span>
            </button>
            <button className="logout-btn" onClick={handleLogout}>← Logout</button>
          </div>
        </nav>

        <div className="hero">
          <div className="badge">✦ AI-Powered Analysis</div>
          <h1>
            Match your <span className="pink">résumé</span><br />
            to any <span className="orange">job</span> in <span className="teal">seconds</span>
          </h1>
          <p>Upload your resume, paste a job description, and get an instant compatibility score with actionable feedback.</p>
        </div>

        <div className="main">

          <div className="card">
            <div className="card-header">
              <div className="card-icon icon-pink">📄</div>
              <div>
                <div className="card-title">Your Resume</div>
                <div className="card-sub">PDF or DOCX accepted</div>
              </div>
            </div>
            <div className={`file-drop ${file ? "has-file" : ""}`}>
              <input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files[0])} />
              <div className="file-drop-icon">{file ? "✅" : "📂"}</div>
              {file
                ? <p className="file-name">{file.name}</p>
                : <p>Click or drag your file here</p>
              }
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-icon icon-orange">💼</div>
              <div>
                <div className="card-title">Job Description</div>
                <div className="card-sub">Paste the full posting</div>
              </div>
            </div>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here…"
            />
          </div>

          <div className="full-col">
            <button className="analyze-btn" onClick={handleUpload} disabled={loading}>
              {loading
                ? <><span className="spinner" /> Analyzing your resume…</>
                : "✦ Analyze My Resume"
              }
            </button>
          </div>

          {result?.analysis && (
            <>
              <div className="full-col">
                <div className="score-card" style={{ "--pct": `${score}%` }}>
                  <div className="score-ring">
                    <span className={`score-num ${scoreColor}`}>{score}%</span>
                  </div>
                  <div className="score-info">
                    <h3 className={scoreColor}>{scoreLabel}</h3>
                    <p>Your resume matches <strong style={{color:"#fffffe"}}>{score}%</strong> of the job requirements. Review the breakdown below to improve your chances.</p>
                  </div>
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
      </div>
    </>
  );
}

export default Dashboard;