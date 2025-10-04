import { LoginLayout } from './LoginLayout';
import { LoginForm } from './LoginForm';

export default function Login() {
  const handleLoginSuccess = () => {
    console.log('Login exitoso');
  };

  return (
    <LoginLayout>
      <LoginForm onSubmit={handleLoginSuccess} />
    </LoginLayout>
  );
}