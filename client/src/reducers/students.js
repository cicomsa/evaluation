import {GET_STUDENTS, ADD_STUDENT, REMOVE_STUDENT} from '../actions/index'

export default function (state = [], action) {
  switch (action.type) {
    case GET_STUDENTS:
      return action.payload
    case ADD_STUDENT:  
        return state.concat(action.payload)   
    case REMOVE_STUDENT:
      return state.filter(student => student.id !== action.payload)
    default:
      return state
  }
}