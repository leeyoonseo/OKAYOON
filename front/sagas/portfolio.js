import axios from 'axios';
import { all, fork, put, takeLatest, delay, call } from 'redux-saga/effects';
import { SEND_MAIL_FAILURE, SEND_MAIL_REQUEST, SEND_MAIL_SUCCESS } from '../reducers/portfolio';
import emailjs from 'emailjs-com';

// [D] 메일 발송
function sendMailAPI(data){
    return emailjs.sendForm(
        'service_lte3zi5', 
        'template_5ceg8m8', 
        data, 
        'user_7HeHO7otOALMMDVm6XOYO'
    );
};

function* sendMail(action){
    try{
        yield call(sendMailAPI, action.data);
        alert('발송이 완료되었습니다');
        
        yield put({
            type: SEND_MAIL_SUCCESS
        });

    }catch(err){
        console.error(err);
        yield put({
            type: SEND_MAIL_FAILURE,
            error: err.response.data
        })
    }
}

function* watchSendMail(){
    yield takeLatest(SEND_MAIL_REQUEST, sendMail);
}

export default function* gameSaga(){
    yield all([
        fork(watchSendMail),
    ]);
}