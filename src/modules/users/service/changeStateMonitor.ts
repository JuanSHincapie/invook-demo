import apiService from "../../../shared/modules/instances/AxiosInstance";
import type { Monitor } from "../model/Monitor";

export const changeMonitorState = async (id: number): Promise<Monitor> => {
  // POST con body vacío, solo ID en la URL - el backend controla el cambio de estado
  const response = await apiService.post<Monitor>(`users/admins/state/${id}`, {});
  return response;
};

export const deactivateMonitor = async (id: number): Promise<Monitor> => {
  return changeMonitorState(id);
};

export const activateMonitor = async (id: number): Promise<Monitor> => {
  return changeMonitorState(id);
};

export const suspendMonitor = async (id: number): Promise<Monitor> => {
  return changeMonitorState(id);
};

export default {
  changeState: changeMonitorState,
  deactivate: deactivateMonitor,
  activate: activateMonitor,
  suspend: suspendMonitor,
};