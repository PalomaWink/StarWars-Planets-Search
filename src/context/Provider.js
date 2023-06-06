import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Context from './Context';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]); // Pirmeiro estado que nao sera alterado apos o fetch
  const [input, setInput] = useState('');
  const [select, setSelect] = useState({ // estado para os selects e o input
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });
  const [filterPlanets, setFilterPlanets] = useState([]); // segundo estado que sera alterado apos o fetch

  useEffect(() => {
    const fetchPlanets = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const dataApi = await response.json();
      const filterResidents = dataApi.results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setPlanets(filterResidents);
      setFilterPlanets(filterResidents);
    };
    fetchPlanets();
  }, []);

  const handleInput = ({ target }) => {
    const { value } = target;
    setInput(value);
  };

  // HandleChange para os selects e para o input
  const handleChange = (name, value) => {
    setSelect({ ...select, [name]: value });
  };

  // HandleFilter para filtrar o comparisson
  const handleFilter = () => {
    const { column, comparison, value } = select;
    const filter = filterPlanets.filter((planet) => {
      if (comparison === 'maior que') {
        return Number(planet[column]) > Number(value);
      }
      if (comparison === 'menor que') {
        return Number(planet[column]) < Number(value);
      }
      if (comparison === 'igual a') {
        return Number(planet[column]) === Number(value);
      }
      return filterPlanets;
    });
    setFilterPlanets(filter);
  };

  const context = {
    planets,
    handleInput,
    input,
    handleChange,
    handleFilter,
    filterPlanets,
    select,
    setFilterPlanets,
    setSelect,
  };

  return (
    <Context.Provider value={ context }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
