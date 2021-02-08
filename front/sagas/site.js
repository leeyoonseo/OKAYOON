import { all, fork, put, takeLatest, delay } from 'redux-saga/effects';
import { 
    CREATE_MODAL_REQUEST, CREATE_MODAL_SUCCESS, CREATE_MODAL_FAILURE,
    DELETE_MODAL_REQUEST, DELETE_MODAL_SUCCESS, DELETE_MODAL_FAILURE, 
    TOGGLE_MODAL_REQUEST, TOGGLE_MODAL_SUCCESS, TOGGLE_MODAL_FAILURE,
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

function ToggleModalAPI(data){
    // 통신 작업할 것
};

function* ToggleModal(action){
    try{
        // const result = yield call(ToggleModalAPI);
        // 임시
        // console.log('ToggleModal', action.data);
        // yield delay(1000);

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
        // fork(watchDeleteModal),
        fork(watchToggleModal),
    ]);
}

// TODO
// API 통신