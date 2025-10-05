import { useState, useEffect } from 'react';
import { getHardware, getHardwareByType } from '../../service/hardware/getHardware';
import type { Hardware } from '../../model/Hardware';

interface UseGetHardwareReturn {
  hardware: Hardware[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  filterByType: (type: string) => Promise<void>;
  clearFilters: () => Promise<void>;
}

export const useGetHardware = (): UseGetHardwareReturn => {
  const [hardware, setHardware] = useState<Hardware[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadAllHardware = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getHardware();
      setHardware(data);
    } catch (err) {
      console.error('Error al cargar hardware:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido al cargar hardware');
    } finally {
      setLoading(false);
    }
  };
  const filterByType = async (type: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getHardwareByType(type);
      setHardware(data);
    } catch (err) {
      console.error('Error al filtrar hardware por tipo:', err);
      setError(err instanceof Error ? err.message : 'Error al filtrar hardware');
    } finally {
      setLoading(false);
    }
  };
  const clearFilters = async () => {
    await loadAllHardware();
  };
  useEffect(() => {
    loadAllHardware();
  }, []);

  return {
    hardware,
    loading,
    error,
    refetch: loadAllHardware,
    filterByType,
    clearFilters,
  };
};

export default useGetHardware;