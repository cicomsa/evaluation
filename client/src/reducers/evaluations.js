import {GET_EVALUATIONS, ADD_EVALUATION, REMOVE_EVALUATION, UPDATE_EVALUATION} from '../actions/index'

export default function (state = [], action) {
  switch (action.type) {
    case GET_EVALUATIONS:
      return action.payload
    case ADD_EVALUATION: 
        return state.concat(action.payload)   
    case REMOVE_EVALUATION:
      return state.filter(evaluation => evaluation.id !== action.payload)
    case UPDATE_EVALUATION:
     return [...state,...action.payload]
    default:
      return state
  }
}