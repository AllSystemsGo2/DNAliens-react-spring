
import { setPageAttribute, selectPageAttributes } from '../../store/slices/pageSlice';

export const setBubbleShow = (pageId, bubbleId, show) => setPageAttribute({pageId: `${pageId}:${bubbleId}`, key: 'show', value: show })
export const selectBubbleShowAttribute = (state, pageId, bubbleId, defaultValue) => { return selectPageAttributes(state, `${pageId}:${bubbleId}`, {'show':defaultValue})['show'] }
