import axios from "axios";
import { Store } from "../types/Store";

export function useStoreActions() {
  const saveStore = async (formData: Store, isUpdate: boolean) => {
    if (isUpdate) {
      return axios.put(
        `http://localhost:8000/api/locations/${formData.number}`,
        formData
      );
    } else {
      return axios.post("http://localhost:8000/api/locations", formData);
    }
  };

  const deleteStore = async (storeNumber: string) => {
    return axios.delete(`http://localhost:8000/api/locations/${storeNumber}`);
  };

  return { saveStore, deleteStore };
}