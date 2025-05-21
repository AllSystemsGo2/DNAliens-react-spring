import { useNavigate, useLocation } from 'react-router-dom'
import { useSpring, animated } from '@react-spring/web'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

import { setBubbleShow } from '../../helpers/bubbleHelper'
import { navigateTo } from '../../store/slices/appSlice'
import { setPageAttribute, initializePageAttributes, selectPageAttributes } from '../../store/slices/pageSlice'

import NarrativeBubble from '../../components/bubbles/NarrativeBubble'
import SpeechBubble from '../../components/bubbles/SpeechBubble'

const defaultState = {}

const Level1_007AnimalCellPuzzle = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    dispatch(initializePageAttributes({
      pageId: "animalCellPuzzle",
      props: defaultState
    }))
  }, [dispatch, location.pathname])

  const pageAttributes = useSelector((state) => 
    selectPageAttributes(state, "animalCellPuzzle", defaultState)
  )

  return (
    <div className="view">
      {/* Component content will go here */}
    </div>
  )
}

export default Level1_007AnimalCellPuzzle
