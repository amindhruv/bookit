import { AuthProvider } from "@/context/authContext";
import { ReactNode } from "react";

export default function AuthWrapper({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
