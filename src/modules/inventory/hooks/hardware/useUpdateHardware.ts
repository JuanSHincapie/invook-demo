import { useState, useCallback } from 'react';
import { 
  updateHardwareWithValidation,
  updateHardwareState,
  updateHardwareAvailability,
  updateHardwareBasicInfo,
  type UpdateHardwareRequest,
  type UpdateHardwareResponse 
} from '../../service/hardware/updateHardware';

interface UseUpdateHardwareReturn {
  loading: boolean;
  error: string | null;
  updateHardware: (serial: string, updateData: UpdateHardwareRequest) => Promise<UpdateHardwareResponse | null>;
  updateState: (serial: string, state: string) => Promise<UpdateHardwareResponse | null>;
  updateAvailability: (serial: string, available: string) => Promise<UpdateHardwareResponse | null>;
  updateBasicInfo: (serial: string, basicInfo: Pick<UpdateHardwareRequest, 'name' | 'description' | 'comment'>) => Promise<UpdateHardwareResponse | null>;
  clearError: () => void;
}

export const useUpdateHardware = (): UseUpdateHardwareReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleUpdateHardware = useCallback(async (
    serial: string, 
    updateData: UpdateHardwareRequest
  ): Promise<UpdateHardwareResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Iniciando actualización de hardware:', { serial, updateData });
      
      const result = await updateHardwareWithValidation(serial, updateData);
      
      console.log('Hardware actualizado exitosamente:', result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido al actualizar hardware';
      console.error('Error en actualización de hardware:', err);
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUpdateState = useCallback(async (
    serial: string, 
    state: string
  ): Promise<UpdateHardwareResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Actualizando estado de hardware:', { serial, state });
      
      const result = await updateHardwareState(serial, state);
      
      console.log('Estado actualizado exitosamente:', result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar estado del hardware';
      console.error('Error al actualizar estado:', err);
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUpdateAvailability = useCallback(async (
    serial: string, 
    available: string
  ): Promise<UpdateHardwareResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Actualizando disponibilidad de hardware:', { serial, available });
      
      const result = await updateHardwareAvailability(serial, available);
      
      console.log('Disponibilidad actualizada exitosamente:', result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar disponibilidad del hardware';
      console.error('Error al actualizar disponibilidad:', err);
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const handleUpdateBasicInfo = useCallback(async (
    serial: string,
    basicInfo: Pick<UpdateHardwareRequest, 'name' | 'description' | 'comment'>
  ): Promise<UpdateHardwareResponse | null> => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Actualizando información básica de hardware:', { serial, basicInfo });
      
      const result = await updateHardwareBasicInfo(serial, basicInfo);
      
      console.log('Información básica actualizada exitosamente:', result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al actualizar información del hardware';
      console.error('Error al actualizar información básica:', err);
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    updateHardware: handleUpdateHardware,
    updateState: handleUpdateState,
    updateAvailability: handleUpdateAvailability,
    updateBasicInfo: handleUpdateBasicInfo,
    clearError,
  };
};

export default useUpdateHardware;