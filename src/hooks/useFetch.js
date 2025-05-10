import { useEffect, useReducer } from "react";

// Define action types
const FETCH_INIT = "FETCH_INIT";
const FETCH_SUCCESS = "FETCH_SUCCESS";
const FETCH_FAILURE = "FETCH_FAILURE";

// Reducer function to handle state
const fetchReducer = (state, action) => {
  switch (action.type) {
    case FETCH_INIT:
      return { ...state, loading: true, error: null };
    case FETCH_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const useFetch = (url, options) => {
  const [state, dispatch] = useReducer(fetchReducer, {
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      dispatch({ type: FETCH_INIT });

      try {
        const response = await fetch(url, { ...options, signal });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        dispatch({ type: FETCH_SUCCESS, payload: result });
      } catch (err) {
        if (err.name !== "AbortError") {
          dispatch({ type: FETCH_FAILURE, payload: err.message });
        }
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url, JSON.stringify(options)]);

  return state; // { data, loading, error }
};
