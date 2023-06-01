import React, { useContext } from 'react';
import Context from '../context/Context';

function Forms() {
  const { select, handleInput, input, handleChange, handleFilter } = useContext(Context);

  return (
    <div>
      <h1>Projeto Star Wars - Trybe </h1>
      <input
        type="text"
        name="name"
        data-testid="name-filter"
        value={ input }
        placeholder="Digite o nome do planeta"
        onChange={ handleInput }
      />
      <select
        data-testid="column-filter"
        name="column"
        onChange={ ({ target: { name, value } }) => handleChange(name, value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ ({ target: { name, value } }) => handleChange(name, value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        name="value"
        value={ select.value }
        data-testid="value-filter"
        onChange={ ({ target: { name, value } }) => handleChange(name, value) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleFilter }
      >
        Filtrar
      </button>
    </div>
  );
}

export default Forms;
