import { useState, useEffect, useCallback } from "react";
import { getLenders } from "../service/getLender";
import type { Lender, LendersPaginatedData } from "../model/Lender";

interface UseGetLendersReturn {
  lenders: Lender[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  refetch: () => void;
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
}

export const useGetLenders = (): UseGetLendersReturn => {
  const [lenders, setLenders] = useState<Lender[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);

  const fetchLenders = useCallback(async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      
      const response: LendersPaginatedData = await getLenders(page);
      
      setLenders(response.results || []);
      setTotalCount(response.count || 0);
      setCurrentPage(page);
      setHasNext(!!response.next);
      setHasPrevious(!!response.previous);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al cargar lenders";
      setError(errorMessage);
      console.error("Error fetching lenders:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    fetchLenders(currentPage);
  }, [fetchLenders, currentPage]);

  const goToPage = useCallback((page: number) => {
    fetchLenders(page);
  }, [fetchLenders]);

  const nextPage = useCallback(() => {
    if (hasNext) {
      fetchLenders(currentPage + 1);
    }
  }, [fetchLenders, currentPage, hasNext]);

  const previousPage = useCallback(() => {
    if (hasPrevious) {
      fetchLenders(currentPage - 1);
    }
  }, [fetchLenders, currentPage, hasPrevious]);

  useEffect(() => {
    fetchLenders(1);
  }, [fetchLenders]);

  return {
    lenders,
    loading,
    error,
    totalCount,
    currentPage,
    hasNext,
    hasPrevious,
    refetch,
    goToPage,
    nextPage,
    previousPage,
  };
};

export default useGetLenders;