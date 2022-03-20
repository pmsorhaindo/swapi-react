import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { BrowserRouter, Router } from 'react-router-dom';
import films from './stubs/films';
import App from './App';

async function mockFetch(url) {
    switch (url) {
        case 'https://swapi.dev/api/films': {
            return {
                ok: true,
                status: 200,
                json: async () => films,
            };
        }
        default: {
            throw new Error(`Unhandled request: ${url}`);
        }
    }
}

function renderWithRouter(ui, { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}) {
    return {
        ...render(
            <Router location={history.location} navigator={history}>
                {ui}
            </Router>
        ),
        history,
    };
}

beforeAll(() => jest.spyOn(window, 'fetch'));
beforeEach(() => window.fetch.mockImplementation(mockFetch));

test('renders Title', async () => {
    render(<App />, { wrapper: BrowserRouter });
    const linkElement = await screen.getByText(/Star Wars API Browser/i);
    expect(linkElement).toBeInTheDocument();
});

test('landing on a bad page', async () => {
    renderWithRouter(<App />, { route: '/something-that-does-not-match' });
    await waitFor(() => {
        expect(screen.getByText(/Not found/)).toBeInTheDocument();
    });
});

test('on load fetches films', async () => {
    const { getByLabelText } = render(<App />, { wrapper: BrowserRouter });
    await waitFor(() => {
        expect(getByLabelText('Select a film')).toBeInTheDocument();
        expect(window.fetch).toHaveBeenCalledTimes(1);
        expect(window.fetch).toHaveBeenCalledWith('https://swapi.dev/api/films');
    });
});

test('when loaded film select contains films', async () => {
    const { container, getByLabelText } = render(<App />, { wrapper: BrowserRouter });
    await waitFor(() => {
        expect(getByLabelText('Select a film')).toBeInTheDocument();
        expect(window.fetch).toHaveBeenCalledWith('https://swapi.dev/api/films');
    });
    let filmDownButton = container.querySelector('div.react-select__dropdown-indicator');
    userEvent.click(filmDownButton);
    expect(await container.querySelectorAll('.react-select__option').length).toBe(6);
});

test('when loaded film select contains films', async () => {
    const { container, getByLabelText } = render(<App />, { wrapper: BrowserRouter });
    await waitFor(() => {
        expect(getByLabelText('Select a film')).toBeInTheDocument();
        expect(window.fetch).toHaveBeenCalledWith('https://swapi.dev/api/films');
    });
    let filmDownButton = container.querySelector('div.react-select__dropdown-indicator');
    userEvent.click(filmDownButton);
    let options = container.querySelectorAll('.react-select__option');
    expect(await options.length).toBe(6);
});
