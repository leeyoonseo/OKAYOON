import produce from '../util/produce';
import Router from 'next/router';

export const initialState = {
    admin: {},
    logInAdminLoading: false, // 로그인 시도 (관리자)
    logInAdminDone: false,
    logInAdminError: null,

    me: {
        nickname: '',
        avatar: null,
    },
    logInLoading: false, // 로그인 시도 (손님)
    logInDone: false,
    logInError: null,

    changeMeLoading: false,
    changeMeDone: false,
    changeMeError: null,


    
};

// [D] 로그인 (손님)
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

// [D] 로그인 (관리자)
export const LOG_IN_ADMIN_REQUEST = 'LOG_IN_ADMIN_REQUEST';
export const LOG_IN_ADMIN_SUCCESS = 'LOG_IN_ADMIN_SUCCESS';
export const LOG_IN_ADMIN_FAILURE = 'LOG_IN_ADMIN_FAILURE';

// TODO: 합치기 가능?
export const CHANGE_AVATAR_REQUEST = 'CHANGE_AVATAR_REQUEST';
export const CHANGE_AVATAR_SUCCESS = 'CHANGE_AVATAR_SUCCESS';
export const CHANGE_AVATAR_FAILURE = 'CHANGE_AVATAR_FAILURE';

export const loginRequestAction = (data) => ({
    type: LOG_IN_REQUEST,
    data,
});

const reducer = (state = initialState, action) => produce(state,(draft) => {
    switch(action.type){
        case LOG_IN_REQUEST: 
            draft.logInLoading = true;
            draft.logInDone = false;
            draft.logInError = false;
            break;
                
        case LOG_IN_SUCCESS: {
            draft.logInLoading = false;
            draft.logInDone = true;
            draft.logInError = false;
            draft.me = action.data;

            Router.replace('/');
            break;
        }

        case LOG_IN_FAILURE:
            draft.logInLoading = false;
            draft.logInDone = false;
            draft.logInError = true;
            break;

        case LOG_IN_ADMIN_REQUEST: 
            draft.logInAdminLoading = true;
            draft.logInAdminDone = false;
            draft.logInAdminError = false;
            break;
                
        case LOG_IN_ADMIN_SUCCESS: {
            draft.logInAdminLoading = false;
            draft.logInAdminDone = true;
            draft.logInAdminError = false;
            draft.admin = action.data;

            Router.replace('/');
            break;
        }

        case LOG_IN_ADMIN_FAILURE:
            draft.logInAdminLoading = false;
            draft.logInAdminDone = false;
            draft.logInAdminError = true;
            break;

        case CHANGE_AVATAR_REQUEST: 
            draft.changeMeLoading = true;
            draft.changeMeDone = false;
            draft.changeMeError = false;
            break;
                
        case CHANGE_AVATAR_SUCCESS: 
            draft.changeMeLoading = false;
            draft.changeMeDone = true;
            draft.changeMeError = false;
            draft.me.avatar = action.data;
            break;

        case CHANGE_AVATAR_FAILURE:
            draft.changeMeLoading = false;
            draft.changeMeDone = false;
            draft.changeMeError = true;
            break;

        default: 
            break;
    }
});

export default reducer;