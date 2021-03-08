import produce from '../util/produce';

export const initialState = {
    admin: {},
    me: {},

    // [D] 로그인 정보 가져오기
    loadInfoLoading: false, 
    loadInfoDone: false,
    loadInfoError: null,

    // [D] 로그인
    logInLoading: false, 
    logInDone: false,
    logInError: null,

    // [D] 관리자로그인
    logInAdminLoading: false, 
    logInAdminDone: false,
    logInAdminError: null,

    // [D] 로그아웃
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
};

// [D] 유저 로그인 
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

// [D] 유저 로그아웃 
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
            draft.loadInfoLoading = true;
            draft.loadInfoDone = false;
            draft.loadInfoError = false;
            break;
                
        case LOAD_ADMIN_INFO_SUCCESS: {
            draft.loadInfoLoading = false;
            draft.loadInfoDone = true;
            draft.loadInfoError = false;

            if (action.data) {
                draft.admin = action.data;
            }
            
            break;
        }

        case LOAD_ADMIN_INFO_FAILURE:
            draft.loadInfoLoading = false;
            draft.loadInfoDone = false;
            draft.loadInfoError = true;
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