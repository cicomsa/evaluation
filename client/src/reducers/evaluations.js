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
     return state.map(evaluation => {
      if (evaluation.id === action.payload.id) {
         return { ...evaluation, ...action.payload }
       }
       else return action.payload
         })
    default:
      return state
  }
}