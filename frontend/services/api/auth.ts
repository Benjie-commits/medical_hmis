import { apiClient } from "./client";
import type { LoginPayload, LoginResponse } from "@/types/auth";

export const roleRoutes: Record<string, string> = {
  doctor: "/dashboard/doctor",
  nurse: "/dashboard/nurse",
  receptionist: "/dashboard/receptionist",
  pharmacist: "/dashboard/pharmacist",
  lab_technician: "/dashboard/lab-technician",
  manager: "/dashboard/manager",
  patient: "/dashboard/patient"
};

export function login(payload: LoginPayload): Promise<LoginResponse> {
  return apiClient<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}
