import { useState, useEffect, useCallback } from "react";
import { 
  getSupplies, 
  searchSupplies,
} from "../../service/supply/getSupplies";
import type { Supply } from "../../model/Supply";

interface UseGetSuppliesReturn {
  supplies: Supply[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  searchSupplies: (searchTerm: string) => Promise<void>;
  filterByAccount: (cuenta: string) => Promise<void>;
  getLowStock: (minExistencia?: number) => Promise<void>;
  clearFilters: () => Promise<void>;
}

export const useGetSupplies = (): UseGetSuppliesReturn => {
  const [supplies, setSupplies] = useState<Supply[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadAllSupplies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSupplies();
      setSupplies(data);
    } catch (err) {
      console.error("Error al cargar suministros:", err);
      setError(err instanceof Error ? err.message : "Error desconocido al cargar suministros");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearchSupplies = useCallback(async (searchTerm: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchSupplies(searchTerm);
      setSupplies(data);
    } catch (err) {
      console.error("Error al buscar suministros:", err);
      setError(err instanceof Error ? err.message : "Error al buscar suministros");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleFilterByAccount = useCallback(async (cuenta: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSuppliesByAccount(cuenta);
      setSupplies(data);
    } catch (err) {
      console.error("Error al filtrar suministros por cuenta:", err);
      setError(err instanceof Error ? err.message : "Error al filtrar suministros");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleGetLowStock = useCallback(async (minExistencia: number = 10) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getLowStockSupplies(minExistencia);
      setSupplies(data);
    } catch (err) {
      console.error("Error al obtener suministros con existencia baja:", err);
      setError(err instanceof Error ? err.message : "Error al obtener suministros con existencia baja");
    } finally {
      setLoading(false);
    }
  }, []);

  const clearFilters = useCallback(async () => {
    await loadAllSupplies();
  }, [loadAllSupplies]);

  useEffect(() => {
    loadAllSupplies();
  }, [loadAllSupplies]);

  return {
    supplies,
    loading,
    error,
    refetch: loadAllSupplies,
    searchSupplies: handleSearchSupplies,
    filterByAccount: handleFilterByAccount,
    getLowStock: handleGetLowStock,
    clearFilters,
  };
};

export default useGetSupplies;