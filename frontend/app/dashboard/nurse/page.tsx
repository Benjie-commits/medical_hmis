"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NurseDashboard() {
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
            <h1><i className="fas fa-heartbeat"></i> Patient Care Dashboard</h1>
            <p>Welcome back, {user?.username} • Ward 3</p>
          </div>
          <div className="header-right">
            <div className="user-info">
              <div className="user-avatar">{user?.username?.slice(0, 2).toUpperCase()}</div>
              <div className="user-details">
                <div className="user-name">{user?.username}</div>
                <div className="user-role">Senior Nurse</div>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</button>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="stats-grid">
            <div className="stat-card"><div className="stat-icon"><i className="fas fa-procedures"></i></div><div className="stat-value">18</div><div className="stat-label">Active Patients</div></div>
            <div className="stat-card"><div className="stat-icon"><i className="fas fa-thermometer-half"></i></div><div className="stat-value">6</div><div className="stat-label">Vitals Due</div></div>
            <div className="stat-card"><div className="stat-icon"><i className="fas fa-syringe"></i></div><div className="stat-value">12</div><div className="stat-label">Medications Today</div></div>
            <div className="stat-card"><div className="stat-icon"><i className="fas fa-bed"></i></div><div className="stat-value">4</div><div className="stat-label">Pending Admissions</div></div>
          </div>

          <div className="section-title"><i className="fas fa-chart-line"></i> Patient Vitals Monitoring</div>
          <table className="data-table">
            <thead><tr><th>Room/Bed</th><th>Patient</th><th>BP</th><th>Temp</th><th>HR</th><th>Last Check</th><th>Action</th></tr></thead>
            <tbody>
              <tr><td>Ward 3 - Bed 4</td><td>Peter Okello</td><td>130/85</td><td>37.2°C</td><td>78</td><td>2 hrs ago</td><td><a className="card-action">Record</a></td></tr>
              <tr><td>Ward 3 - Bed 6</td><td>Lucy Akello</td><td>145/92</td><td>38.1°C</td><td>95</td><td>4 hrs ago</td><td><a className="card-action">Record</a></td></tr>
              <tr><td>ICU - Bed 2</td><td>James Ochieng</td><td>110/70</td><td>36.8°C</td><td>82</td><td>30 min ago</td><td><a className="card-action">Record</a></td></tr>
            </tbody>
          </table>

          <div className="section-title" style={{ marginTop: 32 }}><i className="fas fa-tasks"></i> Nursing Tasks</div>
          <div className="quick-actions">
            <button className="action-btn"><i className="fas fa-thermometer-full"></i> Record Vitals</button>
            <button className="action-btn action-btn-outline"><i className="fas fa-syringe"></i> Administer Medication</button>
            <button className="action-btn action-btn-outline"><i className="fas fa-band-aid"></i> Wound Care</button>
            <button className="action-btn action-btn-outline"><i className="fas fa-chart-simple"></i> Update Patient Status</button>
          </div>

          <div className="cards-grid">
            <div className="feature-card"><div className="card-icon"><i className="fas fa-notes-medical"></i></div><div className="card-title">Nursing Notes</div><div className="card-desc">Document patient observations and nursing interventions.</div><a className="card-action">Add Notes →</a></div>
            <div className="feature-card"><div className="card-icon"><i className="fas fa-calendar-alt"></i></div><div className="card-title">Shift Handover</div><div className="card-desc">Prepare and view shift handover reports.</div><a className="card-action">View Handover →</a></div>
          </div>
        </div>
        <div className="dashboard-footer"><i className="fas fa-shield-alt"></i> Patient Care Documentation • HIPAA Compliant</div>
      </div>
    </>
  );
}