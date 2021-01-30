import { all, fork, put, takeLatest, delay } from 'redux-saga/effects';
import { 
    CREATE_MODAL_REQUEST, CREATE_MODAL_SUCCESS, CREATE_MODAL_FAILURE,
    DELETE_MODAL_REQUEST, DELETE_MODAL_SUCCESS, DELETE_MODAL_FAILURE,
} from '../reducers/site';

function CreateModalAPI(data){
    // 통신 작업할 것
};

function* CreateModal(action){
    try{
        // const result = yield call(CreateModalAPI);
        // 임시
        console.log('CreateModal', action.data);
        yield delay(1000);
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

function DeleteModalAPI(data){
    // 통신 작업할 것
};

function* DeleteModal(action){
    try{
        // const result = yield call(DeleteModalAPI);
        // 임시
        console.log('DeleteModal', action.data);
        yield delay(1000);
        yield put({
            type: DELETE_MODAL_SUCCESS,
            data: action.data
        });

    }catch(err){
        console.error(err);
        yield put({
            type: DELETE_MODAL_FAILURE,
            error: err.response.data
        })
    }
}

function* watchDeleteModal(){ 
    yield takeLatest(DELETE_MODAL_REQUEST, DeleteModal);
}

export default function* userSaga(){
    yield all([
        fork(watchCreateModal),
        fork(watchDeleteModal),
    ]);
}

// TODO
// API 통신