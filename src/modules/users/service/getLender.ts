import apiService from "../../../shared/modules/instances/AxiosInstance";
import type { Lender } from "../model/Lender";

// Función para obtener todos los lenders (la API devuelve un array directo)
export const getLenders = async (): Promise<Lender[]> => {
  const response = await apiService.get<Lender[]>(`users/lenders/`);
  return response;
};

// Función para obtener un lender específico por ID
export const getLenderById = async (id: string): Promise<Lender> => {
  const response = await apiService.get<Lender>(`users/lenders/${id}`);
  return response;
};