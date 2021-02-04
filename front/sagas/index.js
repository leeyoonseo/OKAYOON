import { all, fork } from 'redux-saga/effects';

import user from './user';
import site from './site';
import guestbook from './guestbook';

export default function* rootSaga(){
    yield all([
        fork(user),
        fork(site),
        fork(guestbook),
    ]);
};

// TODO
// cors 작업