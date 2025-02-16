import { useState, useEffect, useMemo } from 'react';

export const useDebounceSearch = <T>(
  data: T[],
  delay: number,
  filterFunction: (item: T, search: string) => boolean
) => {
  const [search, setSearch] = useState<string>('');
  const [debouncedValue, setDebouncedValue] = useState(search);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(search);
    }, delay);

    return () => clearTimeout(handler);
  }, [search, delay]);

  const filteredData = useMemo(() => {
    if (!debouncedValue) return data;
    return data.filter((item) => filterFunction(item, debouncedValue));
  }, [debouncedValue, data, filterFunction]);

  return { search, debouncedValue, handleSearch, filteredData };
};
