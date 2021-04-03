import { bucketUrl } from '../config/config';
import produce from '../util/produce';

export const initialState = {
    admin: {},
    me: {},

    // [D] 사용자 로그인 정보 가져오기
    loadUserInfoLoading: false, 
    loadUserInfoDone: false,
    loadUserInfoError: null,

    // [D] 로그인
    logInLoading: false, 
    logInDone: false,
    logInError: null,

    // [D] 로그아웃
    logOutLoading: false,
    logOutDone: false,
    logOutError: null,

    // [D] 관리자 로그인 정보 가져오기
    loadAdminInfoLoading: false, 
    loadAdminInfoDone: false,
    loadAdminInfoError: null,

    // [D] 관리자 로그인
    logInAdminLoading: false, 
    logInAdminDone: false,
    logInAdminError: null,

    avatarList: [   
        {
            src: `${bucketUrl}/avatar/avatar_bear.png`,
            title: 'bear',
        },
        {
            src: `${bucketUrl}/avatar/avatar_bear_winter.png`,
            title: 'bear_winter',
        },
        {
            src: `${bucketUrl}/avatar/avatar_bird.png`,
            title: 'bird',
        },
        {
            src: `${bucketUrl}/avatar/avatar_cat.png`,
            title: 'cat',
        },
        {
            src: `${bucketUrl}/avatar/avatar_ducky.png`,
            title: 'ducky',
        },
        {
            src: `${bucketUrl}/avatar/avatar_elephant.png`,
            title: 'elephant',
        },
        {
            src: `${bucketUrl}/avatar/avatar_fox.png`,
            title: 'fox',
        },
        {
            src: `${bucketUrl}/avatar/avatar_hedgehog.png`,
            title: 'hedgehog',
        },
        {
            src: `${bucketUrl}/avatar/avatar_monkey.png`,
            title: 'monkey',
        },
        {
            src: `${bucketUrl}/avatar/avatar_octopus.png`,
            title: 'octopus',
        },
        {
            src: `${bucketUrl}/avatar/avatar_puffer-fish1.png`,
            title: 'puffer-fish1',
        },
        {
            src: `${bucketUrl}/avatar/avatar_puffer-fish2.png`,
            title: 'puffer-fish2',
        },
        {
            src: `${bucketUrl}/avatar/avatar_sheep.png`,
            title: 'sheep',
        },
        {
            src: `${bucketUrl}/avatar/avatar_beetle.png`,
            title: 'beetle',
        },
        {
            src: `${bucketUrl}/avatar/avatar_pig.png`,
            title: 'pig',
        },
        {
            src: `${bucketUrl}/avatar/avatar_sleeping_bunny.png`,
            title: 'sleeping_bunny',
        },
    ],
};

// [D] 사용자 정보 가져오기
export const LOAD_USER_INFO_REQUEST = 'LOAD_USER_INFO_REQUEST';
export const LOAD_USER_INFO_SUCCESS = 'LOAD_USER_INFO_SUCCESS';
export const LOAD_USER_INFO_FAILURE = 'LOAD_USER_INFO_FAILURE';

// [D] 사용자 로그인 
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

// [D] 사용자 로그아웃 
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

// [D] 관리자 정보 가져오기
export const LOAD_ADMIN_INFO_REQUEST = 'LOAD_ADMIN_INFO_REQUEST';
export const LOAD_ADMIN_INFO_SUCCESS = 'LOAD_ADMIN_INFO_SUCCESS';
export const LOAD_ADMIN_INFO_FAILURE = 'LOAD_ADMIN_INFO_FAILURE';

// [D] 관리자 로그인
export const LOG_IN_ADMIN_REQUEST = 'LOG_IN_ADMIN_REQUEST';
export const LOG_IN_ADMIN_SUCCESS = 'LOG_IN_ADMIN_SUCCESS';
export const LOG_IN_ADMIN_FAILURE = 'LOG_IN_ADMIN_FAILURE';

