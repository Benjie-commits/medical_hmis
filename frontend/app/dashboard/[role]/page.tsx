import { redirect } from "next/navigation";

export default async function RoleDashboard({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;

  const roleRoutes: Record<string, string> = {
    manager: "/dashboard/manager",
    doctor: "/dashboard/doctor",
    nurse: "/dashboard/nurse",
    receptionist: "/dashboard/receptionist",
    pharmacist: "/dashboard/pharmacist",
    lab_technician: "/dashboard/lab_technician",
    patient: "/dashboard/patient",
  };

  const route = roleRoutes[role];
  if (route) {
    redirect(route);
  }

  return (
    <main style={{ padding: "24px" }}>
      <h1>{role} dashboard</h1>
      <p>Coming soon.</p>
    </main>
  );
} 