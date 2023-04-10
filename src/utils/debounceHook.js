import { useState, useEffect } from "react";

export const debounce = (callback, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
};
/*
debouncedSearch = debounce(text => this.onSearchClick(text), 500)

<Elem onChange={debouncedSearch} />
*/

export const useDebounce = (value, milliSeconds) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, milliSeconds);

    return () => {
      clearTimeout(handler);
    };
  }, [value, milliSeconds]);

  return debouncedValue;
};

/*
usage with function debounce
const debouncedFn = useDebounce(() => {
  // do something
}, 1000);

const [v, setValue] = useState('');
const handleChange = useDebounce(() => (v) => setValue(v), 500);
*/
