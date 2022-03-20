import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { usePrevious, getCharacterId } from './utils';
import './App.css';

function Characters({ movies }) {
    const navigate = useNavigate();
    const { filmId = '', charId = '' } = useParams();
    const previousFilmId = usePrevious(filmId);
    const [currentCharacters, setCharacters] = useState([]);

    useEffect(() => {
        const setSelectedMovie = async (episodeId) => {
            let foundMovie = movies.find((movie) => parseInt(movie.episodeId) === parseInt(episodeId));
            let characters = filmId !== previousFilmId ? [] : currentCharacters;
            if (foundMovie !== undefined && (filmId !== previousFilmId || currentCharacters.length === 0)) {
                setCharacters(characters);
                const responses = await Promise.all(foundMovie.characters.map((character) => fetch(character)));
                characters = await Promise.all(responses.map((response) => response.json()));
            }
            setCharacters(characters);
        };

        try {
            if (filmId !== previousFilmId) setSelectedMovie(filmId);
        } catch (error) {
            navigate('/notfound');
            console.error(error);
        }
    }, [currentCharacters, charId, filmId]);

    if (currentCharacters.length === 0) return <div className="loading">Loading Character Data...</div>;

    const options = currentCharacters.map(({ name, url }, i) => ({ key: i, value: getCharacterId(url), label: name }));

    let defaultValue;
    try {
        defaultValue =
            charId !== ''
                ? {
                      label: currentCharacters.find(({ url }) => {
                          return parseInt(getCharacterId(url)) === parseInt(charId);
                      }).name,
                      value: charId,
                  }
                : undefined;
    } catch (error) {
        navigate('/notfound');
        console.error(error);
    }

    return (
        <>
            <h2 className="character_header">Character</h2>
            <Select
                aria-label="Select a character"
                className="react-select-container"
                classNamePrefix="react-select"
                placeholder="Type to search or select..."
                key={(defaultValue && `${filmId}-${defaultValue.value}`) || filmId}
                isSearchable
                options={options}
                defaultValue={defaultValue}
                onChange={({ value }) => {
                    navigate(`/films/${filmId}/chars/${value}`);
                }}
            />
        </>
    );
}

Characters.propTypes = {
    movies: PropTypes.array.isRequired,
};

export default Characters;
