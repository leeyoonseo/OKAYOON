import axios from 'axios';
import { all, fork, put, takeLatest, delay, call } from 'redux-saga/effects';
import { 
    // 방명록
    LOAD_GUESTBOOK_REQUEST, LOAD_GUESTBOOK_SUCCESS, LOAD_GUESTBOOK_FAILURE, 
    ADD_GUESTBOOK_REQUEST, ADD_GUESTBOOK_SUCCESS, ADD_GUESTBOOK_FAILURE, 

    // 댓글
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, 
} from '../reducers/guestbook';

// [D] 방명록 가져오기
function loadGuestbookAPI(){
    return axios.get('/guestbook');
};

function* loadGuestbook(){
    try{
        const result = yield call(loadGuestbookAPI);
        console.log('LoadGuestbook', result);

        yield put({
            type: LOAD_GUESTBOOK_SUCCESS,
            data: result.data
        });

    }catch(err){
        console.error(err);
        yield put({
            type: LOAD_GUESTBOOK_FAILURE,
            error: err.response.data
        })
    }
}

function* watchLoadGuestbook(){ 
    yield takeLatest(LOAD_GUESTBOOK_REQUEST, loadGuestbook);
}

// [D] 방명록 등록
function addGuestbookAPI(data){
    return axios.post('/guestbook', data);
};

function* addGuestbook(action){
    try{
        const result = yield call(addGuestbookAPI, action.data);

        // yield delay(1000);
        yield put({
            type: ADD_GUESTBOOK_SUCCESS,
            data: result.data
        });

    }catch(err){
        console.error(err);
        yield put({
            type: ADD_GUESTBOOK_FAILURE,
            error: err.response.data
        })
    }
}

function* watchAddGuestbook(){ 
    yield takeLatest(ADD_GUESTBOOK_REQUEST, addGuestbook);
}

// [D] 댓글 등록
function addCommentAPI(data){
    return axios.post(`/guestbook/${data.GuestbookId}/comment`, data);
};

function* addComment(action){
    try{
        const result = yield call(addCommentAPI, action.data);
        console.log('addComment resul, sagas', result)

        // yield delay(1000);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: result.data
        });

    }catch(err){
        console.error(err);
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: err.response.data
        })
    }
}

function* watchAddComment(){ 
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* guestbookSaga(){
    yield all([
        // 방명록
        fork(watchLoadGuestbook),
        fork(watchAddGuestbook),

        // 댓글
        fork(watchAddComment),
    ]);
}

// TODO
// API 통신