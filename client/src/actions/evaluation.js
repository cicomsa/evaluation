import * as request from 'superagent'
import { GET_EVALUATION, REMOVE_EVALUATION, UPDATE_EVALUATION } from './index'
import {baseUrl} from '../constants'

export const fetchEvaluation = (evaluationId) => (dispatch) => {
  request
    .get(`${baseUrl}/evaluations/${evaluationId}`)
    .then(response => dispatch({
      type: GET_EVALUATION,
      payload: response.body
    }))
    .catch(err => console.log(err))
  }

export const deleteEvaluation = (evaluationId) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
  .delete(`${baseUrl}/evaluations/${evaluationId}`)
  .set('Authorization', `Bearer ${jwt}`)
  .send(evaluationId)
  .then(response => dispatch({
    type: REMOVE_EVALUATION,
    payload: evaluationId
  }))
  .catch(err => console.log(err))
  }

export const updateEvaluation = (evaluationId, updates) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .put(`${baseUrl}/evaluations/${evaluationId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(updates)
    .then(response => dispatch({
      type: UPDATE_EVALUATION,
      payload: response.body
    }))
    .catch(err => console.log(err))
}
