import produce from '../util/produce';
import Router from 'next/router';

export const initialState = {
    admin: {},
    // logInAdminLoading: false, // 로그인 시도 (관리자)
    // logInAdminDone: false,
    // logInAdminError: null,

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
            src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
            title: '1번',
        },
        {
            src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20140127_257%2Faosjahemdd_1390820129233pOn7o_JPEG%2Fd018e984a74511e2bd6322000a1fa42a_7_large.jpg&type=sc960_832',
            title: '2번',
        },
        {
            src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
            title: '3번',
        },
        {
            src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20140127_257%2Faosjahemdd_1390820129233pOn7o_JPEG%2Fd018e984a74511e2bd6322000a1fa42a_7_large.jpg&type=sc960_832',
            title: '4번',
        },{
            src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
            title: '5번',
        },
        {
            src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
            title: '1번',
        },
        {
            src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20140127_257%2Faosjahemdd_1390820129233pOn7o_JPEG%2Fd018e984a74511e2bd6322000a1fa42a_7_large.jpg&type=sc960_832',
            title: '2번',
        },
        {
            src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
            title: '3번',
        },
        {
            src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20140127_257%2Faosjahemdd_1390820129233pOn7o_JPEG%2Fd018e984a74511e2bd6322000a1fa42a_7_large.jpg&type=sc960_832',
            title: '4번',
        },{
            src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
            title: '5번',
        },
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
            draft.logInLoading = true;
            draft.logInDone = false;
            draft.logInError = false;
            break;
                
        case LOG_IN_ADMIN_SUCCESS: {
            draft.logInLoading = false;
            draft.logInDone = true;
            draft.logInError = false;
            draft.admin = action.data;
            draft.me = [];

            Router.replace('/');
            break;
        }

        case LOG_IN_ADMIN_FAILURE:
            draft.logInLoading = false;
            draft.logInDone = false;
            draft.logInError = true;

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