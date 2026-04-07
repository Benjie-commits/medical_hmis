import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-left">
          <h1>HMIS Frontend Home</h1>
          <p>Select a dashboard to open.</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="section-title">Navigation</div>

        <div className="cards-grid">
          <Link to="/doctor" className="feature-card">
            <div className="card-icon"><i className="fas fa-user-md"></i></div>
            <div className="card-title">Doctor</div>
          </Link>
          <Link to="/nurse" className="feature-card">
            <div className="card-icon"><i className="fas fa-user-nurse"></i></div>
            <div className="card-title">Nurse</div>
          </Link>
          <Link to="/manager" className="feature-card">
            <div className="card-icon"><i className="fas fa-chart-pie"></i></div>
            <div className="card-title">Manager</div>
          </Link>
          <Link to="/labtech" className="feature-card">
            <div className="card-icon"><i className="fas fa-vials"></i></div>
            <div className="card-title">Lab Technician</div>
          </Link>
          <Link to="/patient" className="feature-card">
            <div className="card-icon"><i className="fas fa-user"></i></div>
            <div className="card-title">Patient</div>
          </Link>
          <Link to="/pharmacist" className="feature-card">
            <div className="card-icon"><i className="fas fa-pills"></i></div>
            <div className="card-title">Pharmacist</div>
          </Link>
          <Link to="/receptionist" className="feature-card">
            <div className="card-icon"><i className="fas fa-calendar-alt"></i></div>
            <div className="card-title">Receptionist</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;