import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoutes from '../modules/routes/ProtectedRoutes';
import { useAuth } from '../hooks/useAuth';
import Login from '../../modules/login/components/Login';
import Navbar from '../navbar/components/Navbar';
import HomePage from '../../modules/home/components/HomePage';

// Componentes temporales - estos deberían ser reemplazados por los componentes reales
const TemporaryPage = ({ title }: { title: string }) => (
  <div style={{ padding: '20px' }}>
    <h1>{title}</h1>
    <p>Esta es una página temporal. Aquí irá el componente {title}.</p>
  </div>
);

export default function AppRoutes() {
  const { isAuthenticated } = useAuth(); 

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Routes>
        <Route 
          path="/login" 
          element={<Login />} 
        />
        <Route
          path="/*"
          element={
            <ProtectedRoutes isAuthenticated={isAuthenticated}>
              <Navbar />
              
              <main style={{ flex: 1, padding: '1rem' }}>
                <Routes>
                  <Route path="/" element={<Navigate to="/home" replace />} />
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/inventory" element={<TemporaryPage title="Inventory" />} />
                  <Route path="/inventory/equipos" element={<TemporaryPage title="Equipos" />} />
                  <Route path="/inventory/consumibles" element={<TemporaryPage title="Consumibles" />} />
                  <Route path="/resources" element={<TemporaryPage title="Resources" />} />
                  <Route path="/resources/prestamos" element={<TemporaryPage title="Préstamos" />} />
                  <Route path="/resources/consumos" element={<TemporaryPage title="Consumos" />} />
                  <Route path="/users" element={<TemporaryPage title="Users" />} />
                  <Route path="/users/monitor" element={<TemporaryPage title="Monitor Usuario" />} />
                  <Route path="/users/prestamistas" element={<TemporaryPage title="Prestamistas" />} />
                  <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
              </main>
            </ProtectedRoutes>
          }
        />
      </Routes>
    </div>
  );
}