import produce from '../util/produce';

export const initialState = {
    logInLoading: false, // 로그인 시도
    logInDone: false,
    logInError: null,

    // 분리하는게 나을까?
    // myInfo: null, // 내 정보
    // myInfo: {
    //     nickname: '',
    //     country: '',
    //     battery: 0,
    // }
    nickname: null,
    country: null,
    battery: null,
    time: null,
};

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
                
        case LOG_IN_SUCCESS:
            draft.logInLoading = false;
            draft.logInDone = true;
            draft.logInError = false;
            draft.nickname = action.data;
            break;

        case LOG_IN_FAILURE:
            draft.logInLoading = false;
            draft.logInDone = false;
            draft.logInError = true;

            break;
    }
});

export default reducer;