import { useState, useEffect, useCallback } from 'react';
import apiClient from '../api/AxiosConfig';
import { Store } from '../types/Store';

export const useLocations = () => {
  const [locations, setLocations] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLocations = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/api/locations');
      setLocations(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch locations.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  return { locations, loading, error, fetchLocations };
};
