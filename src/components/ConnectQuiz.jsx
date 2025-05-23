// ConnectQuiz.jsx

// Fundamentals
import { useSpring, animated } from '@react-spring/web'
import { useEffect, useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

// Store
import { initializePageAttributes, selectPageAttributes, setPageAttribute } from '../store/slices/pageSlice'
import { getPageId } from '../helpers/locationHelper'

// Import UI components
import ConnectableItem from './ConnectableItem'
import ConnectionLine from './ConnectionLine'


const defaultState = {
  // Empty default state as requested
  completed: false,
  connections: [],
}

// Examples of terms and definitions
// const terms = [
//   { id: 'lysosome', text: 'Lysosome' },
//   { id: 'cellMembrane', text: 'Cell Membrane' },
//   { id: 'mitochondria', text: 'Mitochondria' },
//   { id: 'cytoplasm', text: 'Cytoplasm' },
//   { id: 'nucleus', text: 'Nucleus' }
// ];

// const definitions = [
//   { id: 'makeEnergy', text: 'Makes energy from food' },
//   { id: 'controlCenter', text: 'The control center of the cell that holds DNA and directs cell activities.' },
//   { id: 'borderProtection', text: 'a border that protects and controls movement in and out of the cell' },
//   { id: 'wasteDigestion', text: 'Breaks down and digests waste material.' },
//   { id: 'jellyFluid', text: 'A jelly-like fluid that fills the cell' }
// ];


const ConnectQuiz = ({terms, definitions, correctConnections, termLabel="Terms", definitionLabel="Definitions", onComplete }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const containerRef = useRef(null);
  // At the top of your component
  const termsRefsMap = useRef({});
  const definitionsRefsMap = useRef({});

  

  // Local state for the connection drawing
  const [selectedItem, setSelectedItem] = useState(null);
  // const [connections, setConnections] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    dispatch(initializePageAttributes({
      pageId: getPageId(location.pathname), 
      props: defaultState 
    }))
  }, [dispatch, location.pathname])

  // Use the same pattern as in Level1_001Frisbee to retrieve page attributes
  const {
    completed,
    connections
  } = useSelector((state) => 
    selectPageAttributes(state, state.app.pageId, defaultState)
  )

  const dispatch_setCompleted = (value) => dispatch(setPageAttribute({key: "completed", value}))
  const dispatch_setConnections = (value) => dispatch(setPageAttribute({key: "connections", value}))

  // Handle selecting an item (term or definition)
  const handleSelectItem = (id, type) => {
    if (!selectedItem) {
      // First item selected
      setSelectedItem({ id, type });
    } else if (selectedItem.type !== type) {
      // Second item of different type selected, create connection
      const termId = type === 'term' ? id : selectedItem.id;
      const definitionId = type === 'definition' ? id : selectedItem.id;
      
      // Check if this term already has a connection
      const existingConnectionIndex = connections.findIndex(conn => conn.termId === termId);
      
      if (existingConnectionIndex !== -1) {
        // Replace existing connection
        const newConnections = [...connections];
        newConnections[existingConnectionIndex] = { termId, definitionId };
        dispatch_setConnections(newConnections);
      } else {
        // Add new connection
        dispatch_setConnections([...connections, { termId, definitionId }]);
      }
      
      // Check if the connection is correct
      const isCorrect = correctConnections[termId] === definitionId;
      
      // Provide feedback
      setFeedback({
        termId,
        definitionId,
        isCorrect
      });
      
      setTimeout(() => {
        setFeedback(null);
      }, 2000);
      
      // Reset selection
      setSelectedItem(null);
      
      // Check if all connections are correct
      const allCorrect = connections.length === Object.keys(correctConnections).length - 1 && 
                        connections.every(conn => correctConnections[conn.termId] === conn.definitionId) &&
                        isCorrect;
      
      if (allCorrect) {
        dispatch_setCompleted(true);
        dispatch_setConnections(connections);
        onComplete();
        //DONE!!!!!!        
      }
    } else {
      // Same type selected, just update selection
      setSelectedItem({ id, type });
    }
  };

  // Track mouse movement for drawing the line
  const handleMouseMove = (e) => {
    if (containerRef.current && selectedItem) {
      const containerRect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - containerRect.left,
        y: e.clientY - containerRect.top
      });
    }
  };

  // Replace your state setters with direct ref updates
  const registerTermRef = (id, ref) => {
    termsRefsMap.current[id] = ref;
  };
  
  const registerDefinitionRef = (id, ref) => {
    definitionsRefsMap.current[id] = ref;
  };
  

  // Calculate connection line coordinates
  const getConnectionCoordinates = (connection) => {
    const { termId, definitionId } = connection;
    const termRef = termsRefsMap.current[termId];
    const definitionRef = definitionsRefsMap.current[definitionId];
    
    if (termRef && definitionRef) {
      const termRect = termRef.getBoundingClientRect();
      const definitionRect = definitionRef.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      return {
        startX: termRect.right - containerRect.left,
        startY: termRect.top + termRect.height / 2 - containerRect.top,
        endX: definitionRect.left - containerRect.left,
        endY: definitionRect.top + definitionRect.height / 2 - containerRect.top,
        isCorrect: correctConnections[termId] === definitionId
      };
    }
    
    return null;
  };

  return (
    <div onMouseMove={handleMouseMove}>
      <div 
        ref={containerRef}
        style={{
          width: '100%', 
          position: 'relative',
          minHeight: '400px'
        }}
      >
        {/* Draw line while connecting */}
        {selectedItem && (termsRefsMap.current[selectedItem.id] || definitionsRefsMap.current[selectedItem.id]) && (
          <ConnectionLine
            startX={selectedItem.type === 'term' 
              ? (termsRefsMap.current[selectedItem.id]?.getBoundingClientRect().right - containerRef.current.getBoundingClientRect().left) 
              : (definitionsRefsMap.current[selectedItem.id]?.getBoundingClientRect().left - containerRef.current.getBoundingClientRect().left)}
            startY={selectedItem.type === 'term'
              ? (termsRefsMap.current[selectedItem.id]?.getBoundingClientRect().top + termsRefsMap.current[selectedItem.id]?.getBoundingClientRect().height / 2 - containerRef.current.getBoundingClientRect().top)
              : (definitionsRefsMap.current[selectedItem.id]?.getBoundingClientRect().top + definitionsRefsMap.current[selectedItem.id]?.getBoundingClientRect().height / 2 - containerRef.current.getBoundingClientRect().top)}
            endX={mousePosition.x}
            endY={mousePosition.y}
          />
        )}  

        {/* Draw existing connections */}
        {connections.map((connection, index) => {
          const coords = getConnectionCoordinates(connection);
          if (coords) {
            return (
              <ConnectionLine
                key={`connection-${index}`}
                startX={coords.startX}
                startY={coords.startY}
                endX={coords.endX}
                endY={coords.endY}
                isCorrect={coords.isCorrect}
                isIncorrect={!coords.isCorrect}
              />
            );
          }
          return null;
        })}

        {/* Terms and Definitions */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}>
          <div style={{
            backgroundColor: '#b3d4fc',
            padding: '10px',
            width: '30vh',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1.2em'
          }}>
            {termLabel}
          </div>
          <div style={{
            backgroundColor: '#b3d4fc',
            padding: '10px',
            width: '60vh',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1.2em'
          }}>
            {definitionLabel}
          </div>
        </div>

        

        {/* Terms-Definitions Pairs */}
        {terms.map((term, index) => (
          <div 
            key={term.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '15px',
              position: 'relative'
            }}
          >
            <div 
            ref={ref => registerTermRef(term.id, ref)}
            >
              <ConnectableItem 
                id={term.id}
                type="term"
                text={t(term.textId, {defaultValue: term.defaultText})}
                onSelect={handleSelectItem}
                isSelected={selectedItem?.id === term.id}
                isCorrect={feedback?.termId === term.id && feedback?.isCorrect}
                isIncorrect={feedback?.termId === term.id && !feedback?.isCorrect}
              />
            </div>
            <div 
            ref={ref => registerDefinitionRef(definitions[index].id, ref)}
            >
              <ConnectableItem 
                id={definitions[index].id}
                type="definition"
                text={t(definitions[index].textId, {defaultValue: definitions[index].defaultText})}
                onSelect={handleSelectItem}
                isSelected={selectedItem?.id === definitions[index].id}
                isCorrect={feedback?.definitionId === definitions[index].id && feedback?.isCorrect}
                isIncorrect={feedback?.definitionId === definitions[index].id && !feedback?.isCorrect}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ConnectQuiz
