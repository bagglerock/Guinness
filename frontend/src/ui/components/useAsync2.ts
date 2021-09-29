import { useCallback, useLayoutEffect, useReducer, useRef } from 'react';

export function useSafeDispatch(dispatch: any) {
  const mounted = useRef(false);
  useLayoutEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);
  return useCallback((...args) => (mounted.current ? dispatch(...args) : void 0), [dispatch]);
}

const defaultInitialState = { status: 'idle', data: null, error: null };
export function useAsync(initialState: any) {
  const initialStateRef = useRef({
    ...defaultInitialState,
    ...initialState,
  });
  const [{ status, data, error }, setState] = useReducer((state: any, action: any) => ({ ...state, ...action }), initialStateRef.current);

  const safeSetState = useSafeDispatch(setState);

  const run = useCallback(
    promise => {
      if (!promise || !promise.then) {
        throw new Error(
          `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`
        );
      }
      safeSetState({ status: 'pending' });
      return promise.then(
        (data: any) => {
          safeSetState({ data, status: 'resolved' });
          return data;
        },
        (error: any) => {
          safeSetState({ status: 'rejected', error });
          return error;
        }
      );
    },
    [safeSetState]
  );

  const setData = useCallback(data => safeSetState({ data }), [safeSetState]);
  const setError = useCallback(error => safeSetState({ error }), [safeSetState]);
  const reset = useCallback(() => safeSetState(initialStateRef.current), [safeSetState]);

  return {
    // using the same names that react-query uses for convenience
    isIdle: status === 'idle',
    isLoading: status === 'pending',
    isError: status === 'rejected',
    isSuccess: status === 'resolved',

    setData,
    setError,
    error,
    status,
    data,
    run,
    reset,
  };
}
