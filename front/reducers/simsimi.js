
import produce from '../util/produce';

export const initialState = {
    chatList : [],

    sendMessageLoading: false,
    sendMessageDone: false,
    sendMessageError: false,
};

export const DEV_MODE = false;
export const SEND_MESSAGE_REQUEST = 'SEND_MESSAGE_REQUEST';
export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';
export const SEND_MESSAGE_FAILURE = 'SEND_MESSAGE_FAILURE';

export const DELETE_MESSAGE = 'DELETE_MESSAGE';

const reducer = (state = initialState, action) => produce(state,(draft) => {
    switch(action.type){

        case SEND_MESSAGE_REQUEST:
            draft.sendMessageLoading = true;
            draft.sendMessageDone = false;
            draft.sendMessageError = false;

            draft.chatList.push(action.data);
            break;

        case SEND_MESSAGE_SUCCESS: 
            draft.sendMessageLoading = false;
            draft.sendMessageDone = true;
            draft.sendMessageError = false;

            draft.chatList.push(action.data);
            break;

        case SEND_MESSAGE_FAILURE:
            draft.sendMessageLoading = false;
            draft.sendMessageDone = false;
            draft.sendMessageError = true;
            break;

        case DELETE_MESSAGE:
            draft.chatList = [];
            break;

        default:
            break;
    }
});

export default reducer;

// TODO:
// 사이트 테마 변경

// TODO: guestbook, site, simismi 통합할까?
