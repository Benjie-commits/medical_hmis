function Patient() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-left">
          <h1><i className="fas fa-user"></i> Patient Portal</h1>
          <p>Welcome back, Alice • Patient Access</p>
        </div>
        <div className="header-right">
          <div className="user-info">
            <div className="user-avatar">AL</div>
            <div className="user-details">
              <div className="user-name">Alice Namutebi</div>
              <div className="user-role">Outpatient</div>
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
            <div className="stat-icon"><i className="fas fa-calendar-alt"></i></div>
            <div className="stat-value">2</div>
            <div className="stat-label">Upcoming Visits</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-file-medical-alt"></i></div>
            <div className="stat-value">5</div>
            <div className="stat-label">Medical Records</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-prescription-bottle"></i></div>
            <div className="stat-value">1</div>
            <div className="stat-label">Active Prescription</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-heart"></i></div>
            <div className="stat-value">Good</div>
            <div className="stat-label">Health Status</div>
          </div>
        </div>

        <div className="section-title">
          <i className="fas fa-calendar-check"></i> Next Appointment
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Appointment</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Consultation</td>
              <td>Dr. Patel</td>
              <td>05 Apr 2026</td>
              <td>02:00 PM</td>
              <td><span className="badge badge-warning">Scheduled</span></td>
              <td><button className="card-action">View</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="dashboard-footer">
        <i className="fas fa-shield-alt"></i> Patient Portal • Updated in real time
      </div>
    </div>
  );
}

export default Patient;