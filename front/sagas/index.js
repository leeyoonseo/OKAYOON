import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import user from './user';
import site from './site';
import guestbook from './guestbook';
import simsimi from './simsimi';

axios.defaults.baseURL = 'http://localhost:3065';

export default function* rootSaga(){
    yield all([
        fork(user),
        fork(site),
        fork(guestbook),
        fork(simsimi),
    ]);
};

// TODO
// cors 작업