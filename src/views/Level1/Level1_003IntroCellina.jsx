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
    </div>
  );
};

export default IntroCellina;
