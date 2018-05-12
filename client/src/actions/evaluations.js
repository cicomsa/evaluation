import { ADD_EVALUATION, GET_EVALUATIONS } from './index' 
import * as request from 'superagent'
import {baseUrl} from '../constants'
 

export const getEvaluations = () => (dispatch,getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt
  request
    .get(`${baseUrl}/evaluations/`)
    .then(response => dispatch({
      type: GET_EVALUATIONS,
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
