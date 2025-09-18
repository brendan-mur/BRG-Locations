import { useEffect, useState } from "react";
import axios from "axios";

export interface Location {
  key: number;
  number: string;
  name: string;
  phone: string;
  latitude: string;
  longitude: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  construction: boolean;
  open: boolean;
}

export function useLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/locations')
      .then(response => {
        setLocations(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return { locations, loading, error };
}