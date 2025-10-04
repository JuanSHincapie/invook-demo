import { createContext, useState, useMemo, useEffect, type ReactNode } from 'react';
import { AuthService } from '../../modules/login/service/AuthService';
import { NavigationService } from '../services/NavigationService';
import type { User } from '../domain/Auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; user?: User }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: Readonly<AuthProviderProps>) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const authService = AuthService();

  // Inicializar el estado de autenticación al cargar la aplicación
  useEffect(() => {
    const initializeAuth = () => {
      try {
        if (authService.isAuthenticated()) {
          const currentUser = authService.getCurrentUser();
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Error al inicializar autenticación:', error);
        authService.clearAuthData();
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [authService]);

  const isAuthenticated = user !== null && authService.isAuthenticated();

  const login = useMemo(() => async (username: string, password: string): Promise<{ success: boolean; user?: User }> => {
    console.log('AuthContext: Iniciando login para usuario:', username);
    setIsLoading(true);
    try {
      const response = await authService.login({ username, password });
      console.log('AuthContext: Respuesta del login:', response);
      
      if (response.user) {
        // Verificar si el usuario tiene un rol autorizado
        if (!NavigationService.isAuthorizedRole(response.user)) {
          console.warn(`AuthContext: Usuario '${response.user.username}' con rol '${response.user.role}' no autorizado`);
          return { 
            success: false, 
            user: response.user 
          };
        }
        
        setUser(response.user);
        console.log('AuthContext: Usuario autorizado establecido:', response.user);
        return { success: true, user: response.user };
      }
      
      console.log('AuthContext: Login falló - no hay usuario en la respuesta');
      return { success: false };
    } catch (error) {
      console.error('AuthContext: Error en login:', error);
      return { success: false };
    } finally {
      setIsLoading(false);
      console.log('AuthContext: isLoading establecido a false');
    }
  }, [authService]);

  const logout = useMemo(() => () => {
    try {
      authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Error en logout:', error);
    }
  }, [authService]);

  const value = useMemo<AuthContextType>(() => ({
    user,
    isAuthenticated,
    login,
    logout,
    isLoading: isLoading || !isInitialized,
  }), [user, isAuthenticated, login, logout, isLoading, isInitialized]);

  // Mostrar loading mientras se inicializa
  if (!isInitialized) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Cargando...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}