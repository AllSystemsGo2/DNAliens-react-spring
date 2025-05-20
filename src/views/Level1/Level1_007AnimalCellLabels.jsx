// Fundamentals
import { useSpring, animated } from '@react-spring/web'
import { useEffect, useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

// Store
import { navigateTo } from '../../store/slices/appSlice'
import { initializePageAttributes, selectPageAttributes, setPageAttribute } from '../../store/slices/pageSlice'
import { setBubbleShow } from '../../helpers/bubbleHelper'
import { getPageId } from '../../helpers/locationHelper'

// Import UI components
import NarrativeBubble from '../../components/bubbles/NarrativeBubble'
import Paragraph from '../../components/Paragraph'
import ConnectableItem from '../../components/ConnectableItem'
import ConnectionLine from '../../components/ConnectionLine'

//Assets
import cellinaSmall from '../../assets/cellina-microscope-2-256.png'

const defaultState = {
  // Empty default state as requested
  completed: false,
  connections: [],
}

// Organelles and their correct functions
const organelles = [
  { id: 'lysosome', text: 'Lysosome' },
  { id: 'cellMembrane', text: 'Cell Membrane' },
  { id: 'mitochondria', text: 'Mitochondria' },
  { id: 'cytoplasm', text: 'Cytoplasm' },
  { id: 'nucleus', text: 'Nucleus' }
];

const functions = [
  { id: 'makeEnergy', text: 'Makes energy from food' },
  { id: 'controlCenter', text: 'The control center of the cell that holds DNA and directs cell activities.' },
  { id: 'borderProtection', text: 'a border that protects and controls movement in and out of the cell' },
  { id: 'wasteDigestion', text: 'Breaks down and digests waste material.' },
  { id: 'jellyFluid', text: 'A jelly-like fluid that fills the cell' }
];

// Correct matches
const correctConnections = {
  'lysosome': 'wasteDigestion',
  'cellMembrane': 'borderProtection',
  'mitochondria': 'makeEnergy',
  'cytoplasm': 'jellyFluid',
  'nucleus': 'controlCenter'
};

const Level1_007AnimalCellLabels = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const containerRef = useRef(null);
  // At the top of your component
  const organelleRefsMap = useRef({});
  const functionRefsMap = useRef({});
  
  
  // Then update your getConnectionCoordinates function to use organelleRefsMap.current and functionRefsMap.current

  // Local state for the connection drawing
  const [selectedItem, setSelectedItem] = useState(null);
  const [connections, setConnections] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    dispatch(initializePageAttributes({
      pageId: getPageId(location.pathname), 
      props: defaultState 
    }))
    dispatch(setBubbleShow({pageId: getPageId(location.pathname), bubbleId: 'instructionsBubble', show: true}))
  }, [dispatch, location.pathname])

  // Use the same pattern as in Level1_001Frisbee to retrieve page attributes
  const {
    completed
  } = useSelector((state) => 
    selectPageAttributes(state, state.app.pageId, defaultState)
  )

  const dispatch_setCompleted = (value) => dispatch(setPageAttribute({key: "completed", value}))
  const dispatch_setConnections = (value) => dispatch(setPageAttribute({key: "connections", value}))

  // Handle selecting an item (organelle or function)
  const handleSelectItem = (id, type) => {
    if (!selectedItem) {
      // First item selected
      setSelectedItem({ id, type });
    } else if (selectedItem.type !== type) {
      // Second item of different type selected, create connection
      const organelleId = type === 'organelle' ? id : selectedItem.id;
      const functionId = type === 'function' ? id : selectedItem.id;
      
      // Check if this organelle already has a connection
      const existingConnectionIndex = connections.findIndex(conn => conn.organelleId === organelleId);
      
      if (existingConnectionIndex !== -1) {
        // Replace existing connection
        const newConnections = [...connections];
        newConnections[existingConnectionIndex] = { organelleId, functionId };
        setConnections(newConnections);
      } else {
        // Add new connection
        setConnections([...connections, { organelleId, functionId }]);
      }
      
      // Check if the connection is correct
      const isCorrect = correctConnections[organelleId] === functionId;
      
      // Provide feedback
      setFeedback({
        organelleId,
        functionId,
        isCorrect
      });
      
      setTimeout(() => {
        setFeedback(null);
      }, 2000);
      
      // Reset selection
      setSelectedItem(null);
      
      // Check if all connections are correct
      const allCorrect = connections.length === Object.keys(correctConnections).length - 1 && 
                        connections.every(conn => correctConnections[conn.organelleId] === conn.functionId) &&
                        isCorrect;
      
      if (allCorrect) {
        dispatch_setCompleted(true);
        dispatch_setConnections(connections);
        // Show completion message or navigate to next level
        setTimeout(() => {
          dispatch(setBubbleShow({pageId: getPageId(location.pathname), bubbleId: 'completionBubble', show: true}));
        }, 1000);
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
  const registerOrganelleRef = (id, ref) => {
    organelleRefsMap.current[id] = ref;
  };
  
  const registerFunctionRef = (id, ref) => {
    functionRefsMap.current[id] = ref;
  };
  

  // Calculate connection line coordinates
  const getConnectionCoordinates = (connection) => {
    const { organelleId, functionId } = connection;
    const organelleRef = organelleRefsMap.current[organelleId];
    const functionRef = functionRefsMap.current[functionId];
    
    if (organelleRef && functionRef) {
      const organelleRect = organelleRef.getBoundingClientRect();
      const functionRect = functionRef.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      return {
        startX: organelleRect.right - containerRect.left,
        startY: organelleRect.top + organelleRect.height / 2 - containerRect.top,
        endX: functionRect.left - containerRect.left,
        endY: functionRect.top + functionRect.height / 2 - containerRect.top,
        isCorrect: correctConnections[organelleId] === functionId
      };
    }
    
    return null;
  };

  return (
    <div className="view" onMouseMove={handleMouseMove}>
      {/* Animal Cell Diagram */}
      
        {/* Title and Instructions */}
        <div style={{
          display: 'block',
          width: '100%',
          height: '20vh',
          margin: '2rem'
        }}>
          
          <Paragraph style={{width: '30%', textAlign: 'center'}}>
            <h1 >{t("level1_007AnimalCellLabels.title", {defaultValue: "Animal Cell"})}</h1>  
          </Paragraph>
          
          <div style={{display: 'flex', flexDirection: 'row', position: 'absolute', right: '0rem', width: '40%', height: '20vh'}}>
            <NarrativeBubble id="instructionsBubble" showNext={false} top={"0%"} left={"0%"}
              mainText={t("level1_007AnimalCellLabels.instructions", {defaultValue: "Now that we've learned the organelles in the animal cell, let's review. Draw a line connecting each to its function."})}
            />
            <img src={cellinaSmall} alt="Cellina" style={{position: 'absolute', width: '20vh', zIndex: 3, right:"0%"}} />
          </div>
        </div>

        <div style={{padding: '2rem'}}>
          <div 
            ref={containerRef}
            style={{
              width: '100%', 
              position: 'relative',
              minHeight: '400px'
            }}
          >
            {/* Draw line while connecting */}
            {selectedItem && (organelleRefsMap.current[selectedItem.id] || functionRefsMap.current[selectedItem.id]) && (
              <ConnectionLine
                startX={selectedItem.type === 'organelle' 
                  ? (organelleRefsMap.current[selectedItem.id]?.getBoundingClientRect().right - containerRef.current.getBoundingClientRect().left) 
                  : (functionRefsMap.current[selectedItem.id]?.getBoundingClientRect().left - containerRef.current.getBoundingClientRect().left)}
                startY={selectedItem.type === 'organelle'
                  ? (organelleRefsMap.current[selectedItem.id]?.getBoundingClientRect().top + organelleRefsMap.current[selectedItem.id]?.getBoundingClientRect().height / 2 - containerRef.current.getBoundingClientRect().top)
                  : (functionRefsMap.current[selectedItem.id]?.getBoundingClientRect().top + functionRefsMap.current[selectedItem.id]?.getBoundingClientRect().height / 2 - containerRef.current.getBoundingClientRect().top)}
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

            {/* Organelles and Functions */}
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
                Organelles
              </div>
              <div style={{
                backgroundColor: '#b3d4fc',
                padding: '10px',
                width: '60vh',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '1.2em'
              }}>
                Function
              </div>
            </div>

            

            {/* Organelle-Function Pairs */}
            {organelles.map((organelle, index) => (
              <div 
                key={organelle.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '15px',
                  position: 'relative'
                }}
              >
                <div 
                ref={ref => registerOrganelleRef(organelle.id, ref)}
                >
                  <ConnectableItem 
                    id={organelle.id}
                    type="organelle"
                    text={organelle.text}
                    onSelect={handleSelectItem}
                    isSelected={selectedItem?.id === organelle.id}
                    isCorrect={feedback?.organelleId === organelle.id && feedback?.isCorrect}
                    isIncorrect={feedback?.organelleId === organelle.id && !feedback?.isCorrect}
                  />
                </div>
                <div 
                ref={ref => registerFunctionRef(functions[index].id, ref)}
                >
                  <ConnectableItem 
                    id={functions[index].id}
                    type="function"
                    text={functions[index].text}
                    onSelect={handleSelectItem}
                    isSelected={selectedItem?.id === functions[index].id}
                    isCorrect={feedback?.functionId === functions[index].id && feedback?.isCorrect}
                    isIncorrect={feedback?.functionId === functions[index].id && !feedback?.isCorrect}
                  />
                </div>
              </div>
            ))}

            

            {/* Completion message */}
            <NarrativeBubble 
              id="completionBubble" 
              showNext={true} 
              style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}
              mainText={t("level1_007AnimalCellLabels.completion", {defaultValue: "Great job! You've correctly matched all the organelles to their functions!"})}
              onClick={() => {
                // Navigate to next level or show additional content
                dispatch(navigateTo({navigate, path: '/Level1/Level1_008'}));
              }}
            />
          </div>
      </div>
    </div>
  )
}

export default Level1_007AnimalCellLabels
