import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Context from './Context';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]); // Pirmeiro estado que nao sera alterado apos o fetch
  const [input, setInput] = useState('');
  const [select, setSelect] = useState({
    column: 'population',
    comparison: 'maior_que',
    value: 0,
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
  // Criar dois estados, o primeiro vai ser o original(esse eu nunca mudo depois do fetch) useEffect (toda a vida que eu filtro eu recomeco)
  // criar o segundo estado como uma copia do original e fazer um filter nele

  const handleChange = (name, value) => {
    setSelect({ ...select, [name]: value });
  };

  const handleFilter = () => {
    // Preciso retornar alguma coisa daqui e alterar meu estado setFilterPlanets (foreach e switch).
    const resultFilter = filterPlanets.filter((infos) => {
      console.log(infos);
      switch (select.comparison) {
      case infos.comparison === 'maior_que':
        return conditions
          .filter((planet) => Number(planet[select]) > Number(select.value));
      case infos.comparison === 'menor_que':
        return conditions
          .filter((planet) => Number(planet[select]) < Number(select.value));
      case infos.comparison === 'igual_a':
        return conditions
          .filter((planet) => Number(planet[select]) === Number(select.value));
      default:
        return true;
      }
    });
    setFilterPlanets(resultFilter);
  };

  const context = {
    planets,
    handleInput,
    input,
    handleChange,
    handleFilter,
    filterPlanets,
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
