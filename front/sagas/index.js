import { all, fork } from 'redux-saga/effects';

import user from './user';
import site from './site';

export default function* rootSaga(){
    yield all([
        fork(user),
        fork(site),
    ]);
};

// TODO
// cors 작업