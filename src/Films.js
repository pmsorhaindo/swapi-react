import React from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './App.css';

function Film({ movies }) {
    const { filmId } = useParams();
    const navigate = useNavigate();

    if (movies.length === 0) return <div className="loading">Loading Film Data...</div>;

    const options = movies.map(({ title, episodeId }) => ({ value: episodeId, label: title }));

    let defaultValue;
    try {
        defaultValue =
            filmId !== undefined
                ? {
                      label: movies.find(({ episodeId }) => {
                          return parseInt(episodeId) === parseInt(filmId);
                      }).title,
                      value: filmId,
                  }
                : undefined;
    } catch (e) {
        navigate('/notfound');
    }
    return (
        <form>
            <h2 className="film_header">Film</h2>
            <Select
                aria-label="Select a film"
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Type to search or select..."
                isSearchable
                options={options}
                defaultValue={defaultValue}
                onChange={({ value }) => {
                    navigate(`/films/${value}/chars`);
                }}
            />
            <Outlet />
        </form>
    );
}

Film.propTypes = {
    movies: PropTypes.array.isRequired,
};

export default Film;
