import { useNavigate } from 'react-router-dom';
import { Pokemon } from '../pokemon.types';
import { createUseStyles } from 'react-jss';

interface PokemonItemProps {
  pokemon: Pokemon;
}

const useStyles = createUseStyles({
  listItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    border: '1px solid #ddd',
    marginBottom: '10px',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#f9f9f9',
      '& h3': {
        color: 'black',
      },
    },
  },
  image: {
    width: '50px',
    height: '50px',
    marginRight: '10px',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  types: {
    display: 'flex',
    gap: '5px',
  },
  type: {
    padding: '2px 5px',
    borderRadius: '3px',
    backgroundColor: 'blue',
  },
  heading: {
    color: 'white',
    transition: 'color 0.3s',
  },
});

export const PokemonItem: React.FC<PokemonItemProps> = ({ pokemon }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const handleClick = () => {
    navigate(`/pokemon/${pokemon.id}/${pokemon.name}`);
  };

  return (
    <div
      key={pokemon.id}
      className={classes.listItem}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <img src={pokemon.image} alt={pokemon.name} className={classes.image} />
      <div className={classes.details}>
        <h3>
          {pokemon.name} (#{pokemon.number})
        </h3>
        <div className={classes.types}>
          {pokemon.types.map((type) => (
            <span key={type} className={classes.type}>
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
