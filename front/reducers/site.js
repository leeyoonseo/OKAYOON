import produce from '../util/produce';

export const initialState = {
    modalpopupLoading: false,
    modalpopupDone: false,
    modalpopupError: false,

    // 모달 켜진 갯수 배열로 정리? 
    // [null, null, null, null, null]
    // index, x, y, content, 
    modals: null, 



    isMuted: false, // 음소거
    theme: null, // 사이트 테마


    battery: null,
    time: null,
};

// 사이트 테마 변경
// export const CHANGE_THEME_REQUEST = 'CHANGE_THEME_REQUEST';
// export const CHANGE_THEME_SUCCESS = 'CHANGE_THEME_SUCCESS';
// export const CHANGE_THEME_FAILURE = 'CHANGE_THEME_FAILURE';

export const CREATE_MODAL_REQUEST = 'CREATE_MODAL_REQUEST';
export const CREATE_MODAL_SUCCESS = 'CREATE_MODAL_SUCCESS';
export const CREATE_MODAL_FAILURE = 'CREATE_MODAL_FAILURE';

export const DELETE_MODAL_REQUEST = 'DELETE_MODAL_REQUEST';
export const DELETE_MODAL_SUCCESS = 'DELETE_MODAL_SUCCESS';
export const DELETE_MODAL_FAILURE = 'DELETE_MODAL_FAILURE';


// export const CHANGE_MUTED = 'CHANGE_MUTED'; // 음소거

const reducer = (state = initialState, action) => produce(state,(draft) => {
    switch(action.type){
        case CREATE_MODAL_REQUEST:
            draft.modalpopupLoading = true;
            draft.modalpopupDone = false;
            draft.modalpopupError = false;
            break;

        case CREATE_MODAL_SUCCESS:
            draft.modalpopupLoading = false;
            draft.modalpopupDone = true;
            draft.modalpopupError = false;
            break;

        case CREATE_MODAL_FAILURE:
            draft.modalpopupLoading = false;
            draft.modalpopupDone = false;
            draft.modalpopupError = true;
            break;

        // case CHANGE_THEME_REQUEST: 
        //     draft.changeThemeLoading = true;
        //     draft.changeThemeDone = false;
        //     draft.changeThemeError = false;

        //     break;

        // case CHANGE_THEME_SUCCESS: 
        //     draft.changeThemeLoading = false;
        //     draft.changeThemeDone = true;
        //     draft.changeThemeError = false;
        //     console.log('site reducers', action.data)
        //     draft.theme = action.data;

        //     break;

        // case CHANGE_THEME_FAILURE: 
        //     draft.changeThemeLoading = false;
        //     draft.changeThemeDone = false;
        //     draft.changeThemeError = true;

        //     break;

        default:
            break;
    }
});

export default reducer;