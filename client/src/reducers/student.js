import {GET_STUDENT, UPDATE_STUDENT} from '../actions/index'

export default function (state = null, {type, payload}) {
  switch (type) {
    case GET_STUDENT:
      return payload
    case UPDATE_STUDENT:
      return {...state,
        ...payload}

    default:
      return state
  }
}
