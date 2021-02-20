import axios from 'axios';
import Router from 'next/router';
import { all, fork, put, takeLatest, delay, call } from 'redux-saga/effects';
import { 
    LOG_IN_ADMIN_REQUEST, LOG_IN_ADMIN_SUCCESS, LOG_IN_ADMIN_FAILURE,
    CHANGE_AVATAR_FAILURE, CHANGE_AVATAR_REQUEST, CHANGE_AVATAR_SUCCESS, 
    LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS,
    LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS,
} from '../reducers/user';

// function logInAPI(data){
//     // 통신 작업할 것
// };

function* logIn(action){
    try{
        yield put({
            type: LOG_IN_SUCCESS,
            data: action.data
        });

        yield Router.replace('/');

    }catch(err){
        console.error(err);
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data
        })
    }
}

function* watchLogIn(){ 
    yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* logOut(){
    try{

        yield put({
            type: LOG_OUT_SUCCESS
        });

        yield Router.replace('/login');

    }catch(err){
        console.error(err);
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data
        })
    }
}

function* watchLogOut(){ 
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function adminLogInAPI(data){
    return axios.post('/admin/login', data);
};

function* adminLogIn(action){
    try{
        const result = yield call(adminLogInAPI, action.data);
        yield put({
            type: LOG_IN_ADMIN_SUCCESS,
            data: result.data
        });

        yield Router.replace('/');

    }catch(err){
        console.error(err);
        yield put({
            type: LOG_IN_ADMIN_FAILURE,
            error: err.response.data
        })
    }
}


function* watchAdminLogIn(){ 
    yield takeLatest(LOG_IN_ADMIN_REQUEST, adminLogIn);
}

export default function* userSaga(){
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchAdminLogIn),
    ]);
}

// TODO
// API 통신