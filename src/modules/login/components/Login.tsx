import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginLayout } from './LoginLayout';
import { LoginForm } from './LoginForm';
import { useAuth } from '../../../shared/hooks/useAuth';

export default function Login() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSuccess = () => {
    console.log('Login exitoso');
  };

  return (
    <LoginLayout>
      <LoginForm onSubmit={handleLoginSuccess} />
    </LoginLayout>
  );
}