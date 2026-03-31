import type { UserRole } from "@/types/auth";

const roles: { value: UserRole; label: string }[] = [
  { value: "doctor", label: "Doctor" },
  { value: "nurse", label: "Nurse" },
  { value: "receptionist", label: "Receptionist" },
  { value: "pharmacist", label: "Pharmacist" },
  { value: "lab_technician", label: "Lab Technician" },
  { value: "manager", label: "Manager" },
  { value: "patient", label: "Student/Patient" }
];

export function RoleSelector({
  value,
  onChange
}: {
  value: UserRole;
  onChange: (value: UserRole) => void;
}) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value as UserRole)} required>
      {roles.map((role) => (
        <option key={role.value} value={role.value}>
          {role.label}
        </option>
      ))}
    </select>
  );
}
