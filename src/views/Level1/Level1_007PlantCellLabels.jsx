// Fundamentals
import { useSpring, animated } from '@react-spring/web'
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

// Store
import { navigateTo } from '../../store/slices/appSlice'
import { initializePageAttributes, selectPageAttributes, setPageAttribute } from '../../store/slices/pageSlice'
import { setBubbleShow } from '../../helpers/bubbleHelper'
import { getPageId } from '../../helpers/locationHelper'
import { selectorFunction_decisionSplit_Completed007 } from '../../helpers/level1Helpers'

// Import UI components
import NarrativeBubble from '../../components/bubbles/NarrativeBubble'
import Paragraph from '../../components/Paragraph'
import ConnectQuiz from '../../components/ConnectQuiz'

//Assets
import cellinaSmall from '../../assets/cellina1.png'

const defaultState = {
  // Empty default state as requested
  completed: false,
}

// Organelles and their correct functions
const organelles = [
  { id: 'chloroplast', textId: "level1_007PlantCellLabels.chloroplast", defaultText: 'Chloroplast' },
  { id: 'cellMembrane', textId: "level1_007PlantCellLabels.cellMembrane", defaultText: 'Cell Membrane' },
  { id: 'mitochondria', textId: "level1_007PlantCellLabels.mitochondria", defaultText: 'Mitochondria' },
  { id: 'cytoplasm', textId: "level1_007PlantCellLabels.cytoplasm", defaultText: 'Cytoplasm' },
  { id: 'nucleus', textId: "level1_007PlantCellLabels.nucleus", defaultText: 'Nucleus' },
  { id: 'cellWall', textId: "level1_007PlantCellLabels.cellWall", defaultText: 'Cell Wall' }
];

const functions = [
  { id: 'jellyFluid', textId: "level1_007PlantCellLabels.jellyFluid", defaultText: 'A jelly-like fluid that fills the cell.' },
  { id: 'controlCenter', textId: "level1_007PlantCellLabels.controlCenter", defaultText: 'The control center of the cell that holds DNA and directs cell activities.' },
  { id: 'borderProtection', textId: "level1_007PlantCellLabels.borderProtection", defaultText: 'A border that protects and controls movement in and out of the cell' },
  { id: 'provideStructure', textId: "level1_007PlantCellLabels.provideStructure", defaultText: 'Provides structure and support cell' },
  { id: 'makeFood', textId: "level1_007PlantCellLabels.makeFood", defaultText: 'Uses sunlight to make food' },
  { id: 'makeEnergy', textId: "level1_007PlantCellLabels.makeEnergy", defaultText: 'Makes energy from food' }
];

// Correct matches
const correctConnections = {
  'chloroplast': 'makeFood',
  'cellMembrane': 'borderProtection',
  'mitochondria': 'makeEnergy',
  'cytoplasm': 'jellyFluid',
  'nucleus': 'controlCenter',
  'cellWall': 'provideStructure'
};

const Level1_007PlantCellLabels = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

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

  const nextPath = useSelector((state) => 
    selectorFunction_decisionSplit_Completed007(state)
  )

  const dispatch_setCompleted = (value) => dispatch(setPageAttribute({key: "completed", value}))


  return (
    <div className="view">
      {/* Plant Cell Diagram */}
      
      {/* Title and Instructions */}
      <div style={{
        display: 'block',
        width: '100%',
        height: '20vh',
        margin: '2rem'
      }}>
        
        <Paragraph style={{width: '30%', textAlign: 'center'}}>
          <h1 >{t("level1_007PlantCellLabels.title", {defaultValue: "Plant Cell"})}</h1>  
        </Paragraph>
        
        <div style={{display: 'flex', flexDirection: 'row', position: 'absolute', right: '0rem', width: '40%', height: '20vh'}}>
          <NarrativeBubble id="instructionsBubble" showNext={false} top={"0%"} left={"0%"}
            mainText={t("level1_007PlantCellLabels.instructions", {defaultValue: "Now that we've learned the organelles in the plant cell, let's review. Draw a line connecting each to its function."})}
          />
          {completed && <img src={cellinaSmall} alt="Cellina" style={{position: 'absolute', width: '20vh', zIndex: 3, right:"0%"}} />}
        </div>
      </div>

      <div style={{padding: '2rem'}}>
        <ConnectQuiz
          terms={organelles}
          definitions={functions}
          correctConnections={correctConnections}
          termLabel={t("level1_007PlantCellLabels.termLabel", {defaultValue: "Organelles"})}
          definitionLabel={t("level1_007PlantCellLabels.definitionLabel", {defaultValue: "Functions"})}
          onComplete={() => {
            dispatch(setBubbleShow({bubbleId: 'instructionsBubble', show: false}))
            dispatch_setCompleted(true)
            dispatch(setBubbleShow({bubbleId: 'completedBubble', show: true}))
          }}
        />
      </div>
      <NarrativeBubble id="completedBubble" showNext={true} bottom={"0%"} right={"0%"}
        mainText={t("level1_007PlantCellLabels.completed", {defaultValue: "Good job! Let's go back to the microscope to identify if this organism is a plant or animal."})}
        onClick={() => {
          dispatch(navigateTo({navigate, path: nextPath}))
        }}
      />
    </div>
  )
}

export default Level1_007PlantCellLabels
