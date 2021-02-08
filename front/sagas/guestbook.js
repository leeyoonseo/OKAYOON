import axios from 'axios';
import { all, fork, put, takeLatest, delay, call } from 'redux-saga/effects';
import { 
    LOAD_GUESTBOOK_REQUEST, LOAD_GUESTBOOK_SUCCESS, LOAD_GUESTBOOK_FAILURE, 
    ADD_GUESTBOOK_REQUEST, ADD_GUESTBOOK_SUCCESS, ADD_GUESTBOOK_FAILURE, 
    EDIT_GUESTBOOK_REQUEST, EDIT_GUESTBOOK_SUCCESS, EDIT_GUESTBOOK_FAILURE, 
    REMOVE_GUESTBOOK_REQUEST, REMOVE_GUESTBOOK_SUCCESS, REMOVE_GUESTBOOK_FAILURE, 
    LOAD_COMMENT_REQUEST, LOAD_COMMENT_SUCCESS, LOAD_COMMENT_FAILURE, 
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, 
    EDIT_COMMENT_REQUEST, EDIT_COMMENT_SUCCESS, EDIT_COMMENT_FAILURE, 
    REMOVE_COMMENT_REQUEST, REMOVE_COMMENT_SUCCESS, REMOVE_COMMENT_FAILURE, 
} from '../reducers/guestbook';

function LoadGuestbookAPI(){
    return axios.get('guestbook');
  // 통신 작업할 것
};

function* LoadGuestbook(action){
    try{
        const result = yield call(LoadGuestbookAPI);
        console.log('LoadGuestbook result', result)
        // 임시
        // console.log('LoadGuestbook', action.data);
        // yield delay(1000);
        // yield put({
        //     type: LOAD_GUESTBOOK_SUCCESS,
        //     data: result.data
        // });

    }catch(err){
        console.error(err);
        yield put({
            type: LOAD_GUESTBOOK_FAILURE,
            error: err.response.data
        })
    }
}

function* watchLoadGuestbook(){ 
    yield takeLatest(LOAD_GUESTBOOK_REQUEST, LoadGuestbook);
}

function AddGuestbookAPI(data){
    return axios.post('http://localhost:3065/guestbook', data);
};

function* AddGuestbook(action){
    try{
        const result = yield call(AddGuestbookAPI, action.data);
        console.log('AddGuestbook result', result);
        // 임시
        // yield delay(1000);
        // yield put({
        //     type: ADD_GUESTBOOK_SUCCESS,
        //     data: result.data
        // });

    }catch(err){
        console.error(err);
        yield put({
            type: ADD_GUESTBOOK_FAILURE,
            error: err.response.data
        })
    }
}

function* watchAddGuestbook(){ 
    yield takeLatest(ADD_GUESTBOOK_REQUEST, AddGuestbook);
}

function EditGuestbookAPI(data){
    // 통신 작업할 것
};

function* EditGuestbook(action){
    try{
        // const result = yield call(EditGuestbookAPI);
        // 임시
        // console.log('EditGuestbook', action.data);
        yield delay(1000);
        // console.log('EditGuestbook', action.data);
        yield put({
            type: EDIT_GUESTBOOK_SUCCESS,
            data: action.data
        });

    }catch(err){
        console.error(err);
        yield put({
            type: EDIT_GUESTBOOK_FAILURE,
            error: err.response.data
        })
    }
}

function* watchEditGuestbook(){ 
    yield takeLatest(EDIT_GUESTBOOK_REQUEST, EditGuestbook);
}

function RemoveGuestbookAPI(data){
    // 통신 작업할 것
};

function* RemoveGuestbook(action){
    try{
        // const result = yield call(RemoveGuestbookAPI);
        // 임시
        console.log('RemoveGuestbook', action.data);
        yield delay(1000);
        yield put({
            type: REMOVE_GUESTBOOK_SUCCESS,
            data: action.data
        });

    }catch(err){
        console.error(err);
        yield put({
            type: REMOVE_GUESTBOOK_FAILURE,
            error: err.response.data
        })
    }
}

function* watchRemoveGuestbook(){ 
    yield takeLatest(REMOVE_GUESTBOOK_REQUEST, RemoveGuestbook);
}

function AddCommentAPI(data){
    // 통신 작업할 것
};

function* AddComment(action){
    try{
        // const result = yield call(AddCommentAPI);
        // 임시
        yield delay(1000);
        // console.log('AddComment', action.data);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: action.data
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
    yield takeLatest(ADD_COMMENT_REQUEST, AddComment);
}

function EditCommentAPI(data){
    // 통신 작업할 것
};

function* EditComment(action){
    try{
        // const result = yield call(EditCommentAPI);
        // 임시
        yield delay(1000);
        // console.log('EditComment', action.data);
        yield put({
            type: EDIT_COMMENT_SUCCESS,
            data: action.data
        });

    }catch(err){
        console.error(err);
        yield put({
            type: EDIT_COMMENT_FAILURE,
            error: err.response.data
        })
    }
}

function* watchEditComment(){ 
    yield takeLatest(EDIT_COMMENT_REQUEST, EditComment);
}

function RemoveCommentAPI(data){
    // 통신 작업할 것
};

function* RemoveComment(action){
    try{
        // const result = yield call(RemoveCommentAPI);
        // 임시
        yield delay(1000);
        // console.log('RemoveComment', action.data);
        yield put({
            type: REMOVE_COMMENT_SUCCESS,
            data: action.data
        });

    }catch(err){
        console.error(err);
        yield put({
            type: REMOVE_COMMENT_FAILURE,
            error: err.response.data
        })
    }
}

function* watchRemoveComment(){ 
    yield takeLatest(REMOVE_COMMENT_REQUEST, RemoveComment);
}

export default function* guestbookSaga(){
    yield all([
        fork(watchLoadGuestbook),
        fork(watchAddGuestbook),
        fork(watchEditGuestbook),
        fork(watchRemoveGuestbook),
        fork(watchAddComment),
        fork(watchEditComment),
        fork(watchRemoveComment),
    ]);
}

// TODO
// API 통신