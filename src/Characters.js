import React from 'react';
import PropTypes from 'prop-types';
import './App.css';

function Characters() {
    return <h2 className="character_header">Character</h2>;
}

Characters.propTypes = {
    movies: PropTypes.array.isRequired,
};

export default Characters;
