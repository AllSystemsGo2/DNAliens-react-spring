import { useSpring, animated } from '@react-spring/web'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setPageAttribute, initializePageAttributes, selectPageAttributes } from '../../store/slices/pageSlice'

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
      
    </div>
  )
}

export default Level1_004SlidePrep
