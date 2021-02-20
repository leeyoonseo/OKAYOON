import { all, fork, put, takeLatest, delay } from 'redux-saga/effects';
import { 
    CREATE_MODAL_REQUEST, CREATE_MODAL_SUCCESS, CREATE_MODAL_FAILURE,
    DELETE_MODAL_REQUEST, DELETE_MODAL_SUCCESS, DELETE_MODAL_FAILURE, 
    TOGGLE_MODAL_REQUEST, TOGGLE_MODAL_SUCCESS, TOGGLE_MODAL_FAILURE,
    CHANGE_MEMO_REQUEST, CHANGE_MEMO_SUCCESS, CHANGE_MEMO_FAILURE, 
} from '../reducers/site';

function* CreateModal(action){
    try{
        yield put({
            type: CREATE_MODAL_SUCCESS,
            data: action.data
        });

    }catch(err){
        console.error(err);
        yield put({
            type: CREATE_MODAL_FAILURE,
            error: err.response.data
        })
    }
}

function* watchCreateModal(){ 
    yield takeLatest(CREATE_MODAL_REQUEST, CreateModal);
}

function* ToggleModal(action){
    try{
        yield put({
            type: TOGGLE_MODAL_SUCCESS,
            data: action.data
        });

    }catch(err){
        console.error(err);
        yield put({
            type: TOGGLE_MODAL_FAILURE,
            error: err.response.data
        })
    }
}

function* watchToggleModal(){ 
    yield takeLatest(TOGGLE_MODAL_REQUEST, ToggleModal);
}

function ChangeMemoAPI(data){
    // 통신 작업할 것
};

function* ChangeMemo(action){
    try{
        yield put({
            type: CHANGE_MEMO_SUCCESS,
            data: action.data
        });

    }catch(err){
        console.error(err);
        yield put({
            type: CHANGE_MEMO_FAILURE,
            error: err.response.data
        })
    }
}

function* watchChangeMemo(){ 
    yield takeLatest(CHANGE_MEMO_REQUEST, ChangeMemo);
}

export default function* siteSaga(){
    yield all([
        fork(watchCreateModal),
        fork(watchToggleModal),
        fork(watchChangeMemo),
    ]);
}

// TODO
// API 통신