"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ManagerDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("hmis_user");
    if (!stored) {
      router.replace("/");
      return;
    }
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
        .logout-btn { background: rgba(255,255,255,0.15); border: none; color: white; padding: 8px 16px; border-radius: 30px; cursor: pointer; font-size: 12px; transition: all 0.2s; }
        .logout-btn:hover { background: rgba(255,255,255,0.25); }
        .dashboard-content { padding: 32px; }
        .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 32px; }
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
        .quick-actions { display: flex; gap: 12px; flex-wrap: wrap; margin: 20px 0; }
        .action-btn { background: linear-gradient(135deg, #c0446c 0%, #d4607e 100%); border: none; color: white; padding: 10px 24px; border-radius: 30px; font-size: 13px; font-weight: 500; cursor: pointer; transition: opacity 0.2s; }
        .action-btn-outline { background: transparent; border: 1px solid #d4607e; color: #c0446c; }
        .action-btn:hover { opacity: 0.9; }
        .dashboard-footer { padding: 20px 32px; background: #faf5f7; border-top: 1px solid #f2c4ce; text-align: center; font-size: 11px; color: #9a6880; }
      `}</style>

      <div className="dashboard-container">
        <div className="dashboard-header">
          <div className="header-left">
            <h1><i className="fas fa-chart-line"></i> Administration Dashboard</h1>
            <p>Welcome back, {user?.username} • Hospital Administrator</p>
          </div>
          <div className="header-right">
            <div className="user-info">
              <div className="user-avatar">{user?.username?.slice(0, 2).toUpperCase()}</div>
              <div className="user-details">
                <div className="user-name">{user?.username}</div>
                <div className="user-role">Hospital Administrator</div>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</button>
          </div>
        </div>

        <div className="dashboard-content">
          <div className="stats-grid">
            <div className="stat-card"><div className="stat-icon"><i className="fas fa-users"></i></div><div className="stat-value">1,284</div><div className="stat-label">Total Patients (MTD)</div></div>
            <div className="stat-card"><div className="stat-icon"><i className="fas fa-dollar-sign"></i></div><div className="stat-value">UGX 18.2M</div><div className="stat-label">Monthly Revenue</div></div>
            <div className="stat-card"><div className="stat-icon"><i className="fas fa-user-md"></i></div><div className="stat-value">48</div><div className="stat-label">Active Staff</div></div>
            <div className="stat-card"><div className="stat-icon"><i className="fas fa-chart-simple"></i></div><div className="stat-value">92%</div><div className="stat-label">Occupancy Rate</div></div>
          </div>

          <div className="section-title"><i className="fas fa-chart-pie"></i> Key Performance Indicators</div>
          <div className="cards-grid">
            <div className="feature-card"><div className="card-icon"><i className="fas fa-stethoscope"></i></div><div className="card-title">Patient Satisfaction</div><div className="card-desc">Current rating: 4.8/5 • Target: 4.5/5</div><a className="card-action">View Details →</a></div>
            <div className="feature-card"><div className="card-icon"><i className="fas fa-clock"></i></div><div className="card-title">Wait Times</div><div className="card-desc">Average: 22 min • Target: &lt;30 min</div><a className="card-action">View Details →</a></div>
            <div className="feature-card"><div className="card-icon"><i className="fas fa-file-invoice-dollar"></i></div><div className="card-title">Revenue vs Target</div><div className="card-desc">18.2M / 20.0M (91%)</div><a className="card-action">View Details →</a></div>
          </div>

          <div className="section-title" style={{ marginTop: 32 }}><i className="fas fa-users-cog"></i> System Management</div>
          <div className="quick-actions">
            <button className="action-btn"><i className="fas fa-user-plus"></i> Add Staff User</button>
            <button className="action-btn action-btn-outline"><i className="fas fa-chart-line"></i> Generate Reports</button>
            <button className="action-btn action-btn-outline"><i className="fas fa-sliders-h"></i> System Settings</button>
            <button className="action-btn action-btn-outline"><i className="fas fa-database"></i> Backup Data</button>
          </div>

          <div className="cards-grid" style={{ marginTop: 24 }}>
            <div className="feature-card"><div className="card-icon"><i className="fas fa-chart-bar"></i></div><div className="card-title">Monthly Analytics</div><div className="card-desc">Patient trends, revenue analysis, and department performance.</div><a className="card-action">View Reports →</a></div>
            <div className="feature-card"><div className="card-icon"><i className="fas fa-user-shield"></i></div><div className="card-title">User Management</div><div className="card-desc">Manage user roles, permissions, and access control.</div><a className="card-action">Manage Users →</a></div>
            <div className="feature-card"><div className="card-icon"><i className="fas fa-chart-line"></i></div><div className="card-title">Audit Logs</div><div className="card-desc">View system activity and security audit trails.</div><a className="card-action">View Logs →</a></div>
          </div>
        </div>
        <div className="dashboard-footer"><i className="fas fa-shield-alt"></i> Administrative Access • Full Audit Trail Enabled</div>
      </div>
    </>
  );
}