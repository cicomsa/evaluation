import { ADD_BATCH, GET_BATCHES } from './index' 
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
