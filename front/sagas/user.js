import axios from 'axios';
import Router from 'next/router';
import { all, fork, put, takeLatest, delay, call } from 'redux-saga/effects';
import { 
    // [D] 관리자
    LOAD_ADMIN_INFO_REQUEST, LOAD_ADMIN_INFO_SUCCESS, LOAD_ADMIN_INFO_FAILURE,
    LOG_IN_ADMIN_REQUEST, LOG_IN_ADMIN_SUCCESS, LOG_IN_ADMIN_FAILURE,
    LOG_OUT_ADMIN_REQUEST, LOG_OUT_ADMIN_SUCCESS, LOG_OUT_ADMIN_FAILURE,
    // [D] 사용자
    LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS,
    LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS,
} from '../reducers/user';

// [D] 사용자 로그인
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

// [D] 사용자 로그아웃
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

// [D] 관리자 정보 가져오기
function loadAdminInfoAPI(){
    return axios.get('/admin');
};

function* loadAdminInfo(){
    try{
        const result = yield call(loadAdminInfoAPI);
        yield put({
            type: LOAD_ADMIN_INFO_SUCCESS,
            data: result.data
        });

    }catch(err){
        console.error(err);
        yield put({
            type: LOAD_ADMIN_INFO_FAILURE,
            error: err.response.data
        })
    }
}

function* watchLoadAdminInfo(){ 
    yield takeLatest(LOAD_ADMIN_INFO_REQUEST, loadAdminInfo);
}

// [D] 관리자 로그인
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
        alert(err.response.data);
        
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

// [D] 관리자 로그아웃
function adminLogoutAPI(data){
    return axios.post('/admin/logout', data);
};

function* adminLogout(action){
    try{
        yield call(adminLogoutAPI, action.data);

        yield put({
            type: LOG_OUT_ADMIN_SUCCESS
        });

        yield Router.replace('/login');

    }catch(err){
        console.error(err);

        yield put({
            type: LOG_OUT_ADMIN_FAILURE,
            error: err.response.data
        })
    }
}

function* watchAdminLogout(){ 
    yield takeLatest(LOG_OUT_ADMIN_REQUEST, adminLogout);
}


export default function* userSaga(){
    yield all([
        // [D] 사용자
        fork(watchLogIn),
        fork(watchLogOut),

        // [D] 관리자
        fork(watchLoadAdminInfo),
        fork(watchAdminLogIn),
        fork(watchAdminLogout),
    ]);
}