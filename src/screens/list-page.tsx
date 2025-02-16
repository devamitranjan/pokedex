import React from 'react';
import { createUseStyles } from 'react-jss';
import { PokemonList } from '../features/pokemon/components/pokemon-list';

export const ListPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PokemonList />
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      height: '100%',
    },
  },
  { name: 'ListPage' }
);
