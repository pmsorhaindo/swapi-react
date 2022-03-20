import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Characters from './Characters';
import Films from './Films';
import './App.css';

function App() {
    const [movies] = useState(['A New Hope', 'The Empire Strikes Back', 'Return of the Jedi']);
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
                <Route path="/notfound" element={<div>Not found</div>} />
                <Route path="/apierror" element={<div>API error</div>} />
                <Route path="*" element={<div>Not found</div>} />
            </Routes>
        </div>
    );
}

export default App;
