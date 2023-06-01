import { useEffect, useMemo, useState } from "react";

interface FetchDataResult<T> {
  fetchedData: T | null;
  loading: boolean;
  error: Error | null;
  refetchData: () => void;
}

// const baseURL = new URL(import.meta.env.BACK_END_BASE_URL);
const baseURL = import.meta.env.BACK_END_BASE_URL;

const useFetchData = <T>(inputUrl: string): FetchDataResult<T> => {
  const [fetchedData, setFetchedData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const url = useMemo(() => new URL(baseURL + inputUrl), [inputUrl]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, { method: "GET", credentials: "include" });
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
    fetch(url, { method: "GET", credentials: "include" })
      .then((response) => response.json())
      .then((responseData) => {
        setFetchedData(responseData as T);
      });
  };

  return { fetchedData, loading, error, refetchData };
};

export default useFetchData;
