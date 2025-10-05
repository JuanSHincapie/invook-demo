import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Toolbar,
  Button
} from '@mui/material';
import {
  Computer as ComputerIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const hardwareData = [
  {
    id: '1',
    serial: 'HP-001-2024',
    nombre: 'HP EliteBook 840',
    descripcion: 'Laptop para desarrollo',
    tipo: 'Laptop',
    estado: 'activo'
  },
  {
    id: '2',
    serial: 'DELL-002-2024',
    nombre: 'Dell OptiPlex 3080',
    descripcion: 'Computador de escritorio oficina',
    tipo: 'Desktop',
    estado: 'activo'
  },
  {
    id: '3',
    serial: 'LEN-003-2024',
    nombre: 'Lenovo ThinkPad X1',
    descripcion: 'Laptop ejecutiva',
    tipo: 'Laptop',
    estado: 'mantenimiento'
  },
  {
    id: '4',
    serial: 'HP-004-2024',
    nombre: 'HP LaserJet Pro',
    descripcion: 'Impresora láser monocromática',
    tipo: 'Impresora',
    estado: 'activo'
  },
  {
    id: '5',
    serial: 'SAM-005-2024',
    nombre: 'Samsung Monitor 24"',
    descripcion: 'Monitor LED Full HD',
    tipo: 'Monitor',
    estado: 'retirado'
  }
];

const getStatusColor = (estado: string): 'success' | 'warning' | 'error' | 'default' => {
  switch (estado) {
    case 'activo':
      return 'success';
    case 'mantenimiento':
      return 'warning';
    case 'retirado':
      return 'error';
    case 'inactivo':
      return 'default';
    default:
      return 'default';
  }
};

const getStatusLabel = (estado: string) => {
  switch (estado) {
    case 'activo':
      return 'Activo';
    case 'mantenimiento':
      return 'Mantenimiento';
    case 'retirado':
      return 'Retirado';
    case 'inactivo':
      return 'Inactivo';
    default:
      return estado;
  }
};

const HardwarePage = () => {
  const navigate = useNavigate();

  const handleEdit = (id: string) => {
    console.log('Editar equipo:', id);
  };

  const handleDelete = (id: string) => {
    console.log('Eliminar equipo:', id);
  };

  const handleAddNew = () => {
    console.log('Agregar nuevo equipo');
  };

  const handleBackToInventory = () => {
    navigate('/inventory');
  };
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={handleBackToInventory}
              sx={{ borderRadius: 2 }}
            >
              Volver
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <ComputerIcon sx={{ fontSize: 40, color: 'primary.main' }} />
              <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Gestión de Equipos
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddNew}
            sx={{ borderRadius: 2 }}
          >
            Nuevo Equipo
          </Button>
        </Box>
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
          <Toolbar sx={{ bgcolor: 'grey.50', borderRadius: '8px 8px 0 0' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'medium' }}>
              Lista de Equipos ({hardwareData.length})
            </Typography>
          </Toolbar>
          
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: 'grey.100' }}>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Serial</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Descripción</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Tipo</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem', textAlign: 'center' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hardwareData.map((item) => (
                <TableRow 
                  key={item.id}
                  sx={{ 
                    '&:nth-of-type(odd)': { bgcolor: 'action.hover' },
                    '&:hover': { bgcolor: 'action.selected' },
                    cursor: 'pointer'
                  }}
                >
                  <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.875rem' }}>
                    {item.serial}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'medium' }}>
                    {item.nombre}
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>
                    {item.descripcion}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={item.tipo} 
                      size="small" 
                      variant="outlined"
                      sx={{ borderRadius: 1 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={getStatusLabel(item.estado)} 
                      color={getStatusColor(item.estado)}
                      size="small"
                      sx={{ borderRadius: 1, fontWeight: 'medium' }}
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                      <IconButton 
                        size="small" 
                        onClick={() => handleEdit(item.id)}
                        sx={{ color: 'primary.main' }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        onClick={() => handleDelete(item.id)}
                        sx={{ color: 'error.main' }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ mt: 3, p: 2, bgcolor: 'info.50', borderRadius: 2, border: '1px solid', borderColor: 'info.200' }}>
          <Typography variant="body2" color="info.main">
            💡 <strong>Tip:</strong> Haz clic en las filas para ver más detalles. 
            Utiliza los botones de acción para editar o eliminar equipos.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default HardwarePage;