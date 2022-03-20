import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Character({ birth_year, eye_color, gender, hair_color, height, homeworld, mass, name, skin_color, isLoading }) {
    const navigate = useNavigate();
    const [resolvedHomeworld, setResolvedHomeworld] = useState('');

    useEffect(() => {
        const getHomeworld = async (homeworldUrl) => {
            try {
                setResolvedHomeworld('Locating Homeworld...');
                const response = await fetch(homeworldUrl);
                if (!response.ok) throw new Error(response.statusText);
                const { name } = await response.json();
                setResolvedHomeworld(name);
            } catch (err) {
                navigate('/apierror');
                console.log(err);
            }
        };
        homeworld && getHomeworld(homeworld);
    }, [homeworld]);

    return (
        <div className="character_container">
            {!isLoading ? (
                <h2 className={`character_header ${!name ? 'character_header--placeholder' : ''}`}>{name || 'Character'}</h2>
            ) : (
                <h2 className="character_header">Loading...</h2>
            )}
            <ul className="character_data">
                <li>Birth Year: {birth_year}</li>
                <li>Gender: {gender}</li>
                <li>Eye Color: {eye_color}</li>
                <li>Hair Color: {hair_color}</li>
                <li>Mass: {mass}</li>
                <li>Height: {height}</li>
                <li>Homeworld: {resolvedHomeworld}</li>
                <li>Skin Color: {skin_color}</li>
            </ul>
        </div>
    );
}

Character.propTypes = {
    birth_year: PropTypes.string,
    eye_color: PropTypes.string,
    films: PropTypes.array,
    gender: PropTypes.string,
    hair_color: PropTypes.string,
    height: PropTypes.string,
    homeworld: PropTypes.string,
    isLoading: PropTypes.bool,
    mass: PropTypes.string,
    name: PropTypes.string,
    skin_color: PropTypes.string,
};

function charactersAreEqual(prevCharacter, nextCharacter) {
    return prevCharacter.name === nextCharacter.name;
}
export default memo(Character, charactersAreEqual);
