export type Pokemon = {
  id: string;
  name: string;
  number: string;
  types: string[];
  image: string;
};

export type PokemonOption = {
  value: Pokemon['id'];
  label: Pokemon['name'];
};
