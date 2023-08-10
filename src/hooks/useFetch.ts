import { useEffect, useState } from "react";

/**
 * 임시 fetch 구현
 * @param fetcher api
 */
export function useFetch<T>(fetcher: () => Promise<T>) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      try {
        const data = await fetcher();
        setData(data);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { isLoading: isLoading || !data, data, error };
}
