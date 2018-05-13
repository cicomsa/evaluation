import {GET_STUDENT, UPDATE_STUDENT} from '../actions/index'

export default function (state = null, action) {
  switch (action.type) {
    case GET_STUDENT:
      return action.payload
    case UPDATE_STUDENT:
      return {...state,
        ...action.payload}

    default:
      return state
  }
}
