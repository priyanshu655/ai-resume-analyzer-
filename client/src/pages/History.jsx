import { useEffect, useState } from "react";
import API from "../services/Api";
import { useNavigate } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Nunito:wght@400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .history-page {
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
    padding: 20px 40px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    background: rgba(15,14,23,0.85);
    backdrop-filter: blur(12px);
    position: sticky;
    top: 0;
    z-index: 50;
  }

  .logo {
    font-family: 'Syne', sans-serif;
    font-size: 22px;
    font-weight: 800;
    letter-spacing: -0.5px;
  }

  .logo .dot { color: #ff8906; }
  .logo .ai  { color: #e53170; }

  .back-btn {
    font-family: 'Nunito', sans-serif;
    font-size: 13px;
    font-weight: 600;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.12);
    color: #a7a9be;
    padding: 9px 20px;
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .back-btn:hover {
    background: rgba(255,255,255,0.12);
    color: #fffffe;
  }

  /* ── MAIN ── */
  .main {
    max-width: 800px;
    margin: 0 auto;
    padding: 56px 24px 80px;
  }

  /* ── HEADER ── */
  .page-header {
    margin-bottom: 40px;
  }

  .page-badge {
    display: inline-block;
    background: rgba(124,58,237,0.12);
    border: 1px solid rgba(124,58,237,0.3);
    color: #a78bfa;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 6px 16px;
    border-radius: 100px;
    margin-bottom: 16px;
  }

  .page-header h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(28px, 4vw, 42px);
    font-weight: 800;
    letter-spacing: -1px;
    line-height: 1.1;
    margin-bottom: 10px;
  }

  .page-header h1 .purple { color: #a78bfa; }
  .page-header h1 .orange { color: #ff8906; }

  .page-header p {
    font-size: 14px;
    color: #a7a9be;
  }

  /* ── LOADING ── */
  .loading-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 80px 0;
    color: #a7a9be;
    font-size: 14px;
  }

  .big-spinner {
    width: 40px; height: 40px;
    border: 3px solid rgba(255,255,255,0.08);
    border-top-color: #a78bfa;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── EMPTY ── */
  .empty-state {
    text-align: center;
    padding: 80px 24px;
    background: #1a1826;
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 24px;
  }

  .empty-icon { font-size: 48px; margin-bottom: 16px; }

  .empty-state h3 {
    font-family: 'Syne', sans-serif;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 8px;
  }

  .empty-state p { font-size: 14px; color: #a7a9be; }

  /* ── HISTORY LIST ── */
  .history-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .history-card {
    background: #1a1826;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    overflow: hidden;
    animation: fadeUp 0.4s ease both;
    transition: border-color 0.2s, transform 0.2s;
  }

  .history-card:hover {
    border-color: rgba(167,139,250,0.3);
    transform: translateY(-2px);
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    flex-wrap: wrap;
    gap: 12px;
  }

  .score-pill {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .score-circle {
    width: 48px; height: 48px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 800;
    flex-shrink: 0;
  }

  .score-circle.good   { background: rgba(44,182,125,0.15);  color: #2cb67d; border: 1.5px solid rgba(44,182,125,0.3); }
  .score-circle.medium { background: rgba(255,137,6,0.15);   color: #ff8906; border: 1.5px solid rgba(255,137,6,0.3); }
  .score-circle.low    { background: rgba(229,49,112,0.15);  color: #e53170; border: 1.5px solid rgba(229,49,112,0.3); }

  .score-label {
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
  }

  .score-label.good   { color: #2cb67d; }
  .score-label.medium { color: #ff8906; }
  .score-label.low    { color: #e53170; }

  .card-date {
    font-size: 11px;
    color: #4a4869;
    letter-spacing: 0.04em;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  /* ── CARD BODY ── */
  .card-body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
  }

  .info-block {
    padding: 18px 24px;
  }

  .info-block:first-child {
    border-right: 1px solid rgba(255,255,255,0.06);
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .info-block:nth-child(2) {
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }

  .info-block.full {
    grid-column: 1 / -1;
    border-right: none;
    border-bottom: none;
  }

  .info-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .il-matched { color: #2cb67d; }
  .il-missing { color: #e53170; }
  .il-suggest { color: #ff8906; }

  .info-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: currentColor;
    display: inline-block;
  }

  .info-block p {
    font-size: 13px;
    color: #c8cad8;
    line-height: 1.7;
  }
`;

function getScoreClass(score) {
  if (score >= 70) return "good";
  if (score >= 40) return "medium";
  return "low";
}

function getScoreEmoji(score) {
  if (score >= 70) return "🎉";
  if (score >= 40) return "⚡";
  return "📉";
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
      } catch (error) {
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

        {/* NAV */}
        <nav className="nav">
          <div className="logo">res<span className="dot">.</span>ume<span className="ai">AI</span></div>
          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            ← Back to Dashboard
          </button>
        </nav>

        <div className="main">
          {/* HEADER */}
          <div className="page-header">
            <div className="page-badge">🕒 Analysis History</div>
            <h1>Your past <span className="purple">résumé</span><br />
            <span className="orange">analyses</span></h1>
            <p>{history.length > 0 ? `${history.length} analysis${history.length > 1 ? "es" : ""} found` : "Track your progress over time"}</p>
          </div>

          {/* STATES */}
          {loading ? (
            <div className="loading-wrap">
              <div className="big-spinner" />
              Fetching your history…
            </div>
          ) : history.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📂</div>
              <h3>No analyses yet</h3>
              <p>Head back to the dashboard and analyze your first resume!</p>
            </div>
          ) : (
            <div className="history-list">
              {history.map((item, index) => {
                const score = item.analysis?.matchScore ?? 0;
                const cls = getScoreClass(score);
                return (
                  <div
                    className="history-card"
                    key={item._id}
                    style={{ animationDelay: `${index * 0.07}s` }}
                  >
                    {/* Top row */}
                    <div className="card-top">
                      <div className="score-pill">
                        <div className={`score-circle ${cls}`}>{score}%</div>
                        <div className={`score-label ${cls}`}>
                          {getScoreEmoji(score)}&nbsp;
                          {cls === "good" ? "Great match" : cls === "medium" ? "Moderate match" : "Needs work"}
                        </div>
                      </div>
                      <div className="card-date">
                        🗓 {new Date(item.createdAt).toLocaleString()}
                      </div>
                    </div>

                    {/* Body */}
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