import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { NavigationService } from "../../services/NavigationService";

interface ProtectedRoutesProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
  requireRole?: string; // Rol específico requerido (opcional)
}

export default function ProtectedRoutes({
  isAuthenticated,
  children,
  requireRole,
}: Readonly<ProtectedRoutesProps>) {
  const location = useLocation();
  const { user, logout } = useAuth();

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Verificar si el usuario tiene un rol autorizado para usar el sistema
  if (user && !NavigationService.isAuthorizedRole(user)) {
    console.warn(`Acceso denegado: Rol '${user.role}' no autorizado para acceder al sistema`);
    // Cerrar sesión y redirigir al login
    logout();
    return <Navigate to="/login" replace />;
  }

  // Si se requiere un rol específico y el usuario no lo tiene
  if (requireRole && user?.role !== requireRole) {
    console.warn(`Acceso denegado: Se requiere rol '${requireRole}', usuario tiene '${user?.role}'`);
    // Redirigir a la ruta apropiada para su rol
    const userRoute = user ? NavigationService.getRouteForUser(user) : '/home';
    return <Navigate to={userRoute} replace />;
  }

  // Verificar si el usuario tiene acceso a la ruta actual
  if (user && !NavigationService.canAccessRoute(user, location.pathname)) {
    console.warn(`Acceso denegado a la ruta: ${location.pathname} para el rol: ${user.role}`);
    // Redirigir a la ruta apropiada para su rol
    const userRoute = NavigationService.getRouteForUser(user);
    return <Navigate to={userRoute} replace />;
  }

  return <>{children}</>;
}
