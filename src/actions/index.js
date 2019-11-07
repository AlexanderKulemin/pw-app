import { LOGOUT, HIDE_ERROR_MESSAGE, REPEAT_TRANSACTION, FILTER_BY_DATE, CLEAR_FILTER } from './actionTypes'
import {createAccountService, loginService, getCurrentUserService, getListUsersService, sendTransactionService, getTransHistoryServive, getRecentTransServive} from '../services';


export const create = value => {
  return (dispatch, getState) => {
    createAccountService(dispatch, getState, value);
  }
}

export const login = value => {
  return (dispatch, getState) => {
    loginService(dispatch, getState, value);
  }
}

export const getCurrentUser = value => {
  return (dispatch, getState) => {
    getCurrentUserService(dispatch, getState)
  }
}

export const logOut = value => {
  return dispatch => {
    dispatch({ type: LOGOUT})
  }
}

export const getListUsers = value => {
  return dispatch => {
    getListUsersService(dispatch, value);
  }
}

export const sendTransaction = value => {
  return dispatch => {
    sendTransactionService(dispatch, value);
  }
}

export const getTransHistory = data => {
  return dispatch => {
    getTransHistoryServive(dispatch, data);
  }
}

export const getRecentTrans = data => {
  return dispatch => {
    getRecentTransServive(dispatch, data);
  }
}

export const repeatTransaction = data => {
  return dispatch => {
    const obj = {username: data.username, amount: Math.abs(data.amount)}

    dispatch({
      type: REPEAT_TRANSACTION,
      payload: obj
    })
  }
}

export const hideMessage = () => {
  return dispatch => {
    dispatch({
      type: HIDE_ERROR_MESSAGE
    })
  }
}

export const filteredTrans = (value) => dispatch => {
  dispatch({
    type: FILTER_BY_DATE,
    payload: value
  })
}

export const clearFilter = (value) => dispatch => {
  dispatch({
    type: CLEAR_FILTER
  })
}