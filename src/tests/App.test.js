import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';


beforeEach(() => {
  jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(testData),
  });
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
  it('Verifica se a página contém um input com o placeholder "Digite o nome do planeta" sendo "search-input"', () => {
    render(<App />);
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument();
  });
  it('Verifica se a página contém um button com o texto "Filtrar"', () => {
    render(<App />);
    const button = screen.getByRole('button', {
      name: /filtrar/i,
    });
    expect(button).toBeInTheDocument();
  });
  it('Verifica se a pagina contem um select com todas as opcoes de filtro', () => {
    render(<App />);
    const select = screen.getByTestId('column-filter')
    expect(select).toHaveLength(5);

    const selectComparison = screen.getByTestId('comparison-filter')
    expect(selectComparison).toHaveLength(3);
  });
  it('Verifica se a tabela é renderizada com os dados corretos', async () => {
    render(<App />);
    const table = await screen.findByRole('table');
    expect(table).toBeInTheDocument();

    screen.findByText('Tatooine');
    screen.findByText('Alderaan');
    screen.findByText('Yavin IV');
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

    await screen.findByText('Alderaan');
    await screen.findByText('Bespin');
    await screen.findByText('Endor');
    await screen.findByText('Naboo');
    await screen.findByText('Coruscant');
    await screen.findByText('Kamino');

    await waitFor(() => {
      userEvent.selectOptions(select[0], 'orbital_period');
      userEvent.selectOptions(selectComparison[0], 'menor que');
      userEvent.clear(input);
      userEvent.type(input, '400');
    });

    screen.findByText('Alderaan');
    screen.findByText('Naboo');
    screen.findByText('Coruscant');
  });
  it('Verifica se ao preencher o campo de input o filtro e aplicado', async () => {
    render(<App />);
    const input = await screen.findByTestId('name-filter');
    const aldebaran = await screen.findByText('Alderaan');

    await waitFor(() => {
      userEvent.type(input, 'oo');
    });  

    expect(aldebaran).not.toBeInTheDocument();
  });
  it('Verifica se o filtro de menor que funciona corretamente', async () => {
    render(<App />);
    const select = await screen.findAllByTestId('column-filter');
    const selectComparison = await screen.findAllByTestId('comparison-filter');
    const input = await screen.findByTestId('value-filter');
    const button = await screen.findByTestId('button-filter')

    userEvent.selectOptions(select[0], 'population');
    userEvent.selectOptions(selectComparison[0], 'menor que');
    userEvent.type(input, '200000');
    userEvent.click(button);

    await screen.findByText('Yavin IV');

    expect(screen.queryByText('Alderaan')).not.toBeInTheDocument();
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

    await screen.findByText('Tatooine');
    await screen.findByText('Hoth');
    await screen.findByText('Dagobah');

    expect(screen.queryByText('Alderaan')).not.toBeInTheDocument();
  });
});
