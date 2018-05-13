import {GET_BATCH, UPDATE_BATCH} from '../actions/index'

export default function (state = null, action) {
  switch (action.type) {
    case GET_BATCH:
      return action.payload
    case UPDATE_BATCH:
      return {...state,
      ...action.payload}

    default:
      return state
  }
}
