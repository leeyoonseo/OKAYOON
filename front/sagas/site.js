import { all, fork, put, takeLatest, delay } from 'redux-saga/effects';
import { 
    CREATE_MODAL_REQUEST, CREATE_MODAL_SUCCESS, CREATE_MODAL_FAILURE,
} from '../reducers/site';

function createModalAPI(data){
    // 통신 작업할 것
};

function* createModal(action){
    try{
        // const result = yield call(createModalAPI);
        // 임시
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
    yield takeLatest(CREATE_MODAL_REQUEST, createModal);
}


export default function* userSaga(){
    yield all([
        fork(watchCreateModal),
    ]);
}

// TODO
// API 통신