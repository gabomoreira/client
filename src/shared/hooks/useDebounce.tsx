import { useCallback, useRef } from 'react';

export const useDebounce = (isDelayInFirstTime = true, delay = 500) => {
  const debouncing = useRef<NodeJS.Timeout>();
  const firstTime = useRef(isDelayInFirstTime);

  const debounce = useCallback(
    (func: () => void) => {
      if (firstTime.current) {
        firstTime.current = false;
        func();
      } else {
        if (debouncing.current) {
          clearTimeout(debouncing.current);
        }

        debouncing.current = setTimeout(() => func(), delay);
      }
    },
    [delay]
  );

  return { debounce };
};
