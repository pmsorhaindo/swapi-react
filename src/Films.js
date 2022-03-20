import React from 'react';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import './App.css';

function Film({ movies }) {
    return (
        <>
            <h2 className="film_header">Film</h2>
            {movies.join(', ')}
            <Outlet />
        </>
    );
}

Film.propTypes = {
    movies: PropTypes.array.isRequired,
};

export default Film;
