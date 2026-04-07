function Receptionist() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-left">
          <h1><i className="fas fa-calendar-alt"></i> Front Desk Dashboard</h1>
          <p>Welcome back, Mary Nakato • Reception</p>
        </div>
        <div className="header-right">
          <div className="user-info">
            <div className="user-avatar">MN</div>
            <div className="user-details">
              <div className="user-name">Mary Nakato</div>
              <div className="user-role">Head Receptionist</div>
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
            <div className="stat-icon"><i className="fas fa-user-plus"></i></div>
            <div className="stat-value">8</div>
            <div className="stat-label">New Registrations</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-calendar-check"></i></div>
            <div className="stat-value">32</div>
            <div className="stat-label">Today's Appointments</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-hourglass-half"></i></div>
            <div className="stat-value">12</div>
            <div className="stat-label">Waiting Patients</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-credit-card"></i></div>
            <div className="stat-value">UGX 2.4M</div>
            <div className="stat-label">Today's Collections</div>
          </div>
        </div>

        <div className="section-title">
          <i className="fas fa-user-clock"></i> Check-in Queue
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Arrival Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#001</td>
              <td>Sarah Namatovu</td>
              <td>Dr. Ochieng</td>
              <td>08:45 AM</td>
              <td><span className="badge badge-warning">Waiting</span></td>
              <td><button className="card-action">Call Patient</button></td>
            </tr>
            <tr>
              <td>#002</td>
              <td>David Okello</td>
              <td>Dr. Mwanga</td>
              <td>09:15 AM</td>
              <td><span className="badge badge-success">In Consult</span></td>
              <td><button className="card-action">View</button></td>
            </tr>
            <tr>
              <td>#003</td>
              <td>Rose Atim</td>
              <td>Dr. Ochieng</td>
              <td>09:30 AM</td>
              <td><span className="badge badge-warning">Waiting</span></td>
              <td><button className="card-action">Call Patient</button></td>
            </tr>
          </tbody>
        </table>

        <div className="section-title" style={{ marginTop: 32 }}>
          <i className="fas fa-bolt"></i> Quick Actions
        </div>

        <div className="quick-actions">
          <button className="action-btn"><i className="fas fa-user-plus"></i> Register New Patient</button>
          <button className="action-btn action-btn-outline"><i className="fas fa-calendar-plus"></i> Schedule Appointment</button>
          <button className="action-btn action-btn-outline"><i className="fas fa-print"></i> Print Receipt</button>
          <button className="action-btn action-btn-outline"><i className="fas fa-search"></i> Find Patient</button>
        </div>

        <div className="cards-grid">
          <div className="feature-card">
            <div className="card-icon"><i className="fas fa-chart-line"></i></div>
            <div className="card-title">Daily Report</div>
            <div className="card-desc">View today's patient statistics and revenue summary.</div>
            <button className="card-action">Generate Report →</button>
          </div>
          <div className="feature-card">
            <div className="card-icon"><i className="fas fa-calendar-week"></i></div>
            <div className="card-title">Appointment Calendar</div>
            <div className="card-desc">Manage doctor schedules and appointment slots.</div>
            <button className="card-action">View Calendar →</button>
          </div>
        </div>
      </div>

      <div className="dashboard-footer">
        <i className="fas fa-shield-alt"></i> Front Desk Operations • Updated in real time
      </div>
    </div>
  );
}

export default Receptionist;