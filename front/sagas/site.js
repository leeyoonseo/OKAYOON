import { all, fork, put, takeLatest, delay } from 'redux-saga/effects';
import { 
    // CHANGE_MUTED, 
} from '../reducers/site';

// function changeMutedAPI(data){
//     // 통신 작업할 것
// };

// function* changeMuted(action){
//     try{
//         // const result = yield call(changeMutedAPI);
//         // 임시
//         yield delay(1000);
//         console.log('change sagas',action.data )
//         yield put({
//             type: CHANGE_THEME_SUCCESS,
//             data: action.data
//         });

//     }catch(err){
        // console.error(err);
        // yield put({
        //     type: CHANGE_THEME_FAILURE,
        //     error: err.response.data
        // })
//     }
// }

// function* watchChangeMuted(){ 
//     yield takeLatest(CHANGE_MUTED, changeMuted);
// }


export default function* userSaga(){
    yield all([
        // fork(watchChangeMuted),
    ]);
}

// TODO
// API 통신