import { Navigate } from "react-router-dom";

interface ProtectedRoutesProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

export default function ProtectedRoutes({
  isAuthenticated,
  children,
}: Readonly<ProtectedRoutesProps>) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
