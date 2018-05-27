import {GET_BATCH_EVALUATIONS, GET_STUDENT_EVALUATIONS, 
  ADD_EVALUATION, REMOVE_EVALUATION} from '../actions/index'

export default function (state = [], {type,payload}) {
  switch (type) {
    case GET_BATCH_EVALUATIONS:
      return payload
  case GET_STUDENT_EVALUATIONS:
    return payload
    case ADD_EVALUATION: 
        return state.concat(payload)   
    case REMOVE_EVALUATION:
      return state.filter(evaluation => evaluation.id !== payload)
    default:
      return state
  }
}