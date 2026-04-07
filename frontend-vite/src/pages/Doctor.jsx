import { useEffect, useState } from 'react';
import { fetchDoctorDashboard } from '../services/api';

function Doctor() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDoctorDashboard()
      .then(setDashboard)
      .catch(console.error);
  }, []);

  if (!dashboard) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-left">
          <h1><i className="fas fa-user-md"></i> Doctor Dashboard</h1>
          <p>Welcome back, Dr. Amina • Cardiology</p>
        </div>
        <div className="header-right">
          <div className="user-info">
            <div className="user-avatar">DA</div>
            <div className="user-details">
              <div className="user-name">Dr. Amina Hassan</div>
              <div className="user-role">Consultant Physician</div>
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
            <div className="stat-icon"><i className="fas fa-procedures"></i></div>
            <div className="stat-value">{dashboard.today_patients}</div>
            <div className="stat-label">Today’s Patients</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-notes-medical"></i></div>
            <div className="stat-value">{dashboard.pending_notes}</div>
            <div className="stat-label">Pending Notes</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-clock"></i></div>
            <div className="stat-value">{dashboard.consults_left}</div>
            <div className="stat-label">Consults Left</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><i className="fas fa-heartbeat"></i></div>
            <div className="stat-value">{dashboard.patient_satisfaction}</div>
            <div className="stat-label">Patient Satisfaction</div>
          </div>
        </div>

        <div className="section-title">
          <i className="fas fa-user-injured"></i> Patient Queue
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Patient</th>
              <th>Department</th>
              <th>Arrival Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dashboard.queue.map((item) => (
              <tr key={item.token}>
                <td>{item.token}</td>
                <td>{item.patient}</td>
                <td>{item.department}</td>
                <td>{item.arrival_time}</td>
                <td>
                  <span
                    className={`badge ${
                      item.status === 'In Consult'
                        ? 'badge-success'
                        : 'badge-warning'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>
                  <button className="card-action">Start Consult</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="section-title" style={{ marginTop: 32 }}>
          <i className="fas fa-stethoscope"></i> Quick Actions
        </div>

        <div className="quick-actions">
          <button className="action-btn">
            <i className="fas fa-file-medical"></i> Review Lab Results
          </button>
          <button className="action-btn action-btn-outline">
            <i className="fas fa-calendar-plus"></i> Add Follow-up
          </button>
          <button className="action-btn action-btn-outline">
            <i className="fas fa-comments"></i> Message Nurse
          </button>
          <button className="action-btn action-btn-outline">
            <i className="fas fa-print"></i> Print Prescription
          </button>
        </div>
      </div>

      <div className="dashboard-footer">
        <i className="fas fa-shield-alt"></i> Doctor Dashboard • Updated in real time
      </div>
    </div>
  );
}

export default Doctor;