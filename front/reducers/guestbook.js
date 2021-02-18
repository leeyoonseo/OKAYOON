import produce from '../util/produce';

export const initialState = {

    guestbook: [
        // {
        //     nickname: '할로아',
        //     avatar: null,
        //     content : '콘텐츠 작성을 해보겠습니다. 반가워요^^',
        //     createdAt: '2020.04.11 AM 11:12',
        //     password: '1234',
        //     comment: [
        //         {
        //             nickname: '테스트1',
        //             avatar: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        //             password: '1234',
        //             content: '댓글입니다.',
        //             createDt: '2020.04.11 AM 11:12',
        //         },
        //         {
        //             nickname: '도롱뇽',
        //             avatar: null,
        //             password: '1234',
        //             content: '오늘도 좋은하루 되십쇼',
        //             createDt: '2020.04.11 pm 3:12',
        //         }
        //     ]
        // },
        // {
        //     nickname: '고스톱을치러가볼까고스톱을치러가볼까',
        //     avatar: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        //     // D 이거 최대글자임
        //     content : '반가워요^^반가워요^^반가워요^^반가워요^^반가워요^^반가워요^^반가워요^^반가워요^^반가워요^^반가워요^^반가워요^^반가워요^^반가워요^^반가워요^^반가워요^^반가워요^^반가워요',
        //     createDt: '2020.04.11 PM 03:12',
        //     password: '0000',
        //     comment: [],
        // },
        // {
        //     nickname: 'da가나다',
        //     avatar: null,
        //     content : '콘텐츠 작성을 해보겠습니다. 반가워요^^',
        //     createDt: '2020.04.11 AM 11:12',
        //     password: 'da',
        //     comment: [],
        //     },
    ],
    
    // TODO: 같이 사용가능한 state 정리하기
    loadGuestbookLoading: false,
    loadGuestbookDone: false,
    loadGuestbookError: false,

    addGuestbookLoading: false,
    addGuestbookDone: false,
    addGuestbookError: false,

    editGuestbookLoading: false,
    editGuestbookDone: false,
    editGuestbookError: false,

    removeGuestbookLoading: false,
    removeGuestbookDone: false,
    removeGuestbookError: false,

    // TODO: 코멘트도 load하기
    loadCommentLoading: false,
    loadCommentDone: false,
    loadCommentError: false,

    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: false,

    editCommentLoading: false,
    editCommentDone: false,
    editCommentError: false,

    removeCommentLoading: false,
    removeCommentDone: false,
    removeCommentError: false,

    
};

export const LOAD_GUESTBOOK_REQUEST = 'LOAD_GUESTBOOK_REQUEST';
export const LOAD_GUESTBOOK_SUCCESS = 'LOAD_GUESTBOOK_SUCCESS';
export const LOAD_GUESTBOOK_FAILURE = 'ADD_GUESTBOOK_FAILURE';

export const ADD_GUESTBOOK_REQUEST = 'ADD_GUESTBOOK_REQUEST';
export const ADD_GUESTBOOK_SUCCESS = 'ADD_GUESTBOOK_SUCCESS';
export const ADD_GUESTBOOK_FAILURE = 'ADD_GUESTBOOK_FAILURE';

export const EDIT_GUESTBOOK_REQUEST = 'EDIT_GUESTBOOK_REQUEST';
export const EDIT_GUESTBOOK_SUCCESS = 'EDIT_GUESTBOOK_SUCCESS';
export const EDIT_GUESTBOOK_FAILURE = 'EDIT_GUESTBOOK_FAILURE';

export const REMOVE_GUESTBOOK_REQUEST = 'REMOVE_GUESTBOOK_REQUEST';
export const REMOVE_GUESTBOOK_SUCCESS = 'REMOVE_GUESTBOOK_SUCCESS';
export const REMOVE_GUESTBOOK_FAILURE = 'REMOVE_GUESTBOOK_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const EDIT_COMMENT_REQUEST = 'EDIT_COMMENT_REQUEST';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const EDIT_COMMENT_FAILURE = 'EDIT_COMMENT_FAILURE';

export const REMOVE_COMMENT_REQUEST = 'REMOVE_COMMENT_REQUEST';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAILURE = 'REMOVE_COMMENT_FAILURE';

