import apiService from "../../../../shared/modules/instances/AxiosInstance";
import type { Hardware } from "../../model/Hardware";

export const getHardware = async (): Promise<Hardware[]> => {
  const response = await apiService.get<Hardware[]>("inventory/hardware/");
  return response;
};

export const getHardwareByType = async (type: string): Promise<Hardware[]> => {
  const response = await apiService.get<Hardware[]>(`inventory/hardware/?hardware_type=${encodeURIComponent(type)}`);
  return response;
};

export default {
  getAll: getHardware,
  getByType: getHardwareByType,
};
