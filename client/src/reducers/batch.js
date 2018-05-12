import {GET_BATCH} from '../actions/index'

export default function (state = null, action) {
  switch (action.type) {
    case GET_BATCH:
      return action.payload

    default:
      return state
  }
}
