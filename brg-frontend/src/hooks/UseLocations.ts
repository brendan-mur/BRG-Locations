import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Store } from "../types/Store";

export function useLocations() {
  const [locations, setLocations] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchLocations = useCallback(() => {
    setLoading(true);
    axios.get("http://localhost:8000/api/locations")
      .then(res => {
        setLocations(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  return { locations, loading, error, fetchLocations };
}