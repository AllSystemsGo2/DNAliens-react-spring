import { useNavigate, useLocation } from 'react-router-dom'
import { useSpring, animated } from '@react-spring/web'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

import DropImageMap from '../../components/DropImageMap'
import Draggable from '../../components/Draggable'
import Item from '../../components/Item'

import { setBubbleShow } from '../../helpers/bubbleHelper'
import { navigateTo } from '../../store/slices/appSlice'
import { setPageAttribute, initializePageAttributes, selectPageAttributes } from '../../store/slices/pageSlice'

import NarrativeBubble from '../../components/bubbles/NarrativeBubble'
import SpeechBubble from '../../components/bubbles/SpeechBubble'

import animalCellAlpha from '../../assets/animal-cell1-1024-alpha.png'

import puzzleBG from '../../assets/animal-cell1-puzzle/puzzle-bg.png'
import cytoplasm from '../../assets/animal-cell1-puzzle/cytoplasm.png'
import cellmembrane from '../../assets/animal-cell1-puzzle/cell-membrane.png'
import nucleolus from '../../assets/animal-cell1-puzzle/nucleolus.png'
import lysosome from '../../assets/animal-cell1-puzzle/lysosome.png'
import mitochondria from '../../assets/animal-cell1-puzzle/mitocondria.png'


import { getPageId } from '../../helpers/locationHelper'


const labelPositions = {
  "Cell Membrane": { bottom: '5%', left: '50%', transform: 'translate(-50%, -50%)' },
  "Nucleolus": { top: '40%', left: '50%', transform: 'translate(-50%, -50%)' },
  "Mitochondria": { top: '45%', left: '20%', transform: 'translate(-50%, -50%)' },
  "Lysosome": { top: '22%', left: '35%', transform: 'translate(-50%, -50%)' },
  "Cytoplasm": { top: '20%', left: '51%', transform: 'translate(-50%, -50%)' },
  // Add positions for other areas
}

const defaultState = {
  cellmembraneDropArea: "",
  cytoplasmDropArea: "",
  nucleolusDropArea: "",
  lysosomeDropArea: "",
  mitochondriaDropArea: ""
}

const imgStyle = {
  width: "10vh",
  // height: "10vh",
  // objectFit: "cover"
}

const Level1_007AnimalCellPuzzle = () => {
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
    nucleolusDropArea, 
    lysosomeDropArea,
    mitochondriaDropArea
  } = useSelector((state) => 
    selectPageAttributes(state, getPageId(location.pathname), defaultState)
  )
  const handleDrop = ({dropAreaId}) => {
   console.log(dropAreaId) 
  }

  return (
    <div className="view">
      <DropImageMap
        id="animal-cell"
        style={{ 
          position: "absolute",
          left: "40vh",
          top: "10vh",
          width: "80vh",
          height: "80vh",
          zIndex: 1
        }}
        mapSrc={animalCellAlpha}
        imageSrc={puzzleBG}
        showLabels={false}
        labelPositions={labelPositions}
        labelOnHover={false}
        hoverZoom={false}
        areas={t("animal-cell-image", { returnObjects: true })}
        areaData={t("animal-cell-map-data", { returnObjects: true })}
        onDrop={handleDrop}
        mouseInput={mouseInput}
      />

      <div style={{display: "flex", flexDirection: "column", alignItems: "space-between", justifyContent: "space-around", position: "absolute", right: "20vh", top: "10vh", width: "20vh", height: "80vh", zIndex: 2 }}>
        <Draggable id="drag-cell-membrane" dropArea={cellmembraneDropArea} 
          draggable={cellmembraneDropArea === ""} 
          tryDropOn={(areaId) => areaId === 'cell-membrane'}
          onDrop={handleDrop} 
          onDrag={(e) => setMouseInput(e)}
          > 
          <Item style={imgStyle} src={cellmembrane} />
        </Draggable>
        <Draggable id="drag-nucleolus" dropArea={nucleolusDropArea} 
          draggable={nucleolusDropArea === ""} 
          tryDropOn={(areaId) => areaId === 'nucleolus'}
          onDrop={handleDrop} 
          onDrag={(e) => setMouseInput(e)}
          > 
          <Item style={imgStyle} src={nucleolus} />
        </Draggable>
        <Draggable id="drag-lysosome" dropArea={lysosomeDropArea} 
          draggable={lysosomeDropArea === ""} 
          tryDropOn={(areaId) => areaId === 'lysosome'}
          onDrop={handleDrop} 
          onDrag={(e) => setMouseInput(e)}
          > 
          <Item style={imgStyle} src={lysosome} />
        </Draggable>
        <Draggable id="drag-mitochondria" dropArea={mitochondriaDropArea} 
          draggable={mitochondriaDropArea === ""} 
          tryDropOn={(areaId) => areaId === 'mitochondria'}
          onDrop={handleDrop}
          onDrag={(e) => setMouseInput(e)}
          > 
          <Item style={imgStyle} src={mitochondria} />
        </Draggable>
        <Draggable id="drag-cytoplasm" dropArea={cytoplasmDropArea} 
          draggable={cytoplasmDropArea === ""} 
          tryDropOn={(areaId) => areaId === 'cytoplasm'}
          onDrop={handleDrop}
          onDrag={(e) => setMouseInput(e)}
          > 
          <Item style={imgStyle} src={cytoplasm} />
        </Draggable>
      </div>
    </div>
  )
}

export default Level1_007AnimalCellPuzzle
