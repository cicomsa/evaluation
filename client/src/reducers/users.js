import {ADD_USER} from '../actions/users'

/*
The state will contain the users in an object with the game ID as key
*/

export default (state = null, {type, payload}) => {
  switch (type) {
    case ADD_USER:
      return {
        ...state,
        [payload.id]: payload
      }

    default:
      return state
  }
}
