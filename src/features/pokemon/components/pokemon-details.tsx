import React from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from '@material-ui/core';

import { GET_POKEMON_DETAILS } from '../gql';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  root: {
    border: '1px solid #ddd',
  },
  dialog: {
    minWidth: '400px',
  },
  dialogTitle: {
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    '& h2': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
    },
  },
  dialogContent: {
    padding: '20px',
    backgroundColor: 'black',
  },
  dialogActions: {
    justifyContent: 'center',
    padding: '10px',
    backgroundColor: 'black',
  },
  image: {
    width: '50px',
    height: '50px',
    marginRight: '10px',
    borderRadius: '50%',
    padding: '10px',
  },
});

export const PokemonDetails: React.FC<{}> = () => {
  const { id, name } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_POKEMON_DETAILS, {
    variables: { id, name },
  });
  const onClose = () => {
    navigate('/pokemon');
  };

  if (loading || error) {
    return (
      <Dialog open onClose={onClose} classes={{ paper: classes.dialog }}>
        <DialogTitle className={classes.dialogTitle}>
          {loading ? <CircularProgress /> : 'Error'}
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {loading ? (
            <CircularProgress />
          ) : (
            <p>Unable to fetch the {name} details</p>
          )}
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }

  const pokemon = data.pokemon;

  return (
    <Dialog open onClose={onClose} classes={{ paper: classes.dialog }}>
      <DialogTitle className={classes.dialogTitle}>
        <img src={pokemon.image} alt={pokemon.name} className={classes.image} />
        {pokemon.name}
        <IconButton onClick={onClose}>X</IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <p>Number: {pokemon.number}</p>
        <p>Classification: {pokemon.classification}</p>
        <p>Types: {pokemon.types.join(', ')}</p>
        <p>Resistant: {pokemon.resistant.join(', ')}</p>
        <p>Weaknesses: {pokemon.weaknesses.join(', ')}</p>
        <p>
          Weight: {pokemon.weight.minimum} - {pokemon.weight.maximum}
        </p>
        <p>
          Height: {pokemon.height.minimum} - {pokemon.height.maximum}
        </p>
        <p>Flee Rate: {pokemon.fleeRate}</p>
        <p>Max CP: {pokemon.maxCP}</p>
        <p>Max HP: {pokemon.maxHP}</p>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
