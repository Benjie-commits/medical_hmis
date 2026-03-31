export default async function RoleDashboard({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  return (
    <main style={{ padding: "24px" }}>
      <h1>{role} dashboard</h1>
      <p>Role-specific widgets and modules go here.</p>
    </main>
  );
}
