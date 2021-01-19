import produce from '../util/produce';

export const initialState = {
    changeThemeLoading: false, // 테마 변경 시도 중
    changeThemeDone: false,
    changeThemeError: false,

    theme: null, // 사이트 테마

    battery: null,
    time: null,
};

// 사이트 테마 변경
export const CHANGE_THEME_REQUEST = 'CHANGE_THEME_REQUEST';
export const CHANGE_THEME_SUCCESS = 'CHANGE_THEME_SUCCESS';
export const CHANGE_THEME_FAILURE = 'CHANGE_THEME_FAILURE';

const reducer = (state = initialState, action) => produce(state,(draft) => {
    switch(action.type){
        case CHANGE_THEME_REQUEST: 
            draft.changeThemeLoading = true;
            draft.changeThemeDone = false;
            draft.changeThemeError = false;

            break;

        case CHANGE_THEME_SUCCESS: 
            draft.changeThemeLoading = false;
            draft.changeThemeDone = true;
            draft.changeThemeError = false;
            console.log('site reducers', action.data)
            draft.theme = action.data;

            break;

        case CHANGE_THEME_FAILURE: 
            draft.changeThemeLoading = false;
            draft.changeThemeDone = false;
            draft.changeThemeError = true;

            break;
    }
});

export default reducer;