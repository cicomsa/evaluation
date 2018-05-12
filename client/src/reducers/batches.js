import {GET_BATCHES, ADD_BATCH, REMOVE_BATCH, UPDATE_BATCH} from '../actions/index'

export default function (state = [], action) {
  switch (action.type) {
    case GET_BATCHES:
      return action.payload
    case ADD_BATCH:
      return state.concat(action.payload)
    case REMOVE_BATCH:
      return state.filter(batch => batch.id !== action.payload)
    case UPDATE_BATCH:
     return state.map(batch => {
      if (batch.id === action.payload.id) {
         return { ...batch, ...action.payload }
       }
       else return action.payload
         })
    default:
      return state
  }
}