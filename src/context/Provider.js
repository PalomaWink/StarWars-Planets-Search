import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Context from './Context';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const dataApi = await response.json();
      const filterResidents = dataApi.results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setPlanets(filterResidents);
    };
    fetchPlanets();
  }, []);

  const context = {
    planets,
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
