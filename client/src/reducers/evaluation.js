import {GET_EVALUATION, UPDATE_EVALUATION} from '../actions/index'

export default function (state = null, action) {
  switch (action.type) {
    case GET_EVALUATION:
      return action.payload
    case UPDATE_EVALUATION:
      return {...state,
        ...action.payload}

    default:
      return state
  }
}
