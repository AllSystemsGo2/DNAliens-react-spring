import React from 'react';
import PropTypes from 'prop-types';

const Scene = ({ skyImage, terrainImage, transformTerrain }) => {
  return (
    <>
      {/* Starry background */}
      <div id="skyline" style={{
        backgroundImage: `url(${skyImage})`,
        backgroundSize: '125% 100%',
        backgroundPosition: '0% 25%',
        backgroundRepeat: 'repeat-x repeat-y',
        minHeight: '100vh',
        width: '100%',
        position: 'absolute',
        top: 0,
        animation: 'panBackground 240s linear infinite'
      }} />

      {/* Planet foreground */}
      <div id="terrain" style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '50vh',
        backgroundImage: `url(${terrainImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
        ...(transformTerrain && { transform: transformTerrain })
      }} />
    </>
  );
};

Scene.propTypes = {
  skyImage: PropTypes.string.isRequired,
  terrainImage: PropTypes.string.isRequired,
  transformTerrain: PropTypes.string
};

export default Scene;
