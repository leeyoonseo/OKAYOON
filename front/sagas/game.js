import axios from 'axios';
import { all, fork, put, takeLatest, delay, call } from 'redux-saga/effects';

import { 
    LOAD_GAME_REQUEST, LOAD_GAME_SUCCESS, LOAD_GAME_FAILURE, 
    ADD_GAME_REQUEST, ADD_GAME_SUCCESS, ADD_GAME_FAILURE, 
} from '../reducers/game';

// [D] 특정 게임 데이터 가져오기
function loadGameAPI(data){
    return axios.get(`/game/${data}`);
};

function* loadGame(action){
    try{
        const result = yield call(loadGameAPI, action.data);
        
        yield put({
            type: LOAD_GAME_SUCCESS,
            data: result.data
        });

    }catch(err){
        console.error(err);
        yield put({
            type: LOAD_GAME_FAILURE,
            error: err.response.data
        })
    }
}

function* watchLoadGame(){
    yield takeLatest(LOAD_GAME_REQUEST, loadGame);
}

// [D] 특정 게임 데이터 추가하기
function addGameAPI(data){
    return axios.post(`/game/${data.gameName}`, data);
};

function* addGame(action){
    try{
        const result = yield call(addGameAPI, action.data);
        yield put({
            type: ADD_GAME_SUCCESS,
            data: result.data
        });

    }catch(err){
        console.error(err);
        yield put({
            type: ADD_GAME_FAILURE,
            error: err.response.data
        })
    }
}

function* watchAddGame(){ 
    yield takeLatest(ADD_GAME_REQUEST, addGame);
}

export default function* gameSaga(){
    yield all([
        // [D] 게임
        fork(watchLoadGame),
        fork(watchAddGame),
    ]);
}