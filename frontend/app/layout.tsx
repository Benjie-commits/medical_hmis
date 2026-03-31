import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";

export const metadata = {
  title: "HMIS",
  description: "Hospital Management Information System"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
