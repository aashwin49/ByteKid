export default function Dashboard({ points, badge, completed, total }) {
  return (
    <section className="dashboard compact-dashboard">
      <div className="stats-grid">
        <div className="stat-card points">
          <div className="stat-icon">★</div>
          <div className="stat-content">
            <h3>Points</h3>
            <p>{points}</p>
          </div>
        </div>
        <div className="stat-card badge">
          <div className="stat-icon">◎</div>
          <div className="stat-content">
            <h3>Badge</h3>
            <p>{badge}</p>
          </div>
        </div>
        <div className="stat-card completed">
          <div className="stat-icon">✓</div>
          <div className="stat-content">
            <h3>Completed</h3>
            <p>{completed} / {total}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
