import { createContext } from 'react';

const INICIAL_STATE = {
  planets: [],
  input: '',
};

const Context = createContext(INICIAL_STATE); // aqui dentro e possivel deixar um inicialState, para evitar retorno de valores como undefined

export default Context;
