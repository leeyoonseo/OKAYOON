import axios from 'axios';
import { all, fork, put, takeLatest, delay, call } from 'redux-saga/effects';
import { 
    SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAILURE,
} from '../reducers/simsimi';

function sendMessageAPI(data){
    return axios.post('/simsimi', data);
};

function* sendMessage(action){
    try{
        const result = yield call(sendMessageAPI, action.data);

        yield put({
            type: SEND_MESSAGE_SUCCESS,
            data: result.data
        });

    }catch(err){
        console.error(err);
        yield put({
            type: SEND_MESSAGE_FAILURE,
            error: err.response.data
        })
    }
}

function* watchSendMessage(){ 
    yield takeLatest(SEND_MESSAGE_REQUEST, sendMessage);
}

export default function* guestbookSaga(){
    yield all([
        fork(watchSendMessage),
    ]);
}

// TODO
// API 통신