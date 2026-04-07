function Labtech() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-left">
          <h1><i className="fas fa-vials"></i> Lab Technician Dashboard</h1>
          <p>Welcome back, Peter • Laboratory</p>
        </div>
        <div className="header-right">
          <div className="user-info">
            <div className="user-avatar">PK</div>
            <div className="user-details">
              <div className="user-name">Peter Kimani</div>
              <div className="user-role">Lab Technician</div>
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
            <div className="stat-icon"><i className="fas fa-flask"></i></div>
            <div className="stat-value">24</div>
            <div className="stat-label">Tests Today</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-clock"></i></div>
            <div className="stat-value">5</div>
            <div className="stat-label">Pending Samples</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-check"></i></div>
            <div className="stat-value">18</div>
            <div className="stat-label">Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-prescription-bottle-alt"></i></div>
            <div className="stat-value">90%</div>
            <div className="stat-label">Turnaround</div>
          </div>
        </div>

        <div className="section-title">
          <i className="fas fa-clipboard-list"></i> Lab Queue
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Sample</th>
              <th>Patient</th>
              <th>Test</th>
              <th>Received</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>LT-065</td>
              <td>Grace Tumusiime</td>
              <td>Blood Panel</td>
              <td>10:00 AM</td>
              <td><span className="badge badge-warning">Processing</span></td>
              <td><button className="card-action">Review</button></td>
            </tr>
            <tr>
              <td>LT-066</td>
              <td>Michael Okumu</td>
              <td>Urinalysis</td>
              <td>10:25 AM</td>
              <td><span className="badge badge-success">Ready</span></td>
              <td><button className="card-action">Send</button></td>
            </tr>
            <tr>
              <td>LT-067</td>
              <td>Ruth Atieno</td>
              <td>Glucose</td>
              <td>11:00 AM</td>
              <td><span className="badge badge-warning">Pending</span></td>
              <td><button className="card-action">Start</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="dashboard-footer">
        <i className="fas fa-shield-alt"></i> Laboratory Dashboard • Updated in real time
      </div>
    </div>
  );
}

export default Labtech;