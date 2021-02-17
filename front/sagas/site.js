import { all, fork, put, takeLatest, delay } from 'redux-saga/effects';
import { 
    CREATE_MODAL_REQUEST, CREATE_MODAL_SUCCESS, CREATE_MODAL_FAILURE,
    DELETE_MODAL_REQUEST, DELETE_MODAL_SUCCESS, DELETE_MODAL_FAILURE, 
    TOGGLE_MODAL_REQUEST, TOGGLE_MODAL_SUCCESS, TOGGLE_MODAL_FAILURE,
    CHANGE_MEMO_REQUEST, CHANGE_MEMO_SUCCESS, CHANGE_MEMO_FAILURE, 
} from '../reducers/site';

function CreateModalAPI(data){
    // 통신 작업할 것
};

function* CreateModal(action){
    try{
        // const result = yield call(CreateModalAPI);
        // 임시
        // console.log('CreateModal', action.data);
        // yield delay(1000);
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

// function DeleteModalAPI(data){
//     // 통신 작업할 것
// };

// function* DeleteModal(action){
//     try{
//         // const result = yield call(DeleteModalAPI);
//         // 임시
//         console.log('DeleteModal', action.data);
//         yield delay(1000);
//         yield put({
//             type: DELETE_MODAL_SUCCESS,
//             data: action.data
//         });

//     }catch(err){
//         console.error(err);
//         yield put({
//             type: DELETE_MODAL_FAILURE,
//             error: err.response.data
//         })
//     }
// }

// function* watchDeleteModal(){ 
//     yield takeLatest(DELETE_MODAL_REQUEST, DeleteModal);
// }

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
        // const result = yield call(ChangeMemoAPI);
        // 임시
        // console.log('ChangeMemo', action.data);
        // yield delay(1000);

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
        // fork(watchAllClosedModal),
        fork(watchChangeMemo),
    ]);
}

// TODO
// API 통신