import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  IconButton,
} from '@mui/material';
import {
  Close as CloseIcon,
  Warning as WarningIcon,
  ChangeCircle as ChangeIcon,
} from '@mui/icons-material';
import { useCallback, useEffect } from 'react';
import { useMonitorMutations } from '../../hook/useMonitorMutations';
import type { Monitor } from '../../model/Monitor';

interface MonitorDeleteDialogProps {
  open: boolean;
  monitor: Monitor | null;
  onClose: () => void;
  onSuccess?: (monitor: Monitor) => void;
}

export const MonitorDeleteDialog = ({ open, monitor, onClose, onSuccess }: MonitorDeleteDialogProps) => {
  const { changeMonitorState, changingState, error, clearError } = useMonitorMutations();

  const resetForm = useCallback(() => {
    clearError();
  }, [clearError]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!monitor) return;

    const result = await changeMonitorState(monitor.id);
    
    if (result && onSuccess) {
      onSuccess(result);
      resetForm();
      onClose();
    }
  }, [monitor, changeMonitorState, onSuccess, resetForm, onClose]);

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  useEffect(() => {
    if (open) {
      clearError();
    }
  }, [open, clearError]);

  if (!monitor) return null;

  const isCurrentlyActive = monitor.state === 'ACTIVO';

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: { borderRadius: 2 }
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 1 
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <WarningIcon sx={{ color: 'warning.main' }} />
          <Typography variant="h6" sx={{ color: '#000', fontWeight: 'bold' }}>
            Cambiar Estado del Monitor
          </Typography>
        </Box>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Información del monitor */}
            <Box sx={{ 
              p: 2, 
              bgcolor: 'grey.50', 
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'grey.300'
            }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Monitor seleccionado:
              </Typography>
              <Typography variant="h6" sx={{ color: '#000', fontWeight: 'medium' }}>
                {monitor.username}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {monitor.first_name} {monitor.last_name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Estado actual: <strong>{monitor.state}</strong>
              </Typography>
            </Box>

            {/* Advertencia */}
            {isCurrentlyActive && (
              <Alert severity="warning" sx={{ mb: 1 }}>
                <Typography variant="body2">
                  Estás a punto de cambiar el estado de un monitor activo. 
                  Esta acción afectará su acceso al sistema.
                </Typography>
              </Alert>
            )}

            {/* Descripción de la acción */}
            <Box sx={{ 
              p: 2, 
              bgcolor: 'warning.50', 
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'warning.200'
            }}>
              <Typography variant="body2" sx={{ color: 'warning.dark' }}>
                <strong>¿Qué sucederá con este cambio?</strong>
              </Typography>
              <Typography variant="body2" sx={{ color: 'warning.dark', mt: 0.5 }}>
                El sistema determinará automáticamente el nuevo estado del monitor según su estado actual.
              </Typography>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            disabled={changingState}
            sx={{ mr: 1 }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={changingState}
            color="warning"
            startIcon={changingState ? <CircularProgress size={16} /> : <ChangeIcon />}
            sx={{ borderRadius: 2 }}
          >
            {changingState ? 'Cambiando...' : 'Cambiar Estado'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default MonitorDeleteDialog;