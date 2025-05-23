import { useNavigate, useLocation } from 'react-router-dom'
import { useSpring, animated } from '@react-spring/web'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

import DropImageMap from '../../components/DropImageMap'
import Draggable from '../../components/Draggable'
import Item from '../../components/Item'
import Paragraph from '../../components/Paragraph'

import { setBubbleShow } from '../../helpers/bubbleHelper'
import { navigateTo } from '../../store/slices/appSlice'
import { setPageAttribute, initializePageAttributes, selectPageAttributes } from '../../store/slices/pageSlice'

import NarrativeBubble from '../../components/bubbles/NarrativeBubble'
import SpeechBubble from '../../components/bubbles/SpeechBubble'

import plantCellAlpha from '../../assets/plant-cell1-puzzle/plant-cell1-1024-alpha.png'
import cellinaSmall from '../../assets/cellina1.png'
import puzzleBG from '../../assets/plant-cell1-puzzle/plant-cell1-outlines.png'
import cytoplasm from '../../assets/plant-cell1-puzzle/cytoplasm.png'
import cellmembrane from '../../assets/plant-cell1-puzzle/cell-membrane.png'
import nucleus from '../../assets/plant-cell1-puzzle/nucleus.png'
import mitochondria from '../../assets/plant-cell1-puzzle/mitochondria.png'
import cellwall from '../../assets/plant-cell1-puzzle/cell-wall.png'
import chloroplast from '../../assets/plant-cell1-puzzle/chloroplast.png'

import cytoplasmLayer from '../../assets/plant-cell1-puzzle/cytoplasm-layer.png'
import nucleusLayer from '../../assets/plant-cell1-puzzle/nucleus-layer.png'
import mitochondriaLayer from '../../assets/plant-cell1-puzzle/mitochondria-layer.png'
import cellmembraneLayer from '../../assets/plant-cell1-puzzle/cell-membrane-layer.png'
import cellwallLayer from '../../assets/plant-cell1-puzzle/cell-wall-layer.png'
import chloroplastLayer from '../../assets/plant-cell1-puzzle/chloroplast-layer.png'


import { getPageId } from '../../helpers/locationHelper'


const defaultState = {
  cellmembraneDropArea: "",
  cytoplasmDropArea: "",
  nucleusDropArea: "",
  cellwallDropArea: "",
  chloroplastDropArea: "",
  mitochondriaDropArea: "",
  completed: false
}

const imgStyle = {
  width: "10vh"
}
const bgStyle = {
  position: "absolute",
  width: "100%",
  height: "100%"
}

const speechBubbles = [
  {id:"mitochondriaBubble", top:"55vh", left:"20vh", t:"level1_007PlantCellPuzzle.functions.mitochondria", tdefaultValue:"Mitochondria"},
  {id:"cell-membraneBubble", top:"15vh", left:"-15vh", t:"level1_007PlantCellPuzzle.functions.cell-membrane", tdefaultValue:"Cell Membrane"},
  {id:"cytoplasmBubble", top:"2vh", left:"28vh", t:"level1_007PlantCellPuzzle.functions.cytoplasm", tdefaultValue:"Cytoplasm"},
  {id:"nucleusBubble", top:"40vh", left:"20vh", t:"level1_007PlantCellPuzzle.functions.nucleus", tdefaultValue:"Nucleus"},
  {id:"cell-wallBubble", top:"35vh", left:"-8vh", t:"level1_007PlantCellPuzzle.functions.cell-wall", tdefaultValue:"Cell Wall"},
  {id:"chloroplastBubble", top:"20vh", left:"-3vh", t:"level1_007PlantCellPuzzle.functions.chloroplast", tdefaultValue:"Chloroplast"}
]

