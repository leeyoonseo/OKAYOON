import axios from 'axios';
import { all, fork, put, takeLatest, delay, call } from 'redux-saga/effects';
import { 
    DEV_MODE,
    SEND_MESSAGE_REQUEST, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_FAILURE,
} from '../reducers/simsimi';

function sendMessageAPI(data){
    return axios.post('/simsimi', data);
};

function* sendMessage(action){
    try{

        let result = {};

        if (DEV_MODE) {
            result = yield call(sendMessageAPI, action.data);

        } else {
            yield result.data = {
                simsimi: true,
                text: '주인장이 API 테스트를 정지해놓은 상태야^^~ 다음에 대화하장!!'
            };

            yield delay(1000);
        }

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