// [D] 관리자 로그아웃
export const LOG_OUT_ADMIN_REQUEST = 'LOG_OUT_ADMIN_REQUEST';
export const LOG_OUT_ADMIN_SUCCESS = 'LOG_OUT_ADMIN_SUCCESS';
export const LOG_OUT_ADMIN_FAILURE = 'LOG_OUT_ADMIN_FAILURE';

const reducer = (state = initialState, action) => produce(state,(draft) => {
    switch(action.type){
        // [D] 사용자 정보 가져오기
        case LOAD_USER_INFO_REQUEST: 
            draft.loadUserInfoLoading = true;
            draft.loadUserInfoDone = false;
            draft.loadUserInfoError = false;
            break;
                
        case LOAD_USER_INFO_SUCCESS: {
            draft.loadUserInfoLoading = false;
            draft.loadUserInfoDone = true;
            draft.loadUserInfoError = false;
            draft.me = action.data;
            break;
        }

        case LOAD_USER_INFO_FAILURE:
            draft.loadUserInfoLoading = false;
            draft.loadUserInfoDone = false;
            draft.loadUserInfoError = true;
            break;

        // [D] 사용자 로그인
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
            draft.admin = {};
            break;

        case LOG_IN_FAILURE:
            draft.logInLoading = false;
            draft.logInDone = false;
            draft.logInError = true;
            break;

        // [D] 사용자 로그아웃
        case LOG_OUT_REQUEST: 
            draft.logOutLoading = true;
            draft.logOutDone = false;
            draft.logOutError = false;
            break;
                
        case LOG_OUT_SUCCESS: 
            draft.logOutLoading = false;
            draft.logOutDone = true;
            draft.logOutError = false;
            draft.me = {};
            break;

        case LOG_OUT_FAILURE:
            draft.logOutLoading = false;
            draft.logOutDone = false;
            draft.logOutError = true;
            break;

        // [D] 관리자 정보 가져오기
        case LOAD_ADMIN_INFO_REQUEST: 
            draft.loadAdminInfoLoading = true;
            draft.loadAdminInfoDone = false;
            draft.loadAdminInfoError = false;
            break;
                
        case LOAD_ADMIN_INFO_SUCCESS: {
            draft.loadAdminInfoLoading = false;
            draft.loadAdminInfoDone = true;
            draft.loadAdminInfoError = false;

            if (action.data) {
                draft.admin = action.data;
            }
            
            break;
        }

        case LOAD_ADMIN_INFO_FAILURE:
            draft.loadAdminInfoLoading = false;
            draft.loadAdminInfoDone = false;
            draft.loadAdminInfoError = true;
            break;

        // [D] 관리자 로그인
        case LOG_IN_ADMIN_REQUEST: 
            draft.logInLoading = true;
            draft.logInDone = false;
            draft.logInError = false;
            break;
                
        case LOG_IN_ADMIN_SUCCESS: {
            draft.logInLoading = false;
            draft.logInDone = true;
            draft.logInError = false;
            draft.admin = action.data;
            draft.me = {};
            break;
        }

        case LOG_IN_ADMIN_FAILURE:
            draft.logInLoading = false;
            draft.logInDone = false;
            draft.logInError = true;
            break;

        // [D] 관리자 로그아웃
        case LOG_OUT_ADMIN_REQUEST: 
            draft.logOutLoading = true;
            draft.logOutDone = false;
            draft.logOutError = false;
            break;
                
        case LOG_OUT_ADMIN_SUCCESS: 
            draft.logOutLoading = false;
            draft.logOutDone = true;
            draft.logOutError = false;
            draft.admin = {};
            break;

        case LOG_OUT_ADMIN_FAILURE:
            draft.logOutLoading = false;
            draft.logOutDone = false;
            draft.logOutError = true;
            break;

        default: 
            break;
    }
});

export default reducer;