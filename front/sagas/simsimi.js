import axios from 'axios';
import { all, fork, put, takeLatest, delay, call } from 'redux-saga/effects';
import { 
    SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAILURE,
    LOAD_MESSAGE_REQUEST, LOAD_MESSAGE_SUCCESS, LOAD_MESSAGE_FAILURE,
} from '../reducers/simsimi';

function sendMessageAPI(data){
    console.log('sendMessageAPI', data);
    return axios({
        url: 'https://wsapi.simsimi.com/190410/talk',
        method: 'post',
        headers: {
            'Content-Type' : 'application/json;charset=utf-8',
            'x-api-key' : 'k8vBgUA.WKtwTSQgIEEgr24QG.XGD_bpwAHn56hC',
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Credentials': 'true'
        },
        data: {
            utext : data,
            lang : "ko",
        },
    });
  // 통신 작업할 것
};

function* sendMessage(action){
    try{
        const result = yield call(sendMessageAPI, action.data.text);
        console.log('result', result);
        // 임시
        // console.log('LoadGuestbook', action.data);
        // yield delay(1000);
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