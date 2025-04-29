import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Character Components
import Lop from '../../components/characters/Lop';
import Player from '../../components/characters/Player';
import starryBackground from '../../assets/starry-background.jpg'
import planetForeground from '../../assets/planet-foreground.png'
import Scene from '../../components/Scene'
import spaceship from '../../assets/spaceship-crashed-2048.png'

// Redux
import { initializePageAttributes, selectPageAttributes } from '../../store/slices/pageSlice';

const defaultAttributes = {
  // Add default state properties here
};

const IntroCellina = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const {
    // Add state properties here
  } = useSelector((state) => selectPageAttributes(state, "introCellina", defaultAttributes));

  useEffect(() => {
    dispatch(initializePageAttributes({pageId: "introCellina", props: defaultAttributes}));
  }, [dispatch]);

  return (
    <div className="view intro-cellina">
      {/* Add your view content here */}
      <Scene skyImage={starryBackground} terrainImage={planetForeground} transformTerrain="scaleX(-1)" />
      
      {/* Crashed Spaceship */}
      <div 
        style={{
          position: 'absolute',
          bottom: '10vh',
          left: '15vw',
          width: '60vh',
          height: '60vh',
          backgroundImage: `url(${spaceship})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 2,
          transform: 'rotateZ(185deg)'
        }}
      />

      <Lop bottom="15vh" right="50vw"/>
      <Player bottom="5vh" right="15vh"/>

    </div>

  );
};

export default IntroCellina;
