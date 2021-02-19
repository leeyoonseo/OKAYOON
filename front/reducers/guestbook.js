import produce from '../util/produce';

export const initialState = {

    guestbook: [],

    // [D] 권한요청하기
    getPermissionLoading: false,
    getPermissionDone: false,
    getPermissionError: false,
    
    // [D] 방명록 가져오기
    loadGuestbookLoading: false,
    loadGuestbookDone: false,
    loadGuestbookError: false,

    // [D] 방명록 작성
    addGuestbookLoading: false,
    addGuestbookDone: false,
    addGuestbookError: false,

    // [D] 방명록 수정
    updateGuestbookLoading: false,
    updateGuestbookDone: false,
    updateGuestbookError: false,

    // [D] 방명록 삭제
    deleteGuestbookLoading: false,
    deleteGuestbookDone: false,
    deleteGuestbookError: false,

    // [D] 방명록 수정
    editGuestbookLoading: false,
    editGuestbookDone: false,
    editGuestbookError: false,

    // [D] 댓글 등록
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: false,
};

// [D] 권한요청
export const GET_PERMISSION_REQUEST = 'GET_PERMISSION_REQUEST';
export const GET_PERMISSION_SUCCESS = 'GET_PERMISSION_SUCCESS';
export const GET_PERMISSION_FAILURE = 'GET_PERMISSION_FAILURE';

// [D] 방명록 가져오기
export const LOAD_GUESTBOOK_REQUEST = 'LOAD_GUESTBOOK_REQUEST';
export const LOAD_GUESTBOOK_SUCCESS = 'LOAD_GUESTBOOK_SUCCESS';
export const LOAD_GUESTBOOK_FAILURE = 'LOAD_GUESTBOOK_FAILURE';

// [D] 방명록 작성
export const ADD_GUESTBOOK_REQUEST = 'ADD_GUESTBOOK_REQUEST';
export const ADD_GUESTBOOK_SUCCESS = 'ADD_GUESTBOOK_SUCCESS';
export const ADD_GUESTBOOK_FAILURE = 'ADD_GUESTBOOK_FAILURE';

// [D] 방명록 수정
export const UPDATE_GUESTBOOK_REQUEST = 'UPDATE_GUESTBOOK_REQUEST';
export const UPDATE_GUESTBOOK_SUCCESS = 'UPDATE_GUESTBOOK_SUCCESS';
export const UPDATE_GUESTBOOK_FAILURE = 'UPDATE_GUESTBOOK_FAILURE';

// [D] 방명록 삭제
export const DELETE_GUESTBOOK_REQUEST = 'DELETE_GUESTBOOK_REQUEST';
export const DELETE_GUESTBOOK_SUCCESS = 'DELETE_GUESTBOOK_SUCCESS';
export const DELETE_GUESTBOOK_FAILURE = 'DELETE_GUESTBOOK_FAILURE';

// [D] 댓글 등록
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

const reducer = (state = initialState, action) => produce(state,(draft) => {
    switch(action.type){
        // [D] 권한요청하기
        case GET_PERMISSION_REQUEST:
            draft.getPermissionLoading = true;
            draft.getPermissionDone = false;
            draft.getPermissionError = false;
            break;

        case GET_PERMISSION_SUCCESS:
            draft.guestbook.map((v) => {
                if (v.id === action.data) {
                    return v.edit = true;
                }

                v.edit !== null && delete v.edit;
            });

            draft.getPermissionLoading = false;
            draft.getPermissionDone = true;
            draft.getPermissionError = false;
            break;

        case GET_PERMISSION_FAILURE:
            draft.getPermissionLoading = false;
            draft.getPermissionDone = false;
            draft.getPermissionError = true;
            break;

        // [D] 방명록 가져오기
        case LOAD_GUESTBOOK_REQUEST:
            draft.loadGuestbookLoading = true;
            draft.loadGuestbookDone = false;
            draft.loadGuestbookError = false;
            break;

        case LOAD_GUESTBOOK_SUCCESS:
            draft.loadGuestbookLoading = false;
            draft.loadGuestbookDone = true;
            draft.loadGuestbookError = false;
            draft.guestbook = action.data;
            break;

        case LOAD_GUESTBOOK_FAILURE:
            draft.loadGuestbookLoading = false;
            draft.loadGuestbookDone = false;
            draft.loadGuestbookError = true;
            break;
            
        // [D] 방명록 작성
        case ADD_GUESTBOOK_REQUEST:
            draft.addGuestbookLoading = true;
            draft.addGuestbookDone = false;
            draft.addGuestbookError = false;
            break;

        case ADD_GUESTBOOK_SUCCESS:
            draft.guestbook.unshift(action.data);
            
            draft.addGuestbookLoading = false;
            draft.addGuestbookDone = true;
            draft.addGuestbookError = false;
            break;

        case ADD_GUESTBOOK_FAILURE:
            draft.addGuestbookLoading = false;
            draft.addGuestbookDone = false;
            draft.addGuestbookError = true;
            break;

        // [D] 방명록 수정
        case UPDATE_GUESTBOOK_REQUEST:
            draft.updateGuestbookLoading = true;
            draft.updateGuestbookDone = false;
            draft.updateGuestbookError = false;
            break;

        case UPDATE_GUESTBOOK_SUCCESS:
            // const guestbook = draft.guestbook.filter((v, i) => v.id !== action.data);
            
            draft.updateGuestbookLoading = false;
            draft.updateGuestbookDone = true;
            draft.updateGuestbookError = false;
            break;

        case UPDATE_GUESTBOOK_FAILURE:
            draft.updateGuestbookLoading = false;
            draft.updateGuestbookDone = false;
            draft.updateGuestbookError = true;
            break;

        // [D] 방명록 삭제
        case DELETE_GUESTBOOK_REQUEST:
            draft.deleteGuestbookLoading = true;
            draft.deleteGuestbookDone = false;
            draft.deleteGuestbookError = false;
            break;

        case DELETE_GUESTBOOK_SUCCESS:
            draft.guestbook = draft.guestbook.filter((v, i) => v.id !== action.data);
            
            draft.deleteGuestbookLoading = false;
            draft.deleteGuestbookDone = true;
            draft.deleteGuestbookError = false;
            break;

        case DELETE_GUESTBOOK_FAILURE:
            draft.deleteGuestbookLoading = false;
            draft.deleteGuestbookDone = false;
            draft.deleteGuestbookError = true;
            break;

        // [D] 댓글 등록하기
        case ADD_COMMENT_REQUEST:
            draft.addCommentLoading = true;
            draft.addCommentDone = false;
            draft.addCommentError = false;
            break;

        case ADD_COMMENT_SUCCESS:
            const guestbook = draft.guestbook.find((v) => v.id === action.data.GuestbookId);
            guestbook.Comments.unshift(action.data);

            draft.addCommentLoading = false;
            draft.addCommentDone = true;
            draft.addCommentError = false;
            break;

        case ADD_COMMENT_FAILURE:
            draft.addCommentLoading = false;
            draft.addCommentDone = false;
            draft.addCommentError = true;
            break;

        default:
            break;
    }
});

export default reducer;

// TODO:
// 사이트 테마 변경