import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function Forms() {
  const { planets, handleInput, input } = useContext(Context);
  console.log(planets);

  const [select, setSelect] = useState('population');
  const [selectComparison, setSelectComparison] = useState('maior_que');
  const [inputNumber, setinput] = useState('0');

  const handleSelectColumn = ({ target }) => {
    const { value } = target;
    setSelect(value);
  };

  const handleSelectComparison = ({ target }) => {
    const { value } = target;
    setSelectComparison(value);
  };

  const handleFilterNumber = ({ target }) => {
    const { value } = target;
    setinput(value);
  };

  const handleFilter = () => {
    // o que eu quero filtrar:
    // meu primeiro select define o campo da informação
    // meu segundo select define se é maior, menor ou igual
    // meu terceiro campo e um valor que eu digito e vai definir os outros filtros
    // preciso fazer um novo useEvent para atualizar a pagina?
    // Criar dois estados, o primeiro vai ser o original(esse eu nunca mudo depois do fetch) useEffect (toda a vida que eu filtro eu recomeco)
    // criar o segundo estado como uma copia do original e fazer um filter nele
    planets.filter((infos) => infos[select] === inputNumber);
    switch (selectComparison) {
    case 'maior_que':
      return planets.filter((infos) => infos[select] > Number(inputNumber));
    case 'menor_que':
      return planets.filter((infos) => infos[select] < Number(inputNumber));
    case 'igual_a':
      return planets.filter((infos) => infos[select] === Number(inputNumber));
    default:
      break;
    }
  };
  console.log(handleFilter());

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
        value={ select }
        onChange={ handleSelectColumn }
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
        value={ selectComparison }
        onChange={ handleSelectComparison }
      >
        <option value="maior_que">maior que</option>
        <option value="menor_que">menor que</option>
        <option value="igual_a">igual a</option>
      </select>
      <input
        type="number"
        name="value"
        value={ inputNumber }
        data-testid="value-filter"
        onChange={ handleFilterNumber }
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
