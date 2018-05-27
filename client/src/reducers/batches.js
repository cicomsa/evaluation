import {GET_BATCHES, ADD_BATCH, REMOVE_BATCH} from '../actions/index'

export default function (state = [], {type, payload}) {
  switch (type) {
    case GET_BATCHES:
      return payload
    case ADD_BATCH:
      return state.concat(payload)
    case REMOVE_BATCH:
      return state.filter(batch => batch.id !== payload) 
    default:
      return state
  }
}