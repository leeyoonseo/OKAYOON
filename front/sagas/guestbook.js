import axios from 'axios';
import { all, fork, put, takeLatest, delay, call } from 'redux-saga/effects';
import { 
    // 권한
    GET_PERMISSION_REQUEST, GET_PERMISSION_SUCCESS, GET_PERMISSION_FAILURE, 

    // 방명록
    LOAD_GUESTBOOK_REQUEST, LOAD_GUESTBOOK_SUCCESS, LOAD_GUESTBOOK_FAILURE, 
    ADD_GUESTBOOK_REQUEST, ADD_GUESTBOOK_SUCCESS, ADD_GUESTBOOK_FAILURE, 
    UPDATE_GUESTBOOK_REQUEST, UPDATE_GUESTBOOK_SUCCESS, UPDATE_GUESTBOOK_FAILURE, 
    DELETE_GUESTBOOK_REQUEST, DELETE_GUESTBOOK_SUCCESS, DELETE_GUESTBOOK_FAILURE, 

    // 댓글
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, 
} from '../reducers/guestbook';


// [D] 권한요청하기
function getPermissionAPI(data){
    return axios.post(`/guestbook/${data.id}/permission`, data);
};

function* getPermission(action){
    try{
        const result = yield call(getPermissionAPI, action.data);

        yield put({
            type: GET_PERMISSION_SUCCESS,
            data: result.data
        });

    }catch(err){
        console.error(err);
        yield put({
            type: GET_PERMISSION_FAILURE,
            error: err.response.data
        })
    }
}

function* watchGetPermission(){ 
    yield takeLatest(GET_PERMISSION_REQUEST, getPermission);
}


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

// [D] 방명록 수정
function updateGuestbookAPI(data){
    return axios.patch(`/guestbook/${data.id}`, data);
};

function* updateGuestbook(action){
    try{
        const result = yield call(updateGuestbookAPI, action.data);
        yield put({
            type: UPDATE_GUESTBOOK_SUCCESS,
            data: result.data
        });

    }catch(err){
        alert(err.response.data);
        console.error(err);
        yield put({
            type: UPDATE_GUESTBOOK_FAILURE,
            error: err.response.data
        })
    }
}

function* watchUpdateGuestbook(){ 
    yield takeLatest(UPDATE_GUESTBOOK_REQUEST, updateGuestbook);
}
// [D] 방명록 삭제
function deleteGuestbookAPI(data){
    return axios.post(`/guestbook/${data.id}/delete`, data);
};

function* deleteGuestbook(action){
    try{
        const result = yield call(deleteGuestbookAPI, action.data);
        yield put({
            type: DELETE_GUESTBOOK_SUCCESS,
            data: result.data
        });

    }catch(err){
        alert(err.response.data);
        console.error(err);
        yield put({
            type: DELETE_GUESTBOOK_FAILURE,
            error: err.response.data
        })
    }
}

function* watchDeleteGuestbook(){ 
    yield takeLatest(DELETE_GUESTBOOK_REQUEST, deleteGuestbook);
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
        // 권한
        fork(watchGetPermission),

        // 방명록
        fork(watchLoadGuestbook),
        fork(watchAddGuestbook),
        fork(watchDeleteGuestbook),
        fork(watchUpdateGuestbook),

        // 댓글
        fork(watchAddComment),
    ]);
}

// TODO
// API 통신