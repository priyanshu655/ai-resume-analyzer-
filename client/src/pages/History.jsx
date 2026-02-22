import { useEffect, useState } from "react";
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
    --accent-3: #9a6700;
    --accent-pale: #fdf1ec;
    --accent-pale-2: #edf7f2;
    --accent-pale-3: #fef9ec;
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
    --shadow-md: 0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04);
    --radius: 16px;
    --radius-sm: 10px;
    --radius-pill: 100px;
  }

  .history-page {
    min-height: 100vh;
    background: var(--bg);
    font-family: 'DM Sans', sans-serif;
    color: var(--ink);
  }

  .history-page::before {
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

  .back-btn {
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
    display: flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
  }

  .back-btn:hover {
    background: var(--ink);
    border-color: var(--ink);
    color: white;
  }

  /* ── MAIN ── */
  .main {
    position: relative;
    z-index: 1;
    max-width: 860px;
    margin: 0 auto;
    padding: 52px 24px 100px;
  }

  /* ── PAGE HEADER ── */
  .page-header {
    margin-bottom: 40px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }

  .page-header-left {}

  .page-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--surface-2);
    border: 1px solid var(--border-strong);
    color: var(--ink-2);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: var(--radius-pill);
    margin-bottom: 14px;
  }

  .page-header h1 {
    font-family: 'Fraunces', serif;
    font-size: clamp(30px, 5vw, 48px);
    font-weight: 900;
    letter-spacing: -1.5px;
    line-height: 1.05;
    color: var(--ink);
  }

  .page-header h1 em {
    font-style: italic;
    color: var(--accent);
  }

  .count-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--ink-2);
    font-size: 13px;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: var(--radius-pill);
    box-shadow: var(--shadow-sm);
    white-space: nowrap;
    align-self: flex-end;
    margin-bottom: 4px;
  }

  .count-num {
    font-family: 'Fraunces', serif;
    font-size: 18px;
    font-weight: 700;
    color: var(--ink);
  }

  /* ── LOADING ── */
  .loading-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 80px 0;
    color: var(--ink-3);
    font-size: 14px;
  }

  .big-spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--border);
    border-top-color: var(--ink);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── EMPTY ── */
  .empty-state {
    text-align: center;
    padding: 64px 24px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow-sm);
  }

  .empty-icon {
    width: 72px;
    height: 72px;
    border-radius: 20px;
    background: var(--surface-2);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    margin: 0 auto 20px;
  }

  .empty-state h3 {
    font-family: 'Fraunces', serif;
    font-size: 22px;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 8px;
  }

  .empty-state p {
    font-size: 14px;
    color: var(--ink-3);
    line-height: 1.7;
  }

  .empty-cta {
    margin-top: 24px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--ink);
    color: white;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    padding: 11px 20px;
    border-radius: var(--radius-pill);
    border: none;
    cursor: pointer;
    transition: all 0.18s ease;
  }

  .empty-cta:hover {
    background: var(--accent);
    transform: translateY(-1px);
  }

  /* ── HISTORY LIST ── */
  .history-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  /* ── HISTORY CARD ── */
  .history-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    animation: fadeUp 0.4s ease both;
    transition: box-shadow 0.2s, transform 0.2s;
    position: relative;
  }

  .history-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    opacity: 0;
    transition: opacity 0.2s;
  }

  .history-card.good::before  { background: linear-gradient(90deg, var(--accent-2), #4ec789); opacity: 1; }
  .history-card.medium::before { background: linear-gradient(90deg, #d4a017, #f0c040); opacity: 1; }
  .history-card.low::before   { background: linear-gradient(90deg, var(--accent), #f07040); opacity: 1; }

  .history-card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── CARD TOP ── */
  .card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 22px;
    border-bottom: 1px solid var(--border);
    gap: 12px;
    flex-wrap: wrap;
  }

  .score-pill {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
  }

  /* SVG Ring in history cards */
  .mini-ring-wrap {
    position: relative;
    width: 48px;
    height: 48px;
    flex-shrink: 0;
  }

  .mini-ring-svg {
    width: 48px;
    height: 48px;
    transform: rotate(-90deg);
  }

  .mini-ring-bg {
    fill: none;
    stroke: var(--surface-2);
    stroke-width: 5;
  }

  .mini-ring-fill {
    fill: none;
    stroke-width: 5;
    stroke-linecap: round;
  }

  .mini-ring-text {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Fraunces', serif;
    font-size: 11px;
    font-weight: 700;
  }

  .score-meta {}

  .score-verdict {
    font-family: 'Fraunces', serif;
    font-size: 15px;
    font-weight: 700;
    color: var(--ink);
    line-height: 1.2;
  }

  .score-badge {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 2px 8px;
    border-radius: 5px;
    margin-top: 4px;
  }

  .score-badge.good   { background: var(--accent-pale-2); color: var(--accent-2); }
  .score-badge.medium { background: var(--accent-pale-3); color: var(--accent-3); }
  .score-badge.low    { background: var(--accent-pale);   color: var(--accent); }

  .score-badge-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: currentColor;
  }

  .card-date {
    font-size: 11px;
    color: var(--ink-3);
    letter-spacing: 0.03em;
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 400;
  }

  /* ── CARD BODY ── */
  .card-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .info-block {
    padding: 18px 22px;
    position: relative;
  }

  .info-block:first-child {
    border-right: 1px solid var(--border);
    border-bottom: 1px solid var(--border);
  }

  .info-block:nth-child(2) {
    border-bottom: 1px solid var(--border);
  }

  .info-block.full {
    grid-column: 1 / -1;
    border-right: none;
    border-bottom: none;
    background: var(--surface-2);
  }

  .info-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .il-matched { color: var(--accent-2); }
  .il-missing { color: var(--accent); }
  .il-suggest { color: var(--accent-3); }

  .info-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: currentColor;
    display: inline-block;
    flex-shrink: 0;
  }

  .info-block p {
    font-size: 13px;
    color: var(--ink-2);
    line-height: 1.75;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 680px) {
    .nav { padding: 12px 18px; }
    .logo { font-size: 19px; }

    .back-btn-label { display: inline; }

    .main { padding: 36px 16px 80px; }

    .page-header { flex-direction: column; align-items: flex-start; margin-bottom: 28px; }

    .count-chip { align-self: flex-start; }

    .card-top { padding: 14px 16px; gap: 10px; }

    .card-body { grid-template-columns: 1fr; }

    .info-block { padding: 14px 16px; }

    .info-block:first-child {
      border-right: none;
      border-bottom: 1px solid var(--border);
    }

    .history-card:hover { transform: none; }
  }

  @media (max-width: 400px) {
    .logo-tag { display: none; }
    .back-btn-label { display: none; }
    .back-btn { padding: 8px 12px; }
    .page-header h1 { letter-spacing: -0.5px; }
  }
`;

function getScoreClass(score) {
  if (score >= 70) return "good";
  if (score >= 40) return "medium";
  return "low";
}

function getVerdict(cls) {
  if (cls === "good")   return "Great match";
  if (cls === "medium") return "Moderate match";
  return "Needs improvement";
}

function MiniRing({ score, cls }) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const stroke = cls === "good" ? "#1a6b3c" : cls === "medium" ? "#d4a017" : "#d4410b";

  return (
    <div className="mini-ring-wrap">
      <svg className="mini-ring-svg" viewBox="0 0 48 48">
        <circle className="mini-ring-bg" cx="24" cy="24" r={radius} />
        <circle
          className="mini-ring-fill"
          cx="24" cy="24" r={radius}
          stroke={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="mini-ring-text" style={{ color: stroke }}>{score}%</div>
    </div>
  );
}

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get("/resume/history");
        setHistory(res.data);
      } catch {
        alert("Failed to load history");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="history-page">

        <nav className="nav">
          <div className="logo">
            res<span className="logo-dot">.</span>ume
            <span className="logo-tag">AI</span>
          </div>
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            ← <span className="back-btn-label">Back to Dashboard</span>
          </button>
        </nav>

        <div className="main">
          <div className="page-header">
            <div className="page-header-left">
              <div className="page-eyebrow">🕒 Analysis History</div>
              <h1>Your past <em>résumé</em><br />analyses</h1>
            </div>
            {!loading && history.length > 0 && (
              <div className="count-chip">
                <span className="count-num">{history.length}</span>
                analysis{history.length !== 1 ? "es" : ""} found
              </div>
            )}
          </div>

          {loading ? (
            <div className="loading-wrap">
              <div className="big-spinner" />
              Fetching your history…
            </div>
          ) : history.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📂</div>
              <h3>No analyses yet</h3>
              <p>Head back to the dashboard and analyze<br />your first resume to see results here.</p>
              <button className="empty-cta" onClick={() => navigate("/dashboard")}>
                Go to Dashboard →
              </button>
            </div>
          ) : (
            <div className="history-list">
              {history.map((item, index) => {
                const score = item.analysis?.matchScore ?? 0;
                const cls = getScoreClass(score);
                return (
                  <div
                    className={`history-card ${cls}`}
                    key={item._id}
                    style={{ animationDelay: `${index * 0.07}s` }}
                  >
                    <div className="card-top">
                      <div className="score-pill">
                        <MiniRing score={score} cls={cls} />
                        <div className="score-meta">
                          <div className="score-verdict">{getVerdict(cls)}</div>
                          <div className={`score-badge ${cls}`}>
                            <span className="score-badge-dot" />
                            {cls === "good" ? "Strong" : cls === "medium" ? "Partial" : "Weak"} match
                          </div>
                        </div>
                      </div>
                      <div className="card-date">
                        {new Date(item.createdAt).toLocaleDateString("en-US", {
                          month: "short", day: "numeric", year: "numeric"
                        })}
                        &nbsp;·&nbsp;
                        {new Date(item.createdAt).toLocaleTimeString("en-US", {
                          hour: "2-digit", minute: "2-digit"
                        })}
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="info-block">
                        <div className="info-label il-matched"><span className="info-dot" />Matched Skills</div>
                        <p>{item.analysis?.matchedSkills || "—"}</p>
                      </div>
                      <div className="info-block">
                        <div className="info-label il-missing"><span className="info-dot" />Missing Skills</div>
                        <p>{item.analysis?.missingSkills || "—"}</p>
                      </div>
                      <div className="info-block full">
                        <div className="info-label il-suggest"><span className="info-dot" />Improvement Suggestions</div>
                        <p>{item.analysis?.improvementSuggestions || "—"}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default History;