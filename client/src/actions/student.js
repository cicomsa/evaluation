import * as request from 'superagent'
import { GET_STUDENT, REMOVE_STUDENT, UPDATE_STUDENT } from './index'
import {baseUrl} from '../constants'

export const fetchStudent = (studentId,) => (dispatch) => {
  request
    .get(`${baseUrl}/students/${studentId}`)
    .then(response => dispatch({
      type: GET_STUDENT,
      payload: response.body
    }))
    .catch(err => console.log(err))
  }

export const deleteStudent = (studentId) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
  .delete(`${baseUrl}/students/${studentId}`)
  .set('Authorization', `Bearer ${jwt}`)
  .send(studentId)
  .then(response => dispatch({
    type: REMOVE_STUDENT,
    payload: studentId
  }))
  .catch(err => console.log(err))
  }

export const updateStudent = (studentId, updates) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .put(`${baseUrl}/students/${studentId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(updates)
    .then(response => dispatch({
      type: UPDATE_STUDENT,
      payload: response.body
    }))
    .catch(err => console.log(err))
}
