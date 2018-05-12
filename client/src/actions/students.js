import { ADD_STUDENT, GET_STUDENTS } from './index'
import * as request from 'superagent'
import {baseUrl} from '../constants'

export const getStudents = () => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .get(`${baseUrl}/students/`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response => dispatch({
      type: GET_STUDENTS,
      payload: response.body.students
    }))
    .catch(err => console.log(err))

}

export const addStudent = (student, pict) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .post(`${baseUrl}/students`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(student)
    .then(response => dispatch({
      type: ADD_STUDENT,
      payload: response.body
    }))
}
