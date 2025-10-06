import apiService from "../../../shared/modules/instances/AxiosInstance";
import type { Lender, LendersPaginatedData } from "../model/Lender";

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// Función para obtener lenders con paginación
export const getLenders = async (page: number = 1): Promise<LendersPaginatedData> => {
  const response = await apiService.get<PaginatedResponse<Lender>>(
    `users/lenders/?page=${page}`
  );
  
  return {
    results: response.results,
    count: response.count,
    next: response.next,
    previous: response.previous,
  };
};

// Función para obtener un lender específico por ID
export const getLenderById = async (id: string): Promise<Lender> => {
  const response = await apiService.get<Lender>(`users/lenders/${id}`);
  return response;
};