import Router from 'next/router';
import { all, fork, put, takeLatest, delay } from 'redux-saga/effects';
import { 
    CHANGE_AVATAR_FAILURE, CHANGE_AVATAR_REQUEST, CHANGE_AVATAR_SUCCESS, 
    LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS,
} from '../reducers/user';

function logInAPI(data){
    // 통신 작업할 것
};

function* logIn(action){
    try{
        // const result = yield call(logInAPI, action.data);
        // 임시
        yield delay(1000);

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

export default function* userSaga(){
    yield all([
        fork(watchLogIn),
    ]);
}

// TODO
// API 통신