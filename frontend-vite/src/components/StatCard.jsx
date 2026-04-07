function StatCard({ icon: Icon, value, label, isLoading }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        {Icon && <Icon />}
      </div>
      <div className="stat-value">
        {isLoading ? '...' : value}
      </div>
      <div className="stat-label">{label}</div>
    </div>
  );
}