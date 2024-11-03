import { useEffect, useState } from 'react';

import { fetchDataFromApi } from '../utils/api';

const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);

    fetchDataFromApi(url)
      .then((res) => {
        setLoading(false);
        // console.log('res from useFetch', res);
        setData(res);
      })
      .catch((err) => {
        setLoading(false);
        setError('Something went wrong');
      });
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
