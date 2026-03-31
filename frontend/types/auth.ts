export type UserRole =
  | "doctor"
  | "nurse"
  | "receptionist"
  | "pharmacist"
  | "lab_technician"
  | "manager"
  | "patient";

export interface LoginPayload {
  username: string;
  password: string;
  role: UserRole;
  rememberDevice: boolean;
}

export interface AuthUser {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
  phone: string;
}

export interface LoginResponse {
  message: string;
  access: string;
  user: AuthUser;
}
