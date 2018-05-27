import { 
  ADD_EVALUATION, GET_BATCH_EVALUATIONS, GET_STUDENT_EVALUATIONS, 
  GET_EVALUATION,REMOVE_EVALUATION, UPDATE_EVALUATION } from './index'  
import * as request from 'superagent'
import {baseUrl} from '../constants'
 

export const getBatchEvaluations = (batchId) => (dispatch,getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt
  request
    .get(`${baseUrl}/batchevaluations/${batchId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response => dispatch({
      type: GET_BATCH_EVALUATIONS,
      payload: response.body
    }))
    .catch(err => console.log(err))

}

export const getStudentEvaluations = (studentId) => (dispatch,getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt
  request
    .get(`${baseUrl}/studentevaluations/${studentId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response => dispatch({
      type: GET_STUDENT_EVALUATIONS,
      payload: response.body
    }))
    .catch(err => console.log(err))

}

export const addEvaluation = (evaluation) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .post(`${baseUrl}/evaluations`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(evaluation)
    .then(response => dispatch({
      type: ADD_EVALUATION,
      payload: response.body
    }))
}

export const fetchEvaluation = (evaluationId) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .get(`${baseUrl}/evaluations/${evaluationId}`)
    .set('Authorization', `Bearer ${jwt}`)
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