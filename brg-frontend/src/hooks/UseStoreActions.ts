import apiClient from '../api/AxiosConfig';
import { Store } from '../types/Store';

export const useStoreActions = () => {
  const saveStore = async (storeData: Store, isUpdate: boolean) => {
    if (isUpdate) {
      return await apiClient.put(
        `/api/locations/${storeData.number}`,
        storeData
      );
    } else {
      return await apiClient.post('/api/locations', storeData);
    }
  };

  const deleteStore = async (storeNumber: string) => {
    return await apiClient.delete(`/api/locations/${storeNumber}`);
  };

  return { saveStore, deleteStore };
};
