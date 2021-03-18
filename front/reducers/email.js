import produce from '../util/produce';

export const initialState = {
    formData: [],

    sendMailLoading: false,
    sendMailDone: false,
    sendMailError: false,
};

// [D] 권한요청
export const SEND_MAIL_REQUEST = 'SEND_MAIL_REQUEST';
export const SEND_MAIL_SUCCESS = 'SEND_MAIL_SUCCESS';
export const SEND_MAIL_FAILURE = 'SEND_MAIL_FAILURE';

const reducer = (state = initialState, action) => produce(state,(draft) => {
    switch(action.type){

        // [D] 방명록 가져오기
        case SEND_MAIL_REQUEST:
            draft.sendMailLoading = true;
            draft.sendMailDone = false;
            draft.sendMailError = false;
            break;

        case SEND_MAIL_SUCCESS:
            draft.sendMailLoading = false;
            draft.sendMailDone = true;
            draft.sendMailError = false;
            break;

        case SEND_MAIL_FAILURE:
            draft.sendMailLoading = false;
            draft.sendMailDone = false;
            draft.sendMailError = true;
            break;
        
        default:
            break;
    }
});

export default reducer;