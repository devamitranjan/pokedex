import { createUseStyles } from 'react-jss';

interface SearchBarProps<T> {
  placeholder: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classes?: Record<string, string>;
}

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  searchInput: {
    width: '50%',
    padding: '10px',
    margin: '20px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    fontSize: '16px',
    color: 'black',
    marginInline: 'auto',
    '@media (max-width: 600px)': {
      width: '100%',
    },
  },
});

export const SearchBar: React.FC<SearchBarProps<any>> = ({
  placeholder,
  value,
  onChange,
  classes,
}) => {
  const defaultClasses = useStyles();
  const styles = { ...defaultClasses, classes };

  return (
    <div className={styles.root}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.searchInput}
      />
    </div>
  );
};
