import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const sendRequest = useCallback(async (request, applyData) => {
    setIsLoading(true);
    setHttpError(null);
    try {
      const response = await fetch(request.url, {
        method: request.method ? request.method : "GET",
        headers: request.headers ? request.headers : {},
        body: request.body ? JSON.stringify(request.body) : null,
      });
      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      applyData(data);
    } catch (error) {
      setHttpError(error.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    httpError,
    sendRequest,
  };
};

export default useHttp;
