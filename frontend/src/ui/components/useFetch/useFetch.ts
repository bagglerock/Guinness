import { useEffect, useState } from 'react';

export const useFetch = <T extends {}>(fetchFunc: () => Promise<T>, dependencies: any[]) => {
  const [result, setResult] = useState<T>();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    fetchFunc()
      .then(res => setResult(res))
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return {
    result,
    error,
    isLoading,
  };
};
