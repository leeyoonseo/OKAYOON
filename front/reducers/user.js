import produce from '../util/produce';
import Router from 'next/router';

export const initialState = {
    admin: {
        name: '있다'
    },
    logInAdminLoading: false, // 로그인 시도 (관리자)
    logInAdminDone: false,
    logInAdminError: null,

    me: {},
    logInLoading: false, // 로그인 시도 (손님)
    logInDone: false,
    logInError: null,
    logOutLoading: false,
    logOutDone: false,
    logOutError: null,

    // TODO: src, title 수정
    avatarList: [   
        {
            src: 'https://t1.daumcdn.net/cfile/tistory/99B381445ECFD22A1A',
            title: '미스터p',
        },
        {
            src: 'https://t1.daumcdn.net/cfile/tistory/99DDD54D5ECFD64834',
            title: '칼',
        },
        {
            src: 'https://t1.daumcdn.net/cfile/tistory/99F25D3D5ECFD22E34',
            title: '샌디',
        },
        {
            src: 'https://t1.daumcdn.net/cfile/tistory/99D50B355ECFD22B2C',
            title: '비',
        },{
            src: 'https://t1.daumcdn.net/cfile/tistory/99C3E4385ECFD22A2E',
            title: '로사',
        },
        {
            src: 'https://t1.daumcdn.net/cfile/tistory/99AF7E3A5ECFD2311A',
            title: '진',
        },
        {
            src: 'https://t1.daumcdn.net/cfile/tistory/99494A465ECFD22A30',
            title: '맥스',
        },
        {
            src: 'https://t1.daumcdn.net/cfile/tistory/99221E4A5ECFD22E30',
            title: '스파이크',
        },
        {
            src: 'https://t1.daumcdn.net/cfile/tistory/990FCF4F5ECFD2322A',
            title: '페니',
        },{
            src: 'https://t1.daumcdn.net/cfile/tistory/997C96405ECFD22A2B',
            title: '니타',
        },{
            src: 'https://t1.daumcdn.net/cfile/tistory/997D04355ECFD23219',
            title: '파이퍼'
        }
    ],

    changeAvatarLoading: false,
    changeAvatareDone: false,
    changeAvatarError: null,
};

// [D] 로그인, 로그아웃 (손님)
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

// [D] 로그인 (관리자)
export const LOG_IN_ADMIN_REQUEST = 'LOG_IN_ADMIN_REQUEST';
export const LOG_IN_ADMIN_SUCCESS = 'LOG_IN_ADMIN_SUCCESS';
export const LOG_IN_ADMIN_FAILURE = 'LOG_IN_ADMIN_FAILURE';

// TODO: 합치기 가능?
export const CHANGE_AVATAR_REQUEST = 'CHANGE_AVATAR_REQUEST';
export const CHANGE_AVATAR_SUCCESS = 'CHANGE_AVATAR_SUCCESS';
export const CHANGE_AVATAR_FAILURE = 'CHANGE_AVATAR_FAILURE';

// export const loginRequestAction = (data) => ({
//     type: LOG_IN_REQUEST,
//     data,
// });

const reducer = (state = initialState, action) => produce(state,(draft) => {
    switch(action.type){
        case LOG_IN_REQUEST: 
            draft.logInLoading = true;
            draft.logInDone = false;
            draft.logInError = false;
            break;
                
        case LOG_IN_SUCCESS: 
            draft.logInLoading = false;
            draft.logInDone = true;
            draft.logInError = false;
            draft.me = action.data;
            draft.admin = [];
            break;

        case LOG_IN_FAILURE:
            draft.logInLoading = false;
            draft.logInDone = false;
            draft.logInError = true;
            break;

        case LOG_OUT_REQUEST: 
            draft.logOutLoading = true;
            draft.logOutDone = false;
            draft.logOutError = false;
            break;
                
        case LOG_OUT_SUCCESS: 
            draft.logOutLoading = false;
            draft.logOutDone = true;
            draft.logOutError = false;
            // draft.me = [];
            break;

        case LOG_OUT_FAILURE:
            draft.logOutLoading = false;
            draft.logOutDone = false;
            draft.logOutError = true;
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
            draft.me = [];
            break;
        }

        case LOG_IN_ADMIN_FAILURE:
            draft.logInAdminLoading = false;
            draft.logInAdminDone = false;
            draft.logInAdminError = true;

            alert(action.error);
            break;

        case CHANGE_AVATAR_REQUEST: 
            draft.changeAvatarLoading = true;
            draft.changeAvatareDone = false;
            draft.changeAvatarError = false;
            break;
                
        case CHANGE_AVATAR_SUCCESS: 
            draft.changeAvatarLoading = false;
            draft.changeAvatareDone = true;
            draft.changeAvatarError = false;
            draft.me.avatar = action.data;
            break;

        case CHANGE_AVATAR_FAILURE:
            draft.changeAvatarLoading = false;
            draft.changeAvatareDone = false;
            draft.changeAvatarError = true;
            break;

        default: 
            break;
    }
});

export default reducer;