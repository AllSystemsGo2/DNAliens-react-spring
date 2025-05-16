import { useSpring, animated } from '@react-spring/web'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { initializePageAttributes, selectPageAttributes, setPageAttribute } from '../../store/slices/pageSlice'
import { setBubbleShow } from '../../helpers/bubbleHelper'
import { getPageId } from '../../helpers/locationHelper'

import cellinaMicroscope from '../../assets/cellina-microscope-2-256.png'
import animalCell from '../../assets/animal-cell1-1024.png'
import emptySlide from '../../assets/blank-slide1.png'

// Import UI components
import NarrativeBubble from '../../components/bubbles/NarrativeBubble'
import MultipleChoicePrompt from '../../components/MultipleChoicePrompt'
import WrittenResponsePrompt from '../../components/WrittenResponsePrompt'
import Paragraph from '../../components/Paragraph'

const defaultAttributes = {
  // Empty default state as requested
  dialogCounter: 1,
  selectedAnswer: -1,
  showWrittenResponse: false
}

const Level1_009CellTypeQuestion = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(initializePageAttributes({
      pageId: getPageId(location.pathname), 
      props: defaultAttributes
    }))
    
    // Show initial speech bubble after a short delay
    setTimeout(() => {
      dispatch(setBubbleShow({bubbleId: "cellina-speech", show: true}))
    }, 1000)
  }, [dispatch])

  // Use the same pattern as in Level1_001Frisbee to retrieve page attributes
  const {
    dialogCounter,
    selectedAnswer,
    showWrittenResponse
  } = useSelector((state) => 
    selectPageAttributes(state, state.app.pageId, defaultAttributes)
  )
  
  // Helper functions to update state
  const dispatch_setDialogCounter = (counter) => { 
    dispatch(setPageAttribute({key: "dialogCounter", value: counter}))
  }
  
  const dispatch_setSelectedAnswer = (answer) => { 
    dispatch(setPageAttribute({key: "selectedAnswer", value: answer}))
  }

  const dispatch_setShowWrittenResponse = (show) => { 
    dispatch(setPageAttribute({key: "showWrittenResponse", value: show}))
  }
  
  const dispatch_setExplanation = (text) => { 
    dispatch(setPageAttribute({key: "explanation", value: text}))
  }
  
  // Handle dialog flow based on counter
  useEffect(() => {
    if (dialogCounter === 1) {
      const timeout = setTimeout(() => {
        dispatch(setBubbleShow({bubbleId: "cellina-question1", show: true}))
      }, 1500)
      return () => clearTimeout(timeout)
    } else  {
      dispatch(setBubbleShow({bubbleId: "cellina-question1", show: false}))
    }
    if(dialogCounter === 2) {
      if(selectedAnswer === 1) { // if the answer is correct
        setTimeout(() => {
          dispatch(setBubbleShow({
            bubbleId: "cellina-response1-correct", 
            show: true}))
        }, 1500)
        // if the answer is correct, we wait until dialogCounter === 3 to show the written response        
      }
      else { //if answer is wrong
        setTimeout(() => {
          dispatch(setBubbleShow({
            bubbleId: "cellina-response1-incorrect", 
            show: true}))
        }, 1500)
  
        setTimeout(() => {
          console.log("show written response")
          dispatch_setShowWrittenResponse(true)
        }, 3000)  
      }
    }

    if (dialogCounter === 3) {      
      setTimeout(() => {
        dispatch(setBubbleShow({bubbleId: "cellina-question2", show: true}))
      }, 1500)
      setTimeout(() => {
        dispatch_setShowWrittenResponse(true)
      }, 3000) 
    } 
  }, [selectedAnswer, dialogCounter, dispatch])

  return (
    <div className="view">
      <div id="background" style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* <div id="empty-slide" style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${emptySlide})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'rotate(90deg)',
          transformOrigin: 'center',
          overflow:'visible'
        }}/> */}

        <div id="animal-cell" style={{ 
          position: 'absolute',
          width: '70vh',
          height: '70vh',
          marginBottom: '15vh',
          backgroundImage: `url(${animalCell})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} > </div>
       </div>

      <NarrativeBubble id="cellina-question1" characterSrc={cellinaMicroscope} top="2vh" left="10vw" subText={t("level1_009CellTypeQuestion.question1", { defaultValue: "What type of cell do you see?" })} showNext={false}/>
      <NarrativeBubble id="cellina-response1-correct" characterSrc={cellinaMicroscope} top="2vh" left="10vw" subText={t("level1_009CellTypeQuestion.response1-correct", { defaultValue: "That's correct! This is an animal cell." })} showNext={true} onClick={() => {dispatch_setDialogCounter(2); dispatch(setBubbleShow({bubbleId: "cellina-response1-correct", show: false}))}}/>
      <NarrativeBubble id="cellina-response1-incorrect" characterSrc={cellinaMicroscope} top="2vh" left="10vw" subText={t("level1_009CellTypeQuestion.response1-incorrect", { defaultValue: "Hm, what organelles do you see? Hover over the cell to see the names of the organelles." })} />
      <NarrativeBubble id="cellina-question2" characterSrc={cellinaMicroscope} top="2vh" left="10vw" subText={t("level1_009CellTypeQuestion.question2", { defaultValue: "How do you know this is an animal cell?" })} showNext={false}/>

      {dialogCounter === 1 && (
        <Paragraph id="hint" top="2vh" right="10vw" >
          {t("level1_009CellTypeQuestion.hint", { defaultValue: "Hint: Use your mouse to see the names of the organelles." })}
        </Paragraph>
      )}

      <div id="content" style={{ width: '100%', height: '25vh', bottom: '0vh', position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {dialogCounter === 1 && (
          <MultipleChoicePrompt
            id="cell-type-question"
            row={true}
            style={{
              width: "110vh",
            }}
            prompt={t("level1_009CellTypeQuestion.prompt", { defaultValue: "What type of cell is this?" })}
            responseKey="level1_009CellTypeQuestion"
            choices={t("level1_009CellTypeQuestion.choices", { returnObjects: true })}
            disableOnSubmit={true}
            onSubmit={(_,index) => {
              console.log("index", index)
              dispatch_setDialogCounter(2)
              dispatch_setSelectedAnswer(index)            
            }}
          />
        )}
        {showWrittenResponse&& (
          <WrittenResponsePrompt
            id="cell-explanation"
            disableOnSubmit={true}
            multiline={true}
            style={{
              width: "110vh",
            }}
            prompt={t("level1_009CellTypeQuestion.explanation_prompt")}
            placeholder={t("level1_009CellTypeQuestion.explanation_placeholder")}
            responseKey="level1_009CellTypeQuestion_explanation"
            onSubmit={(text) => {
              dispatch_setExplanation(text)
              dispatch(setBubbleShow({bubbleId: "player-response", show: true}))
              setTimeout(() => {
                dispatch(setBubbleShow({bubbleId: "lop-speech", show: true}))
              }, 1500)
            }}
          />
        )}
      </div>
    </div>
  )
}

export default Level1_009CellTypeQuestion
