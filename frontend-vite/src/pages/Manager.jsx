function Manager() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-left">
          <h1><i className="fas fa-chart-pie"></i> Manager Dashboard</h1>
          <p>Welcome back, Samuel • Administration</p>
        </div>
        <div className="header-right">
          <div className="user-info">
            <div className="user-avatar">SM</div>
            <div className="user-details">
              <div className="user-name">Samuel Mugisha</div>
              <div className="user-role">Operations Manager</div>
            </div>
          </div>
          <button className="logout-btn">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-users"></i></div>
            <div className="stat-value">82</div>
            <div className="stat-label">Staff Active</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-file-invoice-dollar"></i></div>
            <div className="stat-value">UGX 12.8M</div>
            <div className="stat-label">Daily Revenue</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-calendar-check"></i></div>
            <div className="stat-value">56</div>
            <div className="stat-label">Appointments</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-check-circle"></i></div>
            <div className="stat-value">94%</div>
            <div className="stat-label">Target Rate</div>
          </div>
        </div>

        <div className="section-title">
          <i className="fas fa-clipboard-check"></i> Management Overview
        </div>

        <div className="cards-grid">
          <div className="feature-card">
            <div className="card-icon"><i className="fas fa-chart-line"></i></div>
            <div className="card-title">Performance Report</div>
            <div className="card-desc">Review hospital KPIs and daily performance metrics.</div>
            <button className="card-action">View Report</button>
          </div>
          <div className="feature-card">
            <div className="card-icon"><i className="fas fa-users-cog"></i></div>
            <div className="card-title">Staff Summary</div>
            <div className="card-desc">Monitor staff allocation and attendance by department.</div>
            <button className="card-action">Open Summary</button>
          </div>
        </div>
      </div>

      <div className="dashboard-footer">
        <i className="fas fa-shield-alt"></i> Management Dashboard • Updated in real time
      </div>
    </div>
  );
}

export default Manager;