import { createUseStyles } from 'react-jss';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  classes?: Record<string, string>;
}

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  },
  pageButton: {
    padding: '10px 20px',
    margin: '0 10px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    backgroundColor: 'blue',
    color: 'white',
    cursor: 'pointer',
    '&:disabled': {
      cursor: 'not-allowed',
      opacity: 0.5,
    },
  },
  pageInfo: {
    fontSize: '16px',
  },
});

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  itemsPerPage,
  totalItems,
  onPageChange,
  classes = {},
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const defaultClasses = useStyles();
  const styles = { ...defaultClasses, ...classes };

  return (
    <div className={styles.root}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1 || totalItems === 0}
        className={styles.pageButton}
      >
        Previous
      </button>
      <span className={styles.pageInfo}>
        Page {totalItems === 0 ? 0 : currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages || totalItems === 0}
        className={styles.pageButton}
      >
        Next
      </button>
    </div>
  );
};
