import { all, fork } from 'redux-saga/effects';

import user from './user';

export default function* rootSaga(){
    yield all([
        fork(user),
    ]);
};

// TODO
// cors 작업