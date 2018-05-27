import {ADD_BATCH, GET_BATCHES, GET_BATCH, REMOVE_BATCH, UPDATE_BATCH} from './index' 
import * as request from 'superagent'
import {baseUrl} from '../constants'

export const getBatches = () => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt
  
  request
    .get(`${baseUrl}/batches/`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(response => dispatch({
      type: GET_BATCHES,
      payload: response.body.batches
    }))
    .catch(err => console.log(err))

}

export const addBatch = (batch) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .post(`${baseUrl}/batches`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(batch)
    .then(response => dispatch({
      type: ADD_BATCH,
      payload: response.body
    }))
}

export const fetchBatch = (batchId) => (dispatch) => {
  request
    .get(`${baseUrl}/batches/${batchId}`)
    .then(response => dispatch({
      type: GET_BATCH,
      payload: response.body
    }))
    .catch(err => console.log(err))
  }

export const deleteBatch = (batchId) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
  .delete(`${baseUrl}/batches/${batchId}`)
  .set('Authorization', `Bearer ${jwt}`)
  .send(batchId)
  .then(response => dispatch({
    type: REMOVE_BATCH,
    payload: batchId
  }))
  .catch(err => console.log(err))
  }

export const updateBatch = (batchId, updates) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  request
    .put(`${baseUrl}/batches/${batchId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(updates)
    .then(response => dispatch({
      type: UPDATE_BATCH,
      payload: response.body
    }))
    .catch(err => console.log(err))
}
