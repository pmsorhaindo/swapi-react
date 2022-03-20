import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Characters from './Characters';
import Films from './Films';
import './App.css';

function App() {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function getMovies() {
            try {
                const response = await fetch('https://swapi.dev/api/films');
                if (!response.ok) throw new Error(response.statusText);
                const { results } = await response.json();
                setMovies(results.map(({ title, characters, episode_id }) => ({ title, characters, episodeId: episode_id })));
            } catch (err) {
                navigate('/apierror');
                console.log(err);
            }
        }
        if (movies.length === 0) getMovies();
    }, [setMovies, navigate]);

    return (
        <div className="app">
            <h1 className="app_header">Star Wars API Browser</h1>
            <Routes>
                <Route path="/" element={<Films movies={movies} />} />
                <Route index path="films" element={<Films movies={movies} />} />
                <Route path="films/:filmId" element={<Films movies={movies} />}>
                    <Route path="chars/" element={<Characters movies={movies} />} />
                    <Route path="chars/:charId" element={<Characters movies={movies} />} />
                </Route>
                <Route path="/notfound" element={<div className="error">Not found</div>} />
                <Route path="/apierror" element={<div className="error">API error</div>} />
                <Route path="*" element={<div className="error">Not found</div>} />
            </Routes>
        </div>
    );
}

export default App;
