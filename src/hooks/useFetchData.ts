import { useEffect, useState } from "react";

interface FetchDataResult<T> {
  fetchedData: T | null;
  loading: boolean;
  error: Error | null;
  refetchData: () => void;
}

const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

const useFetchData = <T>(url: string): FetchDataResult<T> => {
  const [fetchedData, setFetchedData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseURL + url, { method: "GET", credentials: "include" });
        const responseData = await response.json();
        setFetchedData(responseData);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  const refetchData = () => {
    fetch(baseURL + url, { method: "GET", credentials: "include" })
      .then((response) => response.json())
      .then((responseData) => {
        // console.log(responseData);
        setFetchedData(responseData as T);
      });
  };

  return { fetchedData, loading, error, refetchData };
};

export default useFetchData;
