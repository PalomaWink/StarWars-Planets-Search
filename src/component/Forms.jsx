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
    planets,
  } = useContext(Context);

  const options = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  const [filtered, setFilter] = useState([]); // estado que armazena os filtros realizados
  const [optionsInput, setOptions] = useState(options); // estado que armazena as opções de filtro

  const handleFIlterClick = () => {
    const { column, comparison, value } = select;
    const newFilter = [...filtered, { column, comparison, value }];
    setFilter(newFilter);
    handleFilter();
    const optionCurrents = optionsInput
      .filter((v) => v !== select.column);
    setOptions(optionCurrents);
    setSelect({
      ...optionsInput,
      column: optionCurrents[0],
    });
  };

  const removeAllFilters = () => {
    setFilterPlanets(planets);
    setFilter([]);
  };

  const deleteFilter = (columns) => {
    const filters = filtered.filter((f) => f.column !== columns.column);
    if (!optionsInput.includes(columns.column)) {
      setOptions([...optionsInput, columns.column]);
    }
    if (filters.length === 0) {
      setFilterPlanets([...planets]);
      setFilter([]);
    }
    const filter = planets.filter((planet) => filters.every((f) => {
      const { column, comparison, value } = f;
      if (comparison === 'maior que') {
        return Number(planet[column]) > Number(value);
      }
      if (comparison === 'menor que') {
        return Number(planet[column]) < Number(value);
      }
      return Number(planet[column]) === Number(value);
    }));
    setFilterPlanets(filter);
    setFilter(filters);
    /*  setFilter({
      ...filtered,
      column: filters,
    }); */
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
        onClick={ removeAllFilters }
      >
        Remover todos os filtros
      </button>
      <div>
        {filtered.length > 0 && filtered.map((f, index) => (
          <div key={ index } data-testid="filter">
            <span>
              {f.column}
              {f.comparison}
              {f.value}
            </span>
            <button
              onClick={ () => {
                deleteFilter(f);
              } }
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forms;
