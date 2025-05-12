import { useSpring, animated } from '@react-spring/web'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { initializePageAttributes, selectPageAttributes, setPageAttribute } from '../../store/slices/pageSlice'
import {setBubbleShow} from '../../helpers/bubbleHelper'

import NarrativeBubble from '../../components/bubbles/NarrativeBubble'
import WrittenResponsePrompt from '../../components/WrittenResponsePrompt'

import cellinaSmall from '../../assets/cellina-microscope-2-256.png'
import lopSmall from '../../assets/lop-256.png'

import slide1 from '../../assets/animal-cell-slide1.png'

const defaultState = {
  // Empty default state as requested
  dialogStep: 0,
  showWrittenResponsePrompt: false,
}

const SlideView = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(initializePageAttributes({
      pageId: "slideView", 
      props: defaultState
    }))
  }, [dispatch])

  const {
    dialogStep,
    showWrittenResponsePrompt,
  } = useSelector((state) => selectPageAttributes(state, "slideView", defaultState))

  const setDialogStep = (value) => dispatch(setPageAttribute({pageId: "slideView", key: "dialogStep", value}))
  const setShowWrittenResponsePrompt = (value) => dispatch(setPageAttribute({pageId: "slideView", key: "showWrittenResponsePrompt", value}))


  useEffect(() => {
    if (dialogStep === 0) {
      setTimeout(() => dispatch(setBubbleShow("slideView", "cellina", true)), 1000)
    }
    else {
      dispatch(setBubbleShow("slideView", "cellina", false))
    }
    if (dialogStep === 1) {
      setTimeout(() => dispatch(setBubbleShow("slideView", "lop", true)), 1000)
    }
    if (dialogStep !== 1 && dialogStep !== 2) {
      dispatch(setBubbleShow("slideView", "lop", false))
    }

    if (dialogStep === 2) {
      setShowWrittenResponsePrompt(true)
    }
    else {
      setShowWrittenResponsePrompt(false)
    }

    if (dialogStep === 3) {
      setTimeout(() => dispatch(setBubbleShow("slideView", "cellinaNext", true)), 1000)
    }
  }, [dialogStep])

  return (
    <div className="view">
      <NarrativeBubble
        top="20%"
        left="30%"
        pageId="slideView"
        id="cellina"
        subText="It looks like this a multicellular organism, made of more than one cell. Let's investigate to see if these are plant or animal cells."
        characterSrc={cellinaSmall}
        showNext={true}
        onClick={() => setDialogStep(1)}
      />
      <NarrativeBubble
        top="20%"
        left="30%"
        pageId="slideView"
        id="lop"
        showNext={dialogStep === 1}
        subText="What is the difference between a plant and animal cell? How can we tell them apart?"
        characterSrc={lopSmall}
        onClick={() => setDialogStep(2)}
      />
      <img style={{height: "100%", width: "auto"}} src={slide1} />
      {showWrittenResponsePrompt && <WrittenResponsePrompt
        style={{
          position: "absolute",
          top: "65%",
          left: "25%",
          width: "50%"
        }}
        prompt="What is the difference between a plant and animal cell? How can we tell them apart?"
        responseKey="slideView-cellina"
        onSubmit={(response) => {
          setShowWrittenResponsePrompt(false)
          setDialogStep(3)
          console.log("Submitted response:", response)
        }}
      />}
      <NarrativeBubble
        bottom="20%"
        right="5%"
        pageId="slideView"
        id="cellinaNext"
        subText="Let’s explore the differences between plant and animal cells."
        characterSrc={cellinaSmall}
        onClick={() => navigate("/level1/006")}
      />
    </div>
  )
}

export default SlideView
