import { useSpring, animated } from '@react-spring/web'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setPageAttribute, initializePageAttributes, selectPageAttributes } from '../../store/slices/pageSlice'


import spoon1 from '../../assets/spoon.png'
import slide1 from '../../assets/blank-slide1.png'

import Item from '../../components/Item'
import Draggable from '../../components/Draggable'
import DropArea from '../../components/DropArea'

const defaultAttributes = {}

const Level1_004SlidePrep = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(initializePageAttributes({
      pageId: "slidePrep",
      props: defaultAttributes
    }))
  }, [dispatch])

  const pageAttributes = useSelector((state) => 
    selectPageAttributes(state, "slidePrep", defaultAttributes)
  )

  return (
    <div className="view">
      <Draggable id="drag1" style={{ position: "absolute", left: "5vw", top: "25vh", width: "45vh", height: "45vh" }} dropArea="" tryDropOn={(areaId) => areaId === 'area1'}>
        <Item style={{ transform: "rotateZ(-120deg) scaleY(-1) rotateY(25deg)" }} src={spoon1} />
      </Draggable>
      <DropArea id="area1" 
        style={{ position: "absolute", right: "25vw", top: "45vh", width: "25vh", height: "25vh"}}
        onDrop={(draggableId) => console.log(`${draggableId} was dropped!`)}>
        <Item style={{ transform: "rotateZ(-90deg) rotateY(45deg)" }} src={slide1} />
      </DropArea>
    </div>
  )
}

export default Level1_004SlidePrep
