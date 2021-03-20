import { all, fork, put, takeLatest, delay } from 'redux-saga/effects';
import { 
    CREATE_MODAL_REQUEST, CREATE_MODAL_SUCCESS, CREATE_MODAL_FAILURE,
    TOGGLE_MODAL_REQUEST, TOGGLE_MODAL_SUCCESS, TOGGLE_MODAL_FAILURE,
} from '../reducers/site';

// [D] 모달 생성
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

// [D] 모달 토글
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

export default function* siteSaga(){
    yield all([
        fork(watchCreateModal),
        fork(watchToggleModal),
    ]);
}