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

//Assets
import cellinaSmall from '../../assets/cellina-microscope-2-256.png'

const defaultState = {
  // Empty default state as requested
  completed: false,
}

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


  return (
    <div className="view">
      {/* Animal Cell Diagram */}
      
        {/* Title and Instructions */}
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: '20px',
          width: '100%'
        }}>
          
          <Paragraph style={{width: '30%', padding: '2rem', textAlign: 'center'}}>
            <h1 >{t("level1_007AnimalCellLabels.title", {defaultValue: "Animal Cell"})}</h1>  
          </Paragraph>
          
          <div style={{display: 'flex', justifyContent: 'flex-end', width: '70%'}}>
            <NarrativeBubble id="instructionsBubble" showNext={false} style={{position: 'unset'}}
              mainText={t("level1_007AnimalCellLabels.instructions", {defaultValue: "Now that we've learned the organelles in the animal cell, let's review. Draw a line connecting each to its function."})}
            />
            <img src={cellinaSmall} alt="Cellina" style={{width: '20%'}} />
          </div>

        </div>

        <div style={{width: '100%', margin: '2rem'}}>
        {/* Organelles and Functions */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '20px'
        }}>
          <div style={{
            backgroundColor: '#b3d4fc',
            padding: '10px',
            width: '30%',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1.2em'
          }}>
            Organelles
          </div>
          <div style={{
            backgroundColor: '#b3d4fc',
            padding: '10px',
            width: '30%',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1.2em'
          }}>
            Function
          </div>
        </div>

        {/* Organelle-Function Pairs */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '15px'
        }}>
          <div style={{
            border: '1px solid #333',
            padding: '10px',
            width: '30%',
            backgroundColor: '#fff'
          }}>
            Lysosome
          </div>
          <div style={{
            border: '1px solid #333',
            padding: '10px',
            width: '60%',
            backgroundColor: '#fff'
          }}>
            Makes energy from food
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '15px'
        }}>
          <div style={{
            border: '1px solid #333',
            padding: '10px',
            width: '30%',
            backgroundColor: '#fff'
          }}>
            Cell Membrane
          </div>
          <div style={{
            border: '1px solid #333',
            padding: '10px',
            width: '60%',
            backgroundColor: '#fff'
          }}>
            The control center of the cell that holds DNA and directs cell activities.
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '15px'
        }}>
          <div style={{
            border: '1px solid #333',
            padding: '10px',
            width: '30%',
            backgroundColor: '#fff'
          }}>
            Mitochondria
          </div>
          <div style={{
            border: '1px solid #333',
            padding: '10px',
            width: '60%',
            backgroundColor: '#fff'
          }}>
            a border that protects and controls movement in and out of the cell
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '15px'
        }}>
          <div style={{
            border: '1px solid #333',
            padding: '10px',
            width: '30%',
            backgroundColor: '#fff'
          }}>
            Cytoplasm
          </div>
          <div style={{
            border: '1px solid #333',
            padding: '10px',
            width: '60%',
            backgroundColor: '#fff'
          }}>
            Breaks down and digests waste material.
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '15px'
        }}>
          <div style={{
            border: '1px solid #333',
            padding: '10px',
            width: '30%',
            backgroundColor: '#fff'
          }}>
            Nucleus
          </div>
          <div style={{
            border: '1px solid #333',
            padding: '10px',
            width: '60%',
            backgroundColor: '#fff'
          }}>
            A jelly-like fluid that fills the cell
          </div>
        </div>

      </div>
    </div>
  )
}

export default Level1_007AnimalCellLabels
