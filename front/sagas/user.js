import { all, fork, put, takeLatest, delay } from 'redux-saga/effects';
import { 
    EDIT_AVATAR_IMG_FAILURE, EDIT_AVATAR_IMG_REQUEST, EDIT_AVATAR_IMG_SUCCESS, 
    LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS 
} from '../reducers/user';

function logInAPI(data){
    // 통신 작업할 것
};

function* logIn(action){
    try{
        // const result = yield call(logInAPI, action.data);
        // 임시
        yield delay(1000);

        yield put({
            type: LOG_IN_SUCCESS,
            data: action.data
        });

    }catch(err){
        console.error(err);
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data
        })
    }
}

function* watchLogIn(){ 
    yield takeLatest(LOG_IN_REQUEST, logIn);
}

function editAvatarImgAPI(data){
    // 통신 작업할 것
};

function* editAvatarImg(action){
    try{
        // const result = yield call(editAvatarImgAPI, action.data);
        // 임시
        yield delay(1000);

        yield put({
            type: EDIT_AVATAR_IMG_SUCCESS,
            data: action.data
        });

    }catch(err){
        console.error(err);
        yield put({
            type: EDIT_AVATAR_IMG_FAILURE,
            error: err.response.data
        })
    }
}

function* watchEditAvatarImg(){ 
    yield takeLatest(EDIT_AVATAR_IMG_REQUEST, editAvatarImg);
}

export default function* userSaga(){
    yield all([
        fork(watchLogIn),
        fork(watchEditAvatarImg),
    ]);
}

// TODO
// API 통신