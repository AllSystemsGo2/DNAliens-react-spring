import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  characters: {}  // Will store character states by their IDs
};

const movableCharacterSlice = createSlice({
  name: 'movableCharacters',
  initialState,
  reducers: {
    initializeCharacter: (state, action) => {
      const { id, bottom, left, right, zIndex } = action.payload;
      if (!state.characters[id]) {
        state.characters[id] = {
          bottom: bottom || '10vh',
          left: left || '5vh',
          right,
          zIndex: zIndex || 2,
          prevLeft: left || '5vh',
          prevRight: right,
          currentLeft: left || '5vh',
          currentRight: right,
          currentBottom: bottom || '10vh',
        };
      } else {
        movableCharacterSlice.actions.updateCharacterPosition(state, action)
      }
    },
    updateCharacterPosition: (state, action) => {
      const { id, left, right, bottom, zIndex } = action.payload;
      const character = state.characters[id];
      if (!character) return;

      if (left !== undefined) {
        character.prevLeft = character.currentLeft;
        character.currentLeft = left;
      }
      if (right !== undefined) {
        character.prevRight = character.currentRight;
        character.currentRight = right;
      }
      if (bottom !== undefined) {
        character.prevBottom = character.currentBottom;
        character.currentBottom = bottom;
      }
      if (zIndex !== undefined) {
        character.zIndex = zIndex;
      }
    },
    resetCharacter: (state, action) => {
      const { id } = action.payload;
      delete state.characters[id];
    }
  }
});

export const { initializeCharacter, updateCharacterPosition, resetCharacter } = movableCharacterSlice.actions;

export const selectCharacterById = (state, id) => state.movableCharacters.characters[id];

export default movableCharacterSlice.reducer;
