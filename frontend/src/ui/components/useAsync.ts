export const nothing = () => null;
// import { useCallback, useLayoutEffect, useReducer, useRef } from 'react';

// function useSafeDispatch(dispatch: any) {
//   const isMounted = useRef(false);

//   useLayoutEffect(() => {
//     isMounted.current = true;

//     return () => {
//       isMounted.current = false;
//     };
//   }, []);

//   return useCallback((...args) => (isMounted.current ? dispatch(...args) : void 0), [dispatch]);
// }

// function asyncReducer(state: any, action: any) {
//   switch (action.status) {
//     case 'pending': {
//       return { status: 'pending', data: null, error: null };
//     }
//     case 'resolved': {
//       return { status: 'resolved', data: state.data, error: null };
//     }
//     case 'rejected': {
//       return { status: 'rejected', data: null, error: state.error };
//     }
//     default: {
//       throw new Error('Unhandled action type');
//     }
//   }
// }

// export function useAsync(initialState: any) {
//   const [state, unsafeDispatch] = useReducer(asyncReducer, {
//     status: 'idle',
//     data: null,
//     error: null,
//     ...initialState,
//   });

//   const safeSetState = useSafeDispatch(unsafeDispatch);

//   const { status, data, error } = state;

//   const run = useCallback(
//     promise => {
//       safeSetState({ status: 'pending' });

//       promise.then(
//         (data: any) => {
//           safeSetState({ data, status: 'resolved' });
//         },
//         (error: any) => {
//           safeSetState({ error, status: 'rejected' });
//         }
//       );
//     },
//     [safeSetState]
//   );

//   const setData = useCallback(data => safeSetState({ data }), [safeSetState]);

//   const setError = useCallback(data => safeSetState({ data }), [safeSetState]);

//   return {
//     isIdle: status === 'pending',
//     isSuccess: status === 'resolved',
//     isLoading: status === 'pending',
//     isError: status === 'rejected',
//     setData,
//     setError,
//     error,
//     status,
//     data,
//     run,
//   };
// }

// //usage:

// // const { whatever, run } = useAsync(initialState);

// // run(fetchFunc());
