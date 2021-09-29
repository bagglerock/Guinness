import { useEffect } from 'react';
import { useAsync } from 'ui/components/useAsync2';

export const Test: React.FC = () => {
  const { setData, setError, error, status, data, run } = useAsync({});

  useEffect(() => {
    run(fetch('https://official-joke-api.appspot.com/random_joke'));
  }, []);

  console.log(data);

  return (
    <>
      <p>test useAsync()</p>
      {/* <pre>{data}</pre> */}
    </>
  );
};
