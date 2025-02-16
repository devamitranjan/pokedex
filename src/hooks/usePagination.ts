import { useState } from 'react';

export const usePagination = <T>(itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (data: T[]) =>
    data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return {
    currentPage,
    setCurrentPage,
    paginate,
    itemsPerPage,
  };
};
