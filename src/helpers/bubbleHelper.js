
import { selectPageAttributes, setPageAttribute } from '../store/slices/pageSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const setBubbleShow = createAsyncThunk(
  'page/setBubbleShow',
  async ({pageId, bubbleId, show}, {getState, dispatch }) => {
    const payload = {pageId: `${pageId ?? getState().app.pageId}:${bubbleId}`, key: 'show', value:show};
    return dispatch(setPageAttribute(payload))
  }
)

export const selectBubbleShowAttribute = ({state, pageId, bubbleId, defaultValue}) => selectPageAttributes(state, `${pageId ?  (pageId) : (state.app.pageId)}:${bubbleId}`, {'show':defaultValue})

