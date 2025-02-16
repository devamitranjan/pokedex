import { useCallback, useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import clsx from 'clsx';
import { createUseStyles } from 'react-jss';

import { PokemonItem } from './pokemon-item';
import { useGetPokemons } from '../pokemon.hooks';
import { Pokemon } from '../pokemon.types';
import { useDebounceSearch } from '../../../hooks/useDebounceSearch';
import { usePagination } from '../../../hooks/usePagination';
import { Pagination, SearchBar } from '../../../components';

const useStyles = createUseStyles({
  root: {
    padding: '20px',
  },
  listContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
    '@media (max-width: 600px)': {
      gridTemplateColumns: '1fr',
    },
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons: pokemonList, loading } = useGetPokemons();
  const filterFunction = (pokemon: Pokemon, search: string) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase());

  const {
    search,
    handleSearch,
    filteredData: pokemons,
  } = useDebounceSearch(pokemonList, 300, filterFunction);

  const { currentPage, itemsPerPage, setCurrentPage, paginate } =
    usePagination<Pokemon>();

  const paginatedPokemons = useMemo(
    () => paginate(pokemons),
    [pokemons, paginate]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleSearch(e);
      setCurrentPage(1);
    },
    [handleSearch, setCurrentPage]
  );

  return (
    <div className={classes.root}>
      <SearchBar
        placeholder="Search the pokemons..."
        value={search}
        onChange={handleSearchChange}
      />

      <div
        className={clsx(
          loading ? classes.loadingContainer : classes.listContainer
        )}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          paginatedPokemons.map((pokemon) => (
            <PokemonItem key={pokemon.id} pokemon={pokemon} />
          ))
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalItems={pokemons.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      <Outlet />
    </div>
  );
};
