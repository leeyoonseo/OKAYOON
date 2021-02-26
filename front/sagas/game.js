import axios from 'axios';
import { all, fork, put, takeLatest, delay, call } from 'redux-saga/effects';
import { 
    LOAD_GAMELIST_REQUEST, LOAD_GAMELIST_SUCCESS, LOAD_GAMELIST_FAILURE, 
    LOAD_GAME_REQUEST, LOAD_GAME_SUCCESS, LOAD_GAME_FAILURE, 
} from '../reducers/game';

// [D] 게임 리스트 가져오기
function loadGameListAPI(){
    return axios.get('/game/list');
};

function* loadGameList(){
    try{
        const result = yield call(loadGameListAPI);
        yield put({
            type: LOAD_GAMELIST_SUCCESS,
            data: result.data
        });

    }catch(err){
        console.error(err);
        yield put({
            type: LOAD_GAMELIST_FAILURE,
            error: err.response.data
        })
    }
}

function* watchLoadGameList(){ 
    yield takeLatest(LOAD_GAMELIST_REQUEST, loadGameList);
}

// [D] 게임 데이터 가져오기
function loadGameAPI(name){
    return axios.get(`/game/:${name}`);
};

function* loadGame(action){
    try{
        const result = yield call(loadGameAPI, action.data.name);
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

export default function* gameSaga(){
    yield all([
        fork(watchLoadGameList),
        fork(watchLoadGame),
    ]);
}