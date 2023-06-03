import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function Forms() {
  const { select,
    handleInput,
    input,
    handleChange,
    handleFilter,
    setFilterPlanets,
    setSelect,
  } = useContext(Context);

  const options = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  const [filter, setFilter] = useState([]); // estado que armazena os filtros realizados
  const [optionsInput, setOptions] = useState(options); // estado que armazena as opções de filtro

  const handleFIlterClick = () => {
    const { column, comparison, value } = select;
    const newFilter = [...filter, { column, comparison, value }];
    setFilter(newFilter);
    handleFilter();
    console.log(optionsInput);
    const optionCurrents = optionsInput
      .filter((v) => v !== select.column);
    console.log(select.column);
    setOptions(optionCurrents);
    setSelect({
      ...optionsInput,
      column: optionCurrents[0],
    });
  };

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
        { optionsInput.map((option) => (
          <option key={ option } value={ option }>{ option }</option>
        ))}
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
        onClick={ handleFIlterClick }
      >
        Filtrar
      </button>
      <button
        data-testid="button-remove-filters"
      >
        Remover todos os filtros
      </button>
      <div>
        {filter.map((f, index) => (
          <div key={ index }>
            <span>
              {f.column}
              {f.comparison}
              {f.value}
            </span>
            <button
              data-testid="filter"
              onClick={ () => {
                const cloneArray = [...filter];
                console.log(cloneArray);
                cloneArray.splice(index, 1);
                setFilterPlanets(cloneArray);
              } }
            >
              𝙭
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forms;
