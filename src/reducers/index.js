import {
  LOGIN, 
  LOGOUT, 
  SET_CURRENT_USER, 
  GET_USERS, 
  SET_BALANCE, 
  GET_TRANS_HISTORY, 
  SHOW_ERROR_MESSAGE, 
  HIDE_ERROR_MESSAGE, 
  GET_RECENT_TRANS, 
  REPEAT_TRANSACTION, 
  FILTER_TRANSACTION, 
  CLEAR_FILTER } from "../actions/actionTypes";

const initialState = {
  token: localStorage.token,
  isAuth: false,
  user: {},
  users: [],
  transactions: [],
  recentTrans: [],
  repeatTrans: {},
  isFilter: false,
  transFiltered: [],

  errors: {
    isShow: false,
    message: ''
  }
};

function reduxStore (state = initialState, action) {
  switch (action.type) {
    // case CREATE: {
    //   return action.payload;
    // }
    
    case LOGIN: {
      return {...state, isAuth: true, token: action.payload};
    }
    
    case LOGOUT: {
      localStorage.removeItem("token");
      return {...state, user: {}, token: null, isAuth: false}
    }

    case SET_CURRENT_USER: {
      return {...state, user: action.payload, isAuth: true}
    }

    case GET_USERS: {
        return {...state, users: action.payload}
    }

    case SET_BALANCE: {
      return {...state, user: {...state.user, balance: action.payload}}
    }

    case GET_TRANS_HISTORY: {
      return {...state, transactions: action.payload.reverse()}
    }

    case GET_RECENT_TRANS: {
      return {...state, recentTrans: action.payload.filter(item => item.amount < 0).reverse().slice(0, 5)}
    }

    case SHOW_ERROR_MESSAGE: {
      return {...state, errors: {isShow: true, message: action.payload}}
    }

    case HIDE_ERROR_MESSAGE: {
      return {...state, errors: {isShow: false, message:''}}
    }

    case REPEAT_TRANSACTION: {
      return {...state, repeatTrans: action.payload}
    }

    case FILTER_TRANSACTION: {
      return {...state, isFilter: true, transFiltered: state.transactions.filter(item => {
        const date = item.date.slice(0, item.date.indexOf(','));
        for(let key in action.payload){
          if(!!action.payload[key]){
            if(key === 'date' && date !== action.payload[key]) {
              return false;
            }

            if(key === 'username' && item[key].indexOf(action.payload[key]) === -1 ) {
              return false
            }

            if(key === 'amount' && action.payload[key] === 'received' && item[key] <= 0) {
              return false;
            }

            if(key === 'amount' && action.payload[key] === 'sent' && item[key] >= 0) {
              return false;
            }
          }
        }

        return true;
      })}
    }

    case CLEAR_FILTER: {
      return{...state, isFilter: false, transFiltered: []}
    }

    default:
      return state;
  }
}

export default reduxStore;