import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';


beforeEach(() => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(testData)
    }));
});

afterEach(jest.restoreAllMocks);

describe('Teste se aparece todas as informações na tela', () => {
  it('Verifica se a página contém um heading h1 com o texto "Projeto Star Wars - Trybe"', () => {
    render(<App />);
    const heading = screen.getByRole('heading', {
      level: 1,
      name: /Projeto Star Wars - Trybe/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('Realize uma requisição para a API', async () => {
    await act(async () => {
      render(<App />);
    });
    expect(global.fetch).toHaveBeenCalled();
  });

  it('Verifica se a pagina contem um select com todas as opcoes de filtro', () => {
    render(<App />);
    const select = screen.getByTestId('column-filter')
    expect(select).toHaveLength(5);

    const selectComparison = screen.getByTestId('comparison-filter')
    expect(selectComparison).toHaveLength(3);
  });

  it('Filtre os planetas que possuem a letra "o" no nome', async () => {
    await act(async () => {
      render(<App />);
    });

    const input = await screen.findByTestId('name-filter');
    userEvent.type(input, 'o');
    expect(await screen.findAllByRole('row')).toHaveLength(8);
    const planetNames = ['Coruscant', 'Dagobah', 'Endor', 'Hoth', 'Kamino', 'Naboo', 'Tatooine'];
    for (let planetName of planetNames) {
      expect(await screen.findByText(planetName)).toBeInTheDocument();
    }
  });

  it('Verifica se os filtros estão funcionando corretamente', async () => {
    render(<App />);
    const select = await screen.findAllByTestId('column-filter');
    const selectComparison = await screen.findAllByTestId('comparison-filter');
    const input = await screen.findByTestId('value-filter');
    const button = await screen.findByTestId('button-filter')

    userEvent.selectOptions(select[0], 'population');
    userEvent.selectOptions(selectComparison[0], 'maior que');
    userEvent.type(input, '1000000');
    userEvent.click(button);
    screen.debug();

    expect(await screen.findAllByRole('row')).toHaveLength(7);

    await waitFor(() => {
      userEvent.selectOptions(select[0], 'orbital_period');
      userEvent.selectOptions(selectComparison[0], 'menor que');
      userEvent.clear(input);
      userEvent.type(input, '400');
      userEvent.click(button);
    });

    expect(await screen.findAllByRole('row')).toHaveLength(4);

  });

  it('Verifica se o filtro é aplicado apenas usando o botao de filtrar', async () => {
    await act(async () => {
      render(<App />);
    });

    userEvent.click(await screen.findByTestId('button-filter'));

    expect(await screen.findAllByRole('row')).toHaveLength(9);
  });

  it('Verifica se o filtro de menor que funciona corretamente', async () => {
    render(<App />);
    const select = await screen.findAllByTestId('column-filter');
    const selectComparison = await screen.findAllByTestId('comparison-filter');
    const input = await screen.findByTestId('value-filter');
    const button = await screen.findByTestId('button-filter')

    userEvent.selectOptions(select[0], 'surface_water');
    userEvent.selectOptions(selectComparison[0], 'menor que');
    userEvent.type(input, '40');
    userEvent.click(button);

    expect(await screen.findAllByRole('row')).toHaveLength(7);
  });

  it('Verifica se o filtro de igual a que funciona corretamente', async () => {
    render(<App />);
    const select = await screen.findAllByTestId('column-filter');
    const selectComparison = await screen.findAllByTestId('comparison-filter');
    const input = await screen.findByTestId('value-filter');
    const button = await screen.findByTestId('button-filter')

    userEvent.selectOptions(select[0], 'rotation_period');
    userEvent.selectOptions(selectComparison[0], 'igual a');
    userEvent.type(input, '23');
    userEvent.click(button);

    expect(await screen.findAllByRole('row')).toHaveLength(4);
  });

  it('Verifica se o botao de remover todos os filtros esta funcionando', async () => {
    render(<App />);
    const buttonRemoveAllFilters = screen.getByTestId('button-remove-filters');
    const buttonFilter = await screen.findByTestId('button-filter');

    userEvent.click(buttonFilter);
    userEvent.click(buttonFilter);
    userEvent.click(buttonFilter);
    
    expect(screen.getAllByTestId('filter')).toHaveLength(3);

    userEvent.click(buttonRemoveAllFilters);
    expect(screen.queryAllByTestId('filter')).toHaveLength(0);
  });

  it('Verifica se o botao de remover filtro esta funcionando', async () => {
    render(<App />);
    const select = await screen.findAllByTestId('column-filter');
    const button = await screen.findByTestId('button-filter')

    userEvent.selectOptions(select[0], 'rotation_period');
    userEvent.click(button);

    const teste = screen.queryByText('rotation_period');
    expect(teste).toBeNull();

    const buttonX = await screen.findByRole('button', { name: /deletar/i });
    userEvent.click(buttonX);
    expect(buttonX).not.toBeInTheDocument();
  });
  it('Testando as linhas 50 a 60', async () => {
    const removeFilter = async () => {
      const filters = await screen.findAllByTestId('filter');
      userEvent.click(filters[0].querySelector('button'));
    };
    await act(async () => {
      render(<App />);
    });
    expect(await screen.findAllByRole('row')).toHaveLength(11);

    const select = await screen.findAllByTestId('column-filter');
    const selectComparison = await screen.findAllByTestId('comparison-filter');
    const input = await screen.findByTestId('value-filter');
    const button = await screen.findByTestId('button-filter')

    userEvent.selectOptions(select[0], 'diameter');
    userEvent.selectOptions(selectComparison[0], 'maior que');
    userEvent.type(input, '8900');
    userEvent.click(button);

    expect(await screen.findAllByRole('row')).toHaveLength(8);

    await waitFor(() => {
      userEvent.selectOptions(select[0], 'population');
      userEvent.selectOptions(selectComparison[0], 'menor que');
      userEvent.clear(input);
      userEvent.type(input, '1000000');
      userEvent.click(button);
    });
    expect(await screen.findAllByRole('row')).toHaveLength(3);

    await waitFor(() => {
      userEvent.selectOptions(select[0], 'orbital_period'); 
      userEvent.selectOptions(selectComparison[0], 'igual a');
      userEvent.clear(input);
      userEvent.type(input, '304');
      userEvent.click(button);
    });
    expect(await screen.findAllByRole('row')).toHaveLength(2);

    await removeFilter();
    await removeFilter();
    await removeFilter();

    expect(await screen.findAllByRole('row')).toHaveLength(11);
  });
});
