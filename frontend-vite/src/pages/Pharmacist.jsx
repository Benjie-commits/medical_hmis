function Pharmacist() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-left">
          <h1><i className="fas fa-pills"></i> Pharmacist Dashboard</h1>
          <p>Welcome back, Esther • Pharmacy</p>
        </div>
        <div className="header-right">
          <div className="user-info">
            <div className="user-avatar">EK</div>
            <div className="user-details">
              <div className="user-name">Esther Kintu</div>
              <div className="user-role">Chief Pharmacist</div>
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
            <div className="stat-icon"><i className="fas fa-capsules"></i></div>
            <div className="stat-value">18</div>
            <div className="stat-label">Prescriptions</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-boxes"></i></div>
            <div className="stat-value">42</div>
            <div className="stat-label">Stock Alerts</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-hand-holding-medical"></i></div>
            <div className="stat-value">12</div>
            <div className="stat-label">Ready for Pickup</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-dollar-sign"></i></div>
            <div className="stat-value">UGX 3.1M</div>
            <div className="stat-label">Daily Sales</div>
          </div>
        </div>

        <div className="section-title">
          <i className="fas fa-receipt"></i> Prescription Queue
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Rx</th>
              <th>Patient</th>
              <th>Medication</th>
              <th>Issued</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>RX-202</td>
              <td>Thomas Kato</td>
              <td>Amoxicillin</td>
              <td>09:30 AM</td>
              <td><span className="badge badge-warning">Preparing</span></td>
              <td><button className="card-action">Dispense</button></td>
            </tr>
            <tr>
              <td>RX-203</td>
              <td>Mary Jane</td>
              <td>Paracetamol</td>
              <td>10:05 AM</td>
              <td><span className="badge badge-success">Ready</span></td>
              <td><button className="card-action">Complete</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="dashboard-footer">
        <i className="fas fa-shield-alt"></i> Pharmacy Operations • Updated in real time
      </div>
    </div>
  );
}

export default Pharmacist;