import produce from '../util/produce';

export const initialState = {
    logInLoading: false, // 로그인 시도
    logInDone: false,
    logInError: null,

    // TODO 홀수로
    sampleAvatarList: [
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

    userInfo: {
        nickname: '',
        avatar: null,
    },
    

};

// 로그인
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

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
            draft.userInfo.nickname = action.data.nickname;
            
            if(action.data.avatar){
                draft.userInfo.avatar = action.data.avatar;
            }

            break;
        }

        case LOG_IN_FAILURE:
            draft.logInLoading = false;
            draft.logInDone = false;
            draft.logInError = true;

            break;
        
        default: 
            break;
    }
});

export default reducer;