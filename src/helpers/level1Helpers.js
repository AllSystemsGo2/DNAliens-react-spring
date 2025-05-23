/**
 * upon completion of either Level1_007AnimalCellLabels or Level1_007PlantCellLabels, 
 * the user will be asked looped back to Level1_006LearnCells 
 * OR 
 * the user will be progressed to Level1_008Quiz 
 * 
 * Based on the PageState, the selector function will return the path to navigate to
 * @returns path
 */

import { selectPageAttributes } from "../store/slices/pageSlice"
import { getPageId } from "./locationHelper"

export function selectorFunction_decisionSplit_Completed007(state) {
  if(!selectPageAttributes(state, getPageId("/level1/Level1_007AnimalCellLabels"), {completed: false}).completed ||
     !selectPageAttributes(state, getPageId("/level1/Level1_007PlantCellLabels"), {completed: false}).completed) {
    return "/level1/Level1_006LearnCells"
  }

  return "/level1/Level1_008Quiz"
}
