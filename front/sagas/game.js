import axios from 'axios';
import { all, fork, put, takeLatest, delay, call } from 'redux-saga/effects';
import { 
    LOAD_GAMELIST_REQUEST, LOAD_GAMELIST_SUCCESS, LOAD_GAMELIST_FAILURE, 
    ADD_GAMELIST_REQUEST, ADD_GAMELIST_SUCCESS, ADD_GAMELIST_FAILURE, 
    LOAD_GAME_REQUEST, LOAD_GAME_SUCCESS, LOAD_GAME_FAILURE, 
    ADD_GAME_REQUEST, ADD_GAME_SUCCESS, ADD_GAME_FAILURE, 
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

// [D] 게임 리스트 추가하기
function addGameListAPI(data){
    return axios.post('/game/list', data);
};

function* addGameList(action){
    try{
        const result = yield call(addGameListAPI, action.data);
        yield put({
            type: ADD_GAMELIST_SUCCESS,
            data: result.data
        });

    }catch(err){
        console.error(err);
        yield put({
            type: ADD_GAMELIST_FAILURE,
            error: err.response.data
        })
    }
}

function* watchAddGameList(){ 
    yield takeLatest(ADD_GAMELIST_REQUEST, addGameList);
}

// [D] 특정 게임 데이터 가져오기
// function loadGameAPI(gameName){
//     return axios.get(`/game/:${gameName}`);
// };

// function* loadGame(action){
//     try{
//         const result = yield call(loadGameAPI, action.data.gameName);
//         yield put({
//             type: LOAD_GAME_SUCCESS,
//             data: result.data
//         });

//     }catch(err){
//         console.error(err);
//         yield put({
//             type: LOAD_GAME_FAILURE,
//             error: err.response.data
//         })
//     }
// }

// function* watchLoadGame(){
//     yield takeLatest(LOAD_GAMELIST_REQUEST, loadGame);
// }

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
        // [D] 게임리스트
        fork(watchLoadGameList),
        fork(watchAddGameList),

        // [D] 게임
        // fork(watchLoadGame),
        fork(watchAddGame),
    ]);
}