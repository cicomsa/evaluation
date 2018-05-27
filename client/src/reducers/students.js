import {GET_STUDENTS, ADD_STUDENT, REMOVE_STUDENT} from '../actions/index'

export default function (state = [], {type,payload}) {
  switch (type) {
    case GET_STUDENTS: 
      return payload
    case ADD_STUDENT:  
        return state.concat(payload)
    case REMOVE_STUDENT:
      return state.filter(student => student.id !== payload)
    default:
      return state
  }
}