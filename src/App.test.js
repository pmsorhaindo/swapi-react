import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
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
