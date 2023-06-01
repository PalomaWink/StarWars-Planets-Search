import React, { useContext } from 'react';
import Context from '../context/Context';

function Forms() {
  const { handleInput, input, handleChange, handleFilter } = useContext(Context);

  // o que eu quero filtrar:
  // meu primeiro select define o campo da informação
  // meu segundo select define se é maior, menor ou igual
  // meu terceiro campo e um valor que eu digito e vai definir os outros filtros
  // Criar dois estados, o primeiro vai ser o original(esse eu nunca mudo depois do fetch) useEffect (toda a vida que eu filtro eu recomeco)
  // criar o segundo estado como uma copia do original e fazer um filter nele

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
        <option value="maior_que">maior que</option>
        <option value="menor_que">menor que</option>
        <option value="igual_a">igual a</option>
      </select>
      <input
        type="number"
        name="value"
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
