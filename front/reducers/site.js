import produce from '../util/produce';

export const initialState = {
    modalLoading: false,
    modalDone: false,
    modalError: false,

    modalToggleLoading: false,
    modalToggleDone: false,
    modalToggleError: false,


    modals: [], 

    isMuted: false, // 음소거
    theme: null, // 사이트 테마


    battery: null,
    time: null,
};

export const CREATE_MODAL_REQUEST = 'CREATE_MODAL_REQUEST';
export const CREATE_MODAL_SUCCESS = 'CREATE_MODAL_SUCCESS';
export const CREATE_MODAL_FAILURE = 'CREATE_MODAL_FAILURE';

export const DELETE_MODAL_REQUEST = 'DELETE_MODAL_REQUEST';
export const DELETE_MODAL_SUCCESS = 'DELETE_MODAL_SUCCESS';
export const DELETE_MODAL_FAILURE = 'DELETE_MODAL_FAILURE';

export const TOGGLE_MODAL_REQUEST = 'TOGGLE_MODAL_REQUEST';
export const TOGGLE_MODAL_SUCCESS = 'TOGGLE_MODAL_SUCCESS';
export const TOGGLE_MODAL_FAILURE = 'TOGGLE_MODAL_FAILURE';


// export const CHANGE_MUTED = 'CHANGE_MUTED'; // 음소거

const reducer = (state = initialState, action) => produce(state,(draft) => {
    switch(action.type){
        case CREATE_MODAL_REQUEST:
            draft.modalLoading = true;
            draft.modalDone = false;
            draft.modalError = false;
            break;

        case CREATE_MODAL_SUCCESS:
            draft.modalLoading = false;
            draft.modalDone = true;
            draft.modalError = false;
            draft.modals.push(action.data);
            break;

        case CREATE_MODAL_FAILURE:
            draft.modalLoading = false;
            draft.modalDone = false;
            draft.modalError = true;
            break;

        case TOGGLE_MODAL_REQUEST:
            draft.modalToggleLoading = true;
            draft.modalToggleDone = false;
            draft.modalToggleError = false;
            break;

        case TOGGLE_MODAL_SUCCESS: {
            const modal = draft.modals.find((v) => v.id === action.data);
            modal.visible = !modal.visible;

            draft.modalToggleLoading = false;
            draft.modalToggleDone = true;
            draft.modalToggleError = false;
            break;
        }

        case TOGGLE_MODAL_FAILURE:
            draft.modalToggleLoading = false;
            draft.modalToggleDone = false;
            draft.modalToggleError = true;
            break;

        default:
            break;
    }
});

export default reducer;

// TODO:
// 사이트 테마 변경