import {GET_EVALUATION, UPDATE_EVALUATION} from '../actions/index'

export default function (state = null, {type, payload}) {
  switch (type) {
    case GET_EVALUATION:
      return payload
    case UPDATE_EVALUATION:
      return {...state,
        ...payload}

    default:
      return state
  }
}
