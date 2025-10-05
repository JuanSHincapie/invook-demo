import {
  Box,
  Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { useGetHardware } from '../../hooks/hardware/useGetHardware';
import { HardwareHeader } from './HardwareHeader';
import { HardwareTable } from './HardwareTable';
import { HardwareFormDialog } from './HardwareFormDialog';
import type { Hardware } from '../../model/Hardware';

const HardwarePage = () => {
  const navigate = useNavigate();
  const { hardware, loading, error, searchByType, clearFilters, refetch } = useGetHardware();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleEdit = useCallback((serial: string) => {
    console.log('Editar equipo:', serial);
  }, []);

  const handleDelete = useCallback((serial: string) => {
    console.log('Eliminar equipo:', serial);
  }, []);

  const handleAddNew = useCallback(() => {
    setIsFormOpen(true);
  }, []);

  const handleFormClose = useCallback(() => {
    setIsFormOpen(false);
  }, []);

  const handleFormSuccess = useCallback((newHardware: Hardware) => {
    console.log('Hardware creado exitosamente:', newHardware);
    refetch();
  }, [refetch]);

  const handleSearch = useCallback((searchTerm: string) => {
    searchByType(searchTerm);
  }, [searchByType]);

  const handleClearSearch = useCallback(() => {
    clearFilters();
  }, [clearFilters]);

  const handleBackToInventory = useCallback(() => {
    navigate('/inventory');
  }, [navigate]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Header sticky que permanece visible */}
        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            backgroundColor: 'background.default',
            pb: 2,
            mb: 2,
          }}
        >
          <HardwareHeader 
            onBack={handleBackToInventory}
            onAddNew={handleAddNew}
            onSearch={handleSearch}
            onClearSearch={handleClearSearch}
            totalCount={hardware.length}
          />
        </Box>

        {/* Contenedor con scroll para la tabla */}
        <Box 
          sx={{ 
            maxHeight: '600px', 
            overflow: 'auto', 
            border: '1px solid',
            borderColor: 'grey.300',
            borderRadius: 2,
          }}
        >
          <HardwareTable 
            hardware={hardware}
            loading={loading}
            error={error}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Box>

        <HardwareFormDialog
          open={isFormOpen}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      </Box>
    </Container>
  );
};

export default HardwarePage;