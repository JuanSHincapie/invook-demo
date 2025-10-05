import apiService from "../../../../shared/modules/instances/AxiosInstance";
import type { Supply } from "../../model/Supply";

export const getSupplies = async (): Promise<Supply[]> => {
  try {
    const response = await apiService.get<Supply[]>("inventory/supply/");
    return response;
  } catch (error) {
    console.error("Error al obtener suministros:", error);
    throw error;
  }
};

export const searchSupplies = async (searchTerm: string): Promise<Supply[]> => {
  if (!searchTerm.trim()) {
    return getSupplies();
  }

  try {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const response = await apiService.get<Supply[]>(
      `inventory/supply/?search=${encodeURIComponent(lowerCaseSearchTerm)}`
    );
    return response;
  } catch (error) {
    console.error("Error al buscar suministros:", error);
    throw error;
  }
};

export const getSuppliesByAccount = async (cuenta: string): Promise<Supply[]> => {
  try {
    const response = await apiService.get<Supply[]>(
      `inventory/supply/?cuenta=${encodeURIComponent(cuenta)}`
    );
    return response;
  } catch (error) {
    console.error("Error al obtener suministros por cuenta:", error);
    throw error;
  }
};

export const getLowStockSupplies = async (minExistencia: number = 10): Promise<Supply[]> => {
  try {
    const response = await apiService.get<Supply[]>(
      `inventory/supply/?low_stock=${minExistencia}`
    );
    return response;
  } catch (error) {
    console.error("Error al obtener suministros con existencia baja:", error);
    throw error;
  }
};

export default {
  getAll: getSupplies,
  search: searchSupplies,
  getByAccount: getSuppliesByAccount,
  getLowStock: getLowStockSupplies,
};