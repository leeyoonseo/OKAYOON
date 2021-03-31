import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import user from './user';
import site from './site';
import guestbook from './guestbook';
import simsimi from './simsimi';
import game from './game';
import portfolio from './portfolio';
import { backUrl } from '../config/config';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export default function* rootSaga(){
    yield all([
        fork(user),
        fork(site),
        fork(guestbook),
        fork(simsimi),
        fork(game),
        fork(portfolio),
    ]);
};