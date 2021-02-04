import { all, fork, put, takeLatest } from 'redux-saga/effects';
import { 
    ADD_GUESTBOOK_REQUEST, ADD_GUESTBOOK_SUCCESS, ADD_GUESTBOOK_FAILURE, 
    LOAD_GUESTBOOK_REQUEST, LOAD_GUESTBOOK_SUCCESS, LOAD_GUESTBOOK_FAILURE,
} from '../reducers/guestbook';

function AddGuestbookAPI(data){
    // 통신 작업할 것
};

function* AddGuestbook(action){
    try{
        // const result = yield call(AddGuestbookAPI);
        // 임시
        // console.log('AddGuestbook', action.data);
        // yield delay(1000);
        console.log('AddGuestbook', action.data);
        yield put({
            type: ADD_GUESTBOOK_SUCCESS,
            data: action.data
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
    yield takeLatest(ADD_GUESTBOOK_REQUEST, AddGuestbook);
}

function LoadGuestbookAPI(data){
    // 통신 작업할 것
};

function* LoadGuestbook(action){
    try{
        // const result = yield call(LoadGuestbookAPI);
        // 임시
        // console.log('LoadGuestbook', action.data);
        // yield delay(1000);
        yield put({
            type: LOAD_GUESTBOOK_SUCCESS,
            data: action.data
        });

    }catch(err){
        console.error(err);
        yield put({
            type: ADD_GUESTBOOK_FAILURE,
            error: err.response.data
        })
    }
}

function* watchLoadGuestbook(){ 
    yield takeLatest(LOAD_GUESTBOOK_REQUEST, LoadGuestbook);
}

export default function* userSaga(){
    yield all([
        fork(watchAddGuestbook),
        fork(watchLoadGuestbook),
    ]);
}

// TODO
// API 통신