const reducer = (state = initialState, action) => produce(state,(draft) => {
    switch(action.type){
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
            
        case ADD_GUESTBOOK_REQUEST:
            draft.addGuestbookLoading = true;
            draft.addGuestbookDone = false;
            draft.addGuestbookError = false;
            break;

        case ADD_GUESTBOOK_SUCCESS:
            draft.addGuestbookLoading = false;
            draft.addGuestbookDone = true;
            draft.addGuestbookError = false;
            draft.guestbook.unshift(action.data);
            break;

        case ADD_GUESTBOOK_FAILURE:
            draft.addGuestbookLoading = false;
            draft.addGuestbookDone = false;
            draft.addGuestbookError = true;
            break;

        case EDIT_GUESTBOOK_REQUEST:
            draft.editGuestbookLoading = true;
            draft.editGuestbookDone = false;
            draft.editGuestbookError = false;
            break;

        case EDIT_GUESTBOOK_SUCCESS:
            draft.guestbook.unshift(action.data);

            draft.editGuestbookLoading = false;
            draft.editGuestbookDone = true;
            draft.editGuestbookError = false;
            break;

        case EDIT_GUESTBOOK_FAILURE:
            draft.editGuestbookLoading = false;
            draft.editGuestbookDone = false;
            draft.editGuestbookError = true;
            break;

        case REMOVE_GUESTBOOK_REQUEST:
            draft.removeGuestbookLoading = true;
            draft.removeGuestbookDone = false;
            draft.removeGuestbookError = false;
            break;

        case REMOVE_GUESTBOOK_SUCCESS: {
            // TODO: id찾기, db 테이블 명으로 변경
            // draft.guestbook = draft.guestbook.filter((v) => v.id !== action.data.GuestbookId);

            draft.removeGuestbookLoading = false;
            draft.removeGuestbookDone = true;
            draft.removeGuestbookError = false;
            break;
        }

        case REMOVE_GUESTBOOK_FAILURE:
            draft.removeGuestbookLoading = false;
            draft.removeGuestbookDone = false;
            draft.removeGuestbookError = true;
            break;

        case ADD_COMMENT_REQUEST:
            draft.addCommentLoading = true;
            draft.addCommentDone = false;
            draft.addCommentError = false;
            break;

        case ADD_COMMENT_SUCCESS: {
            // TODO: id찾기, db 테이블 명으로 변경
            // const guestbook = draft.guestbook.find((v) => v.id === action.data.id);
            // guestbook.Comments.unshift(action.data);

            draft.addCommentLoading = false;
            draft.addCommentDone = true;
            draft.addCommentError = false;
            break;
        }

        case ADD_COMMENT_FAILURE:
            draft.addCommentLoading = false;
            draft.addCommentDone = false;
            draft.addCommentError = true;
            break;

        case EDIT_COMMENT_REQUEST:
            draft.EditCommentLoading = true;
            draft.EditCommentDone = false;
            draft.EditCommentError = false;
            break;

        case EDIT_COMMENT_SUCCESS: {
            // TODO: id찾기, db 테이블 명으로 변경
            // const guestbook = draft.guestbook.find((v) => v.id === action.data.id);
            // guestbook.Comments.unshift(action.data);

            draft.EditCommentLoading = false;
            draft.EditCommentDone = true;
            draft.EditCommentError = false;
            break;
        }

        case EDIT_COMMENT_FAILURE:
            draft.EditCommentLoading = false;
            draft.EditCommentDone = false;
            draft.EditCommentError = true;
            break;
        
        case REMOVE_COMMENT_REQUEST:
            draft.removeCommentLoading = true;
            draft.removeCommentDone = false;
            draft.removeCommentError = false;
            break;

        case REMOVE_COMMENT_SUCCESS: {
            // TODO: id찾기, db 테이블 명으로 변경
            // draft.Comment = draft.Comment.filter((v) => v.id !== action.data.CommentId);

            draft.removeCommentLoading = false;
            draft.removeCommentDone = true;
            draft.removeCommentError = false;
            break;
        }

        case REMOVE_COMMENT_FAILURE:
            draft.removeCommentLoading = false;
            draft.removeCommentDone = false;
            draft.removeCommentError = true;
            break;

        default:
            break;
    }
});

export default reducer;

// TODO:
// 사이트 테마 변경