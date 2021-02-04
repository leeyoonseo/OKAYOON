import produce from '../util/produce';

export const initialState = {

    guestbook: [
        {
            nickname: '할로아',
            avatar: null,
            content : '콘텐츠 작성을 해보겠습니다. 반가워요^^',
            createDt: '2020.04.11 AM 11:12',
            password: '1234',
        },
        {
            nickname: '고스톱을치러가볼까고스톱을치러가볼까',
            avatar: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
            // D 이거 최대글자임
            content : '반가워요^^반가워요^^반가워요^^반가워요^^반가워요^^반가워요^^반가워요^^반가워요^^반가워요^^반가워요^^반가워요^^반가워요^^반가워요^^반가워요^^반가워요^^반가워요^^반가워요',
            createDt: '2020.04.11 PM 03:12',
            password: '0000',
        },
        {
            nickname: 'da가나다',
            avatar: null,
            content : '콘텐츠 작성을 해보겠습니다. 반가워요^^',
            createDt: '2020.04.11 AM 11:12',
            password: 'da',
        },
    ],
    
    addGuestbookLoading: false,
    addGuestbookDone: false,
    addGuestbookError: false,

    loadGuestbookLoading: false,
    loadGuestbookDone: false,
    loadGuestbookError: false,
};

export const ADD_GUESTBOOK_REQUEST = 'ADD_GUESTBOOK_REQUEST';
export const ADD_GUESTBOOK_SUCCESS = 'ADD_GUESTBOOK_SUCCESS';
export const ADD_GUESTBOOK_FAILURE = 'ADD_GUESTBOOK_FAILURE';

export const LOAD_GUESTBOOK_REQUEST = 'LOAD_GUESTBOOK_REQUEST';
export const LOAD_GUESTBOOK_SUCCESS = 'LOAD_GUESTBOOK_SUCCESS';
export const LOAD_GUESTBOOK_FAILURE = 'ADD_GUESTBOOK_FAILURE';

const reducer = (state = initialState, action) => produce(state,(draft) => {
    switch(action.type){
        case ADD_GUESTBOOK_REQUEST:
            draft.addGuestbookLoading = true;
            draft.addGuestbookDone = false;
            draft.addGuestbookError = false;
            break;

        case ADD_GUESTBOOK_SUCCESS:
            draft.addGuestbookLoading = false;
            draft.addGuestbookDone = true;
            draft.addGuestbookError = false;

            break;

        case ADD_GUESTBOOK_FAILURE:
            draft.addGuestbookLoading = false;
            draft.addGuestbookDone = false;
            draft.addGuestbookError = true;
            break;

        case ADD_GUESTBOOK_REQUEST:
            draft.loadGuestbookLoading = true;
            draft.loadGuestbookDone = false;
            draft.loadGuestbookError = false;
            break;

        case ADD_GUESTBOOK_SUCCESS:
            draft.loadGuestbookLoading = false;
            draft.loadGuestbookDone = true;
            draft.loadGuestbookError = false;

            break;

        case ADD_GUESTBOOK_FAILURE:
            draft.loadGuestbookLoading = false;
            draft.loadGuestbookDone = false;
            draft.loadGuestbookError = true;
            break;

        default:
            break;
    }
});

export default reducer;

// TODO:
// 사이트 테마 변경