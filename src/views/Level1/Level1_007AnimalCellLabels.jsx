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

// Import UI components
import NarrativeBubble from '../../components/bubbles/NarrativeBubble'
import Paragraph from '../../components/Paragraph'
import ConnectQuiz from '../../components/ConnectQuiz'
import { selectorFunction_decisionSplit_Completed007 } from '../../helpers/level1Helpers'

//Assets
import cellinaSmall from '../../assets/cellina1.png'

const defaultState = {
  // Empty default state as requested
  completed: false,
}

// Organelles and their correct functions
const organelles = [
  { id: 'lysosome', textId: "level1_007AnimalCellLabels.lysosome", defaultText: 'Lysosome' },
  { id: 'cellMembrane', textId: "level1_007AnimalCellLabels.cellMembrane", defaultText: 'Cell Membrane' },
  { id: 'mitochondria', textId: "level1_007AnimalCellLabels.mitochondria", defaultText: 'Mitochondria' },
  { id: 'cytoplasm', textId: "level1_007AnimalCellLabels.cytoplasm", defaultText: 'Cytoplasm' },
  { id: 'nucleus', textId: "level1_007AnimalCellLabels.nucleus", defaultText: 'Nucleus' }
];

const functions = [
  { id: 'makeEnergy', textId: "level1_007AnimalCellLabels.makeEnergy", defaultText: 'Makes energy from food' },
  { id: 'controlCenter', textId: "level1_007AnimalCellLabels.controlCenter", defaultText: 'The control center of the cell that holds DNA and directs cell activities.' },
  { id: 'borderProtection', textId: "level1_007AnimalCellLabels.borderProtection", defaultText: 'a border that protects and controls movement in and out of the cell' },
  { id: 'wasteDigestion', textId: "level1_007AnimalCellLabels.wasteDigestion", defaultText: 'Breaks down and digests waste material.' },
  { id: 'jellyFluid', textId: "level1_007AnimalCellLabels.jellyFluid", defaultText: 'A jelly-like fluid that fills the cell' }
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
          <h1 >{t("level1_007AnimalCellLabels.title", {defaultValue: "Animal Cell"})}</h1>  
        </Paragraph>
        
        <div style={{display: 'flex', flexDirection: 'row', position: 'absolute', right: '0rem', width: '40%', height: '20vh'}}>
          <NarrativeBubble id="instructionsBubble" showNext={false} top={"0%"} left={"0%"}
            mainText={t("level1_007AnimalCellLabels.instructions", {defaultValue: "Now that we've learned the organelles in the animal cell, let's review. Draw a line connecting each to its function."})}
          />
          {!completed && <img src={cellinaSmall} alt="Cellina" style={{position: 'absolute', width: '20vh', zIndex: 3, right:"0%"}} />}
        </div>
      </div>

      <div style={{padding: '2rem'}}>
        <ConnectQuiz
          terms={organelles}
          definitions={functions}
          correctConnections={correctConnections}
          termLabel={t("level1_007AnimalCellLabels.termLabel", {defaultValue: "Organelles"})}
          definitionLabel={t("level1_007AnimalCellLabels.definitionLabel", {defaultValue: "Functions"})}
          onComplete={() => {
            dispatch(setBubbleShow({bubbleId: 'instructionsBubble', show: false}))
            dispatch_setCompleted(true)
            dispatch(setBubbleShow({bubbleId: 'completedBubble', show: true}))
          }}
        />
      </div>
      <NarrativeBubble id="completedBubble" characterSrc={cellinaSmall} showNext={true} bottom={"0%"} right={"0%"}
        mainText={t("level1_007AnimalCellLabels.completed", {defaultValue: "Good job! Let's go back to the microscope to identify if this organism is a plant or animal."})}
        onClick={() => {
          dispatch(navigateTo({navigate, path: nextPath}))
        }}
      />
    </div>
  )
}

export default Level1_007AnimalCellLabels
