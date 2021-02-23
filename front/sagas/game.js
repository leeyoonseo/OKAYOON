import axios from 'axios';
import { all, fork, put, takeLatest, delay, call } from 'redux-saga/effects';
import { 
    LOAD_GAMELIST_REQUEST, LOAD_GAMELIST_SUCCESS, LOAD_GAMELIST_FAILURE, 
} from '../reducers/game';

// [D] 게임 리스트 가져오기
function loadGameListAPI(lastId){
    // return axios.get(`/guestbook?lastId=${lastId || 0}`);
};

function* loadGameList(action){
    try{
        // const result = yield call(loadGameListAPI, action.lastId);
        yield put({
            type: LOAD_GAMELIST_SUCCESS,
            // data: result.data
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

export default function* gameSaga(){
    yield all([
        fork(watchLoadGameList),
    ]);
}