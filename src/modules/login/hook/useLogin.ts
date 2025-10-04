import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../shared/hooks/useAuth';
import { NavigationService } from '../../../shared/services/NavigationService';
import type { LoginFormState } from '../model/Login';

export function useLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formState, setFormState] = useState<LoginFormState>({
    username: '',
    password: '',
    error: '',
    isLoading: false,
  });

  const updateField = useCallback((field: keyof Omit<LoginFormState, 'error' | 'isLoading'>, value: string) => {
    setFormState(prev => ({
      ...prev,
      [field]: value,
      error: '', // Limpiar error al cambiar campos
    }));
  }, []);

  const handleLogin = useCallback(async () => {
    if (!formState.username || !formState.password) {
      setFormState(prev => ({
        ...prev,
        error: 'Por favor, completa todos los campos',
      }));
      return;
    }

    console.log('useLogin: Iniciando proceso de login');
    setFormState(prev => ({
      ...prev,
      isLoading: true,
      error: '',
    }));

    try {
      console.log('useLogin: Llamando a login con credenciales');
      const result = await login(formState.username, formState.password);
      console.log('useLogin: Resultado del login:', result);
      
      if (result.success && result.user) {
        console.log('useLogin: Login exitoso');
        
        // Resetear el estado de loading antes de navegar
        setFormState(prev => ({
          ...prev,
          isLoading: false,
        }));
        
        // Usar el NavigationService para determinar la ruta basada en el rol
        const destinationRoute = NavigationService.getRouteForUser(result.user);
        console.log('useLogin: Navegando a:', destinationRoute);
        navigate(destinationRoute);
      } else if (result.user && !NavigationService.isAuthorizedRole(result.user)) {
        // Usuario válido pero sin rol autorizado
        console.log('useLogin: Usuario sin autorización para acceder');
        setFormState(prev => ({
          ...prev,
          error: `Acceso denegado. El rol '${result.user?.role}' no tiene permisos para acceder al sistema.`,
          isLoading: false,
        }));
      } else {
        console.log('useLogin: Login falló');
        setFormState(prev => ({
          ...prev,
          error: 'Credenciales inválidas. Por favor, verifica tu usuario y contraseña.',
          isLoading: false,
        }));
      }
    } catch (error) {
      console.error('useLogin: Error durante el login:', error);
      setFormState(prev => ({
        ...prev,
        error: 'Error al iniciar sesión. Intenta nuevamente.',
        isLoading: false,
      }));
    }
  }, [formState.username, formState.password, login, navigate]);

  return {
    formState,
    updateField,
    handleLogin,
  };
}