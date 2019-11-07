import axios from 'axios';
import {LOGIN, LOGOUT, SET_CURRENT_USER, GET_USERS, SET_BALANCE, GET_TRANS_HISTORY, SHOW_ERROR_MESSAGE, GET_RECENT_TRANS} from '../actions/actionTypes';

const baseUrl = 'http://193.124.114.46:3001';
const reg = `${baseUrl}/users`;
const auth = `${baseUrl}/sessions/create`;
const currentUser = `${baseUrl}/api/protected/user-info`;
const userList = `${baseUrl}/api/protected/users/list`;
const transaction = `${baseUrl}/api/protected/transactions`;

export const createAccountService = (dispatch, getState, data) => {
    axios.post(reg, 
        {username: data.name, password: data.password, email: data.email})
        .then(response => {
            localStorage.setItem("token", response.data.id_token);
            dispatch({type: LOGIN, payload: response.data.id_token})
            getCurrentUserService(dispatch, getState);
        })
        .catch(error => {
            dispatch({
                type: SHOW_ERROR_MESSAGE,
                payload: error.response.data
            })
        });
}

export const loginService = (dispatch, getState, data) => {
    axios.post(auth, data)
        .then(response => {
            localStorage.setItem("token", response.data.id_token);
            dispatch({type: LOGIN, payload: response.data.id_token});
            getCurrentUserService(dispatch, getState);
        })
        .catch(error => {
            dispatch({
                type: SHOW_ERROR_MESSAGE,
                payload: error.response.data
            })
            dispatch({
                type: LOGOUT
            })
        });
}

export const getCurrentUserService = (dispatch, getState) => {
    axios.defaults.headers.common['Authorization'] = `bearer ${getState().token}`;
    axios.get(currentUser, {headers: {'Authorization': "bearer " + getState().token}})
        .then(response => {
            dispatch({
                type: SET_CURRENT_USER,
                payload: response.data.user_info_token
            })
        })
        .catch(error => console.log(error.response))
}

export const getListUsersService = (dispatch, string) => {
    axios.post(userList, {filter: string})
        .then(response => {
            dispatch({
                type: GET_USERS,
                payload: response.data
            })
        })
        .catch(error => console.log(error))
}

export const sendTransactionService = (dispatch, data) => {
    axios.post(transaction, data)
        .then(response => {
            dispatch({
                type: SET_BALANCE,
                payload: response.data.trans_token.balance
            })

            getRecentTransServive(dispatch)
        })
        .catch(error => {
            dispatch({
                type: SHOW_ERROR_MESSAGE,
                payload: error.response.data
            })}
        )
}

export const getTransHistoryServive = (dispatch, data) => {
    axios.get(transaction)
        .then(response => {
            dispatch({
                type: GET_TRANS_HISTORY,
                payload: response.data.trans_token
            })
        })
        .catch(error => console.log(error))
}

export const getRecentTransServive = (dispatch) => {
    axios.get(transaction)
        .then(response => {
            dispatch({
                type: GET_RECENT_TRANS,
                payload: response.data.trans_token
            })
        })
        .catch(error => console.log(error))
} 