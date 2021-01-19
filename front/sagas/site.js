import { all, fork, put, takeLatest, delay } from 'redux-saga/effects';
import { 
    CHANGE_THEME_REQUEST, CHANGE_THEME_SUCCESS, CHANGE_THEME_FAILURE,
} from '../reducers/site';

function changeThemeAPI(data){
    // 통신 작업할 것
};

function* changeTheme(action){
    try{
        // const result = yield call(changeThemeAPI, action.data);
        // 임시
        yield delay(1000);
        console.log('change sagas',action.data )
        yield put({
            type: CHANGE_THEME_SUCCESS,
            data: action.data
        });

    }catch(err){
        console.error(err);
        yield put({
            type: CHANGE_THEME_FAILURE,
            error: err.response.data
        })
    }
}

function* watchChangeTheme(){ 
    yield takeLatest(CHANGE_THEME_REQUEST, changeTheme);
}

export default function* userSaga(){
    yield all([
        fork(watchChangeTheme),
    ]);
}

// TODO
// API 통신