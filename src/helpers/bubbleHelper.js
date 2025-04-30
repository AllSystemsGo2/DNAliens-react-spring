
import { setPageAttribute } from '../store/slices/pageSlice';

export const setBubbleShow = (pageId, bubbleId, show) => setPageAttribute({pageId: `${pageId}:${bubbleId}`, key: 'show', value: show })
