import { useEffect, useState } from "react";

const useApi = (handler) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    handler()
      .then((data) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [handler]);

  return { data, loading, error };
};

export default useApi;
