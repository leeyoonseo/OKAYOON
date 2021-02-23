import produce from '../util/produce';

// TODO: site 정리하기

export const initialState = {
    modalLoading: false,
    modalDone: false,
    modalError: false,

    modalToggleLoading: false,
    modalToggleDone: false,
    modalToggleError: false,

    modalIndex: 1000,
    modals: [], 

    changeMemoLoading: false,
    changeMemoDone: false,
    changeMemoError: false,
    memo: '',

    // TODO: 소리 넣기
    isMuted: false, // 음소거
    theme: null, // 사이트 테마
    battery: null,
    time: null,
};

// [D] 모달 팝업
export const CREATE_MODAL_REQUEST = 'CREATE_MODAL_REQUEST';
export const CREATE_MODAL_SUCCESS = 'CREATE_MODAL_SUCCESS';
export const CREATE_MODAL_FAILURE = 'CREATE_MODAL_FAILURE';

export const DELETE_MODAL_REQUEST = 'DELETE_MODAL_REQUEST';
export const DELETE_MODAL_SUCCESS = 'DELETE_MODAL_SUCCESS';
export const DELETE_MODAL_FAILURE = 'DELETE_MODAL_FAILURE';

export const TOGGLE_MODAL_REQUEST = 'TOGGLE_MODAL_REQUEST';
export const TOGGLE_MODAL_SUCCESS = 'TOGGLE_MODAL_SUCCESS';
export const TOGGLE_MODAL_FAILURE = 'TOGGLE_MODAL_FAILURE';

export const ALL_CLOSED_MODAL = 'ALL_CLOSED_MODAL';

// [D] 메모
export const CHANGE_MEMO_REQUEST = 'CHANGE_MEMO_REQUEST';
export const CHANGE_MEMO_SUCCESS = 'CHANGE_MEMO_SUCCESS';
export const CHANGE_MEMO_FAILURE = 'TOGGLE_MODAL_FAILURE';




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
            // if(action.data === null && draft.modals.length > 0) {
            //     console.log('toggleModal');
            //     draft.modals.map((v) => v.visible = false);
            // }else {
                const modal = draft.modals.find((v) => v.id === action.data);
                modal.visible = !modal.visible;

                if(modal.visible){
                    draft.modalIndex = draft.modalIndex + 1;
                    modal.zIndex = draft.modalIndex;
                }
            // }

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

        case ALL_CLOSED_MODAL:
            draft.modals.map((v) => {
                if (v.visible === true) {
                    v.visible = false
                } 
            });
            break;

        // [D] 메모 변경
        case CHANGE_MEMO_REQUEST:
            draft.changeMemoLoading = true;
            draft.changeMemoDone = false;
            draft.changeMemoError = false;
            draft.memo = action.data;
            break;

        case CHANGE_MEMO_SUCCESS: {
            draft.changeMemoLoading = false;
            draft.changeMemoDone = true;
            draft.changeMemoError = false;
            break;
        }

        case CHANGE_MEMO_FAILURE:
            draft.changeMemoLoading = false;
            draft.changeMemoDone = false;
            draft.changeMemoError = true;
            break;


        default:
            break;
    }
});

export default reducer;

// TODO:
// 사이트 테마 변경