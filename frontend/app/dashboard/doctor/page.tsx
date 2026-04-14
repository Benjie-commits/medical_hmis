"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DoctorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("hmis_user");
    if (!stored) { router.replace("/"); return; }
    setUser(JSON.parse(stored));
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("hmis_user");
    localStorage.removeItem("hmis_token");
    router.replace("/");
  }

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'DM Sans', sans-serif; background: linear-gradient(135deg, #fdf0f4 0%, #fff5f8 100%); min-height: 100vh; padding: 20px; overflow-y: auto; }
        .dashboard-container { max-width: 1400px; margin: 0 auto; background: white; border-radius: 32px; box-shadow: 0 20px 40px rgba(90, 31, 74, 0.08); overflow: hidden; }
        .dashboard-header { background: linear-gradient(135deg, #5a1f4a 0%, #3a1030 100%); padding: 28px 32px; color: white; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px; }
        .header-left h1 { font-size: 22px; font-weight: 600; margin-bottom: 6px; }
        .header-left p { font-size: 13px; opacity: 0.8; }
        .header-right { display: flex; align-items: center; gap: 20px; }
        .user-info { display: flex; align-items: center; gap: 12px; background: rgba(255,255,255,0.1); padding: 8px 18px; border-radius: 40px; }
        .user-avatar { width: 36px; height: 36px; background: #c0446c; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 16px; }
        .user-details { font-size: 13px; }
        .user-name { font-weight: 600; }
        .user-role { font-size: 11px; opacity: 0.7; }
        .logout-btn { background: rgba(255,255,255,0.15); border: none; color: white; padding: 8px 16px; border-radius: 30px; cursor: pointer; font-size: 12px; }
        .logout-btn:hover { background: rgba(255,255,255,0.25); }
        .dashboard-content { padding: 32px; }
        .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 32px; }
        .stat-card { background: #fef7f9; border-radius: 20px; padding: 20px; border: 1px solid #f2c4ce; transition: all 0.2s; }
        .stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(212, 96, 126, 0.1); }
        .stat-icon { width: 48px; height: 48px; background: rgba(212, 96, 126, 0.1); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #c0446c; margin-bottom: 16px; }
        .stat-value { font-size: 28px; font-weight: 700; color: #5a1f4a; }
        .stat-label { font-size: 13px; color: #9a6880; margin-top: 6px; }
        .section-title { font-size: 18px; font-weight: 600; color: #5a1f4a; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; border-left: 3px solid #c0446c; padding-left: 15px; }
        .cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 32px; }
        .feature-card { background: white; border: 1px solid #f2c4ce; border-radius: 20px; padding: 20px; transition: all 0.2s; }
        .feature-card:hover { border-color: #d4607e; box-shadow: 0 8px 24px rgba(212, 96, 126, 0.08); }
        .card-icon { font-size: 32px; color: #c0446c; margin-bottom: 16px; }
        .card-title { font-size: 16px; font-weight: 600; color: #5a1f4a; margin-bottom: 8px; }
        .card-desc { font-size: 13px; color: #9a6880; line-height: 1.5; margin-bottom: 16px; }
        .card-action { display: inline-block; color: #c0446c; font-size: 13px; font-weight: 500; text-decoration: none; cursor: pointer; }
        .card-action:hover { text-decoration: underline; }
        .data-table { width: 100%; border-collapse: collapse; margin-top: 16px; }
        .data-table th { text-align: left; padding: 12px 16px; background: #fef7f9; font-size: 12px; font-weight: 600; color: #5a1f4a; border-bottom: 1px solid #f2c4ce; }
        .data-table td { padding: 12px 16px; font-size: 13px; color: #6b4a5c; border-bottom: 1px solid #faf0f4; }
        .data-table tr:hover { background: #fef7f9; }
        .badge { display: inline-block; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 500; }
        .badge-success { background: #e8f5e9; color: #2e7d32; }
        .badge-warning { background: #fff3e0; color: #ed6c02; }
        .badge-danger { background: #ffebee; color: #c62828; }
        .badge-info { background: #e3f2fd; color: #0d47a1; }
        .quick-actions { display: flex; gap: 12px; flex-wrap: wrap; margin: 20px 0; }
        .action-btn { background: linear-gradient(135deg, #c0446c 0%, #d4607e 100%); border: none; color: white; padding: 10px 24px; border-radius: 30px; font-size: 13px; font-weight: 500; cursor: pointer; transition: opacity 0.2s; }
        .action-btn-outline { background: transparent; border: 1px solid #d4607e; color: #c0446c; }
        .action-btn:hover { opacity: 0.9; }
        .dashboard-footer { padding: 20px 32px; background: #faf5f7; border-top: 1px solid #f2c4ce; text-align: center; font-size: 11px; color: #9a6880; }
      `}</style>

      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="header-left">
            <h1><i className="fas fa-stethoscope"></i> Clinical Dashboard</h1>
            <p>Welcome back, Dr. {user?.username} • Internal Medicine</p>
          </div>
          <div className="header-right">
            <div className="user-info">
              <div className="user-avatar">{user?.username?.slice(0, 2).toUpperCase()}</div>
              <div className="user-details">
                <div className="user-name">Dr. {user?.username}</div>
                <div className="user-role">Senior Physician</div>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</button>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="stats-grid">
            <div className="stat-card"><div className="stat-icon"><i className="fas fa-users"></i></div><div className="stat-value">24</div><div className="stat-label">Total Patients Today</div></div>
            <div className="stat-card"><div className="stat-icon"><i className="fas fa-calendar-check"></i></div><div className="stat-value">12</div><div className="stat-label">Scheduled Appointments</div></div>
            <div className="stat-card"><div className="stat-icon"><i className="fas fa-file-prescription"></i></div><div className="stat-value">8</div><div className="stat-label">Prescriptions Today</div></div>
            <div className="stat-card"><div className="stat-icon"><i className="fas fa-flask"></i></div><div className="stat-value">5</div><div className="stat-label">Pending Lab Results</div></div>
          </div>

          <div className="section-title"><i className="fas fa-calendar-day"></i> Today's Appointments</div>
          <table className="data-table">
            <thead><tr><th>Time</th><th>Patient</th><th>Reason</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              <tr><td>09:00 AM</td><td>John Muwanga</td><td>Chest Pain</td><td><span className="badge badge-warning">Waiting</span></td><td><a className="card-action">Start Consult</a></td></tr>
              <tr><td>10:30 AM</td><td>Grace Atim</td><td>Follow-up</td><td><span className="badge badge-info">Checked In</span></td><td><a className="card-action">View Notes</a></td></tr>
              <tr><td>11:45 AM</td><td>Robert Ouma</td><td>Hypertension</td><td><span className="badge badge-success">Completed</span></td><td><a className="card-action">Add Prescription</a></td></tr>
              <tr><td>02:00 PM</td><td>Mary Akello</td><td>Routine Checkup</td><td><span className="badge badge-warning">Waiting</span></td><td><a className="card-action">Start Consult</a></td></tr>
            </tbody>
          </table>

          <div className="section-title" style={{ marginTop: 32 }}><i className="fas fa-notes-medical"></i> Quick Actions</div>
          <div className="quick-actions">
            <button className="action-btn"><i className="fas fa-user-plus"></i> New Patient</button>
            <button className="action-btn action-btn-outline"><i className="fas fa-file-prescription"></i> Write Prescription</button>
            <button className="action-btn action-btn-outline"><i className="fas fa-chart-line"></i> View Lab Results</button>
            <button className="action-btn action-btn-outline"><i className="fas fa-history"></i> Patient History</button>
          </div>

          <div className="cards-grid">
            <div className="feature-card"><div className="card-icon"><i className="fas fa-notes-medical"></i></div><div className="card-title">Clinical Notes</div><div className="card-desc">Add and manage patient consultation notes, diagnosis, and treatment plans.</div><a className="card-action">Write New Note →</a></div>
            <div className="feature-card"><div className="card-icon"><i className="fas fa-flask"></i></div><div className="card-title">Lab Orders</div><div className="card-desc">Request laboratory tests and review results for your patients.</div><a className="card-action">Order Lab Test →</a></div>
            <div className="feature-card"><div className="card-icon"><i className="fas fa-chart-bar"></i></div><div className="card-title">Patient Analytics</div><div className="card-desc">View patient health trends and treatment outcomes.</div><a className="card-action">View Analytics →</a></div>
          </div>
        </div>
        <div className="dashboard-footer"><i className="fas fa-shield-alt"></i> Secure Clinical Access • HIPAA Compliant • Last sync: Just now</div>
      </div>
    </>
  );
}