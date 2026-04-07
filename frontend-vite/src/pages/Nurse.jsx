function Nurse() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-left">
          <h1><i className="fas fa-user-nurse"></i> Nurse Dashboard</h1>
          <p>Welcome back, Jane • Ward Rounds</p>
        </div>
        <div className="header-right">
          <div className="user-info">
            <div className="user-avatar">JN</div>
            <div className="user-details">
              <div className="user-name">Jane Nakabugo</div>
              <div className="user-role">Senior Nurse</div>
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
            <div className="stat-icon"><i className="fas fa-bed"></i></div>
            <div className="stat-value">26</div>
            <div className="stat-label">Patients Assigned</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-tasks"></i></div>
            <div className="stat-value">11</div>
            <div className="stat-label">Tasks Pending</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-syringe"></i></div>
            <div className="stat-value">7</div>
            <div className="stat-label">Medication Runs</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-heart"></i></div>
            <div className="stat-value">98%</div>
            <div className="stat-label">Care Compliance</div>
          </div>
        </div>

        <div className="section-title">
          <i className="fas fa-clipboard-list"></i> Nurse Tasks
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Ward</th>
              <th>Patient</th>
              <th>Room</th>
              <th>Task</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ward A</td>
              <td>Simon Kato</td>
              <td>102</td>
              <td>Vitals</td>
              <td><span className="badge badge-warning">Pending</span></td>
              <td><button className="card-action">Start</button></td>
            </tr>
            <tr>
              <td>Ward B</td>
              <td>Mercy Achieng</td>
              <td>204</td>
              <td>Medication</td>
              <td><span className="badge badge-success">Completed</span></td>
              <td><button className="card-action">View</button></td>
            </tr>
            <tr>
              <td>Ward C</td>
              <td>John Lubega</td>
              <td>308</td>
              <td>Wound Care</td>
              <td><span className="badge badge-warning">Pending</span></td>
              <td><button className="card-action">Update</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="dashboard-footer">
        <i className="fas fa-shield-alt"></i> Nursing Operations • Updated in real time
      </div>
    </div>
  );
}

export default Nurse;