const Level1_007PlantCellPuzzle = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const [mouseInput, setMouseInput] = useState({x:0,y:0})

  useEffect(() => {
    dispatch(initializePageAttributes({
      pageId: getPageId(location.pathname),
      props: defaultState
    }))     
  }, [dispatch, location.pathname])

  const {cellmembraneDropArea, 
    cytoplasmDropArea,
    nucleusDropArea, 
    cellwallDropArea,
    chloroplastDropArea,
    mitochondriaDropArea,
    completed
  } = useSelector((state) => 
    selectPageAttributes(state, getPageId(location.pathname), defaultState)
  )

  const dispatch_setDropArea = { 
    "drag-cell-membrane": (dropAreaId) => dispatch(setPageAttribute({pageId: getPageId(location.pathname), key: "cellmembraneDropArea", value: dropAreaId})),
    "drag-cytoplasm": (dropAreaId) => dispatch(setPageAttribute({pageId: getPageId(location.pathname), key: "cytoplasmDropArea", value: dropAreaId})),
    "drag-nucleus": (dropAreaId) => dispatch(setPageAttribute({pageId: getPageId(location.pathname), key: "nucleusDropArea", value: dropAreaId})),
    "drag-cellwall": (dropAreaId) => dispatch(setPageAttribute({pageId: getPageId(location.pathname), key: "cellwallDropArea", value: dropAreaId})),
    "drag-chloroplast": (dropAreaId) => dispatch(setPageAttribute({pageId: getPageId(location.pathname), key: "chloroplastDropArea", value: dropAreaId})),
    "drag-mitochondria": (dropAreaId) => dispatch(setPageAttribute({pageId: getPageId(location.pathname), key: "mitochondriaDropArea", value: dropAreaId}))
  }
  useEffect(() => {
    setTimeout(() => {
      if(!completed){
        dispatch(setBubbleShow({bubbleId: "instructionsBubble", show: true}))
      } else {
        dispatch(setBubbleShow({bubbleId: "instructionsBubble", show: false}))
        dispatch(setBubbleShow({bubbleId: "completedBubble", show: true}))   
      }
    }, 1000)
  }, [dispatch, completed])

  useEffect(() => {
    if( cellmembraneDropArea !== "" && cytoplasmDropArea !== "" && nucleusDropArea !== "" && cellwallDropArea !== "" && chloroplastDropArea !== "" && mitochondriaDropArea !== "") {
      dispatch(setPageAttribute({pageId: getPageId(location.pathname), key: "completed", value: true}))
    }
  }, [dispatch, cellmembraneDropArea, cytoplasmDropArea, nucleusDropArea, cellwallDropArea, chloroplastDropArea, mitochondriaDropArea])

  const handleDrop = ({dropAreaId, id}) => {
   console.log(dropAreaId)
   if(dropAreaId){
    dispatch(setBubbleShow({bubbleId: `${dropAreaId}Bubble`, show: true}))
    dispatch_setDropArea[id](dropAreaId)   
   }
  }

  const handleDrag = (e) => {
    dispatch(setBubbleShow({bubbleId: "chloroplastBubble", show: false}))
    dispatch(setBubbleShow({bubbleId: "cell-wallBubble", show: false}))
    dispatch(setBubbleShow({bubbleId: "mitochondriaBubble", show: false}))
    dispatch(setBubbleShow({bubbleId: "nucleusBubble", show: false}))
    dispatch(setBubbleShow({bubbleId: "cytoplasmBubble", show: false}))
    dispatch(setBubbleShow({bubbleId: "cell-membraneBubble", show: false}))
    setMouseInput(e)
  }

  return (
    <div className="view">
      {/* Title and Instructions */}
      <div style={{
        display: 'block',
        width: '100%',
        height: '20vh',
        margin: '2rem'
      }}>
        
        <Paragraph style={{width: '30%', textAlign: 'center'}}>
          <h1 >{t("level1_007PlantCellPuzzle.title", {defaultValue: "Plant Cell"})}</h1>  
        </Paragraph>
        
        <div style={{display: 'flex', flexDirection: 'row', position: 'absolute', right: '0rem', width: '40%', height: '20vh'}}>
          <NarrativeBubble id="instructionsBubble" showNext={false} top={"0%"} left={"0%"}
            mainText={t("level1_007PlantCellPuzzle.instructions", {defaultValue: "Complete the puzzle to discover the parts of a plant cell."})}
          />
          {!completed && <img src={cellinaSmall} alt="Cellina" style={{position: 'absolute', width: '20vh', zIndex: 3, right:"0%"}} />}
        </div>
      </div>

      <div style={{display: 'flex', flexDirection: 'row',
        position: "absolute",
        left: "40vh",
        top: "10vh",
        width: "80vh",
        height: "80vh",
        zIndex: 1}}>
        {cellmembraneDropArea !== "" && <Item src={cellmembraneLayer} style={bgStyle} />}
        {cytoplasmDropArea !== "" && <Item src={cytoplasmLayer} style={bgStyle} />}
        {nucleusDropArea !== "" && <Item src={nucleusLayer} style={bgStyle} />}
        {cellwallDropArea !== "" && <Item src={cellwallLayer} style={bgStyle} />}
        {chloroplastDropArea !== "" && <Item src={chloroplastLayer} style={bgStyle} />}
        {mitochondriaDropArea !== "" && <Item src={mitochondriaLayer} style={bgStyle} />}
      </div>

      <DropImageMap
        id="plant-cell"
        style={{ 
          position: "absolute",
          left: "40vh",
          top: "10vh",
          width: "80vh",
          height: "80vh",
          zIndex: 2
        }}
        mapSrc={plantCellAlpha}
        imageSrc={puzzleBG}
        showLabels={false}
        labelOnHover={false}
        hoverZoom={false}
        areas={t("plant-cell-image", { returnObjects: true })}
        areaData={t("plant-cell-map-data", { returnObjects: true })}
        onDrop={handleDrop}
        mouseInput={mouseInput}
      >
        {speechBubbles.map((bubble) => (
          <SpeechBubble
            key={bubble.id}
            id={bubble.id}
            showNext={false}
            top={bubble.top}
            left={bubble.left}
            subText={t(bubble.t, { defaultValue: bubble.tdefaultValue })}
          />
        ))}
      </DropImageMap>
      <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "space-between", justifyContent: "space-around", position: "absolute", right: "0vh", top: "30vh", width: "40vh", height: "40vh", zIndex: 3 }}>
        {cellmembraneDropArea === "" && <Draggable id="drag-cell-membrane" dropArea={cellmembraneDropArea} 
          draggable={cellmembraneDropArea === ""} 
          tryDropOn={(areaId) => areaId === 'cell-membrane'}
          onDrop={handleDrop} 
          onDrag={handleDrag}
          > 
          <Item style={imgStyle} src={cellmembrane} />
        </Draggable>}
        {nucleusDropArea === "" && <Draggable id="drag-nucleus" dropArea={nucleusDropArea} 
          draggable={nucleusDropArea === ""} 
          tryDropOn={(areaId) => areaId === 'nucleus'}
          onDrop={handleDrop} 
          onDrag={handleDrag}
          > 
          <Item style={imgStyle} src={nucleus} />
        </Draggable>}
        {cellwallDropArea === "" && <Draggable id="drag-cellwall" dropArea={cellwallDropArea} 
          draggable={cellwallDropArea === ""} 
          tryDropOn={(areaId) => areaId === 'cell-wall'}
          onDrop={handleDrop} 
          onDrag={handleDrag}
          > 
          <Item style={imgStyle} src={cellwall} />
        </Draggable>}
        {chloroplastDropArea === "" && <Draggable id="drag-chloroplast" dropArea={chloroplastDropArea} 
          draggable={chloroplastDropArea === ""} 
          tryDropOn={(areaId) => areaId === 'chloroplast'}
          onDrop={handleDrop}
          onDrag={handleDrag}
          > 
          <Item style={imgStyle} src={chloroplast} />
        </Draggable>}
        {mitochondriaDropArea === "" && <Draggable id="drag-mitochondria" dropArea={mitochondriaDropArea} 
          draggable={mitochondriaDropArea === ""} 
          tryDropOn={(areaId) => areaId === 'mitochondria'}
          onDrop={handleDrop}
          onDrag={handleDrag}
          > 
          <Item style={imgStyle} src={mitochondria} />
        </Draggable>}
        {cytoplasmDropArea === "" && <Draggable id="drag-cytoplasm" dropArea={cytoplasmDropArea} 
          draggable={cytoplasmDropArea === ""} 
          tryDropOn={(areaId) => areaId === 'cytoplasm'}
          onDrop={handleDrop}
          onDrag={handleDrag}
          > 
          <Item style={imgStyle} src={cytoplasm} />
        </Draggable>}
      </div>

      <NarrativeBubble id="completedBubble" showNext={true} bottom={"0%"} right={"0%"}
        mainText={t("level1_007PlantCellPuzzle.completed")}
        onClick={() => dispatch(navigateTo({navigate, path:'/level1/Level1_007PlantCellLabels'}))}
      />
    </div>
  )
}

export default Level1_007PlantCellPuzzle
