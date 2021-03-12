import produce from '../util/produce';

// [D] 게임 리스트
// export const GAME_LIST = 'gamelist';
export const STORE = 'store';
export const NONSENSE_QUIZ = 'nonsensequiz';
export const CATCH_MIND = 'catchmind';

// [D] S3
const awsBucketBaseURL = 'https://okayoon-bucket.s3.ap-northeast-2.amazonaws.com/';

export const initialState = {
    gameList: [
        {
            name:  'nonsensequiz',
            title: '넌센스 퀴즈',
            image: '../game/nonsense/cover.png',
        },
        {
            name: 'catchmind',
            title: '그림 퀴즈',
            image: 'http://www.topdaily.kr/news/photo/201910/59899_24563_3844.jpg',
        },    
    ],
    isMuted: false,

    gameData: [],

    nunsenseGuideImages : [
        // { 
        //     src: awsBucketBaseURL + 'nonsense_guide00.png', 
        //     alt : '넌센스: 게임 메인화면 설명',
        // },
        // { 
        //     src: awsBucketBaseURL + 'nonsense_guide01.png', 
        //     title : '넌센스: 게임 진행 화면 설명',
        // },
        // { 
        //     src: awsBucketBaseURL + 'nonsense_guide02_0.png', 
        //     title : '넌센스: 정답 시 설명',
        // },
        // { 
        //     src: awsBucketBaseURL + 'nonsense_guide02_1.png', 
        //     title : '넌센스: 오답 시 설명',
        // },
        // { 
        //     src: awsBucketBaseURL + 'nonsense_guide03.png', 
        //     title : '넌센스: 게임 종료 화면 설명',
        // },

        // [D] dev
        { 
            src: '../../game/nonsense/guide_0.png', 
            alt : '넌센스: 게임 메인화면 설명',
        },
        { 
            src: '../../game/nonsense/guide_1.png', 
            title : '넌센스: 게임 진행 화면 설명',
        },
        { 
            src: '../../game/nonsense/guide_2.png', 
            title : '넌센스: 결과화면',
        },
    ],

    // [D] 특정 게임 데이터 가져오기
    loadGameLoading: false,
    loadGameDone: false,
    loadGameError: false,

    // [D] 특정 게임 데이터 추가하기
    addGameLoading: false,
    addGameDone: false,
    addGameError: false,
};

// [D] 특정 게임 데이터 가져오기
export const LOAD_GAME_REQUEST = 'LOAD_GAME_REQUEST';
export const LOAD_GAME_SUCCESS = 'LOAD_GAME_SUCCESS';
export const LOAD_GAME_FAILURE = 'LOAD_GAME_FAILURE';

// [D] 특정 게임 데이터 추가하기
export const ADD_GAME_REQUEST = 'ADD_GAME_REQUEST';
export const ADD_GAME_SUCCESS = 'ADD_GAME_SUCCESS';
export const ADD_GAME_FAILURE = 'ADD_GAME_FAILURE';

const reducer = (state = initialState, action) => produce(state,(draft) => {
    switch(action.type){

        // [D] 특정 게임 데이터 가져오기
        case LOAD_GAME_REQUEST:
            draft.loadGameLoading = true;
            draft.loadGameDone = false;
            draft.loadGameError = false;
            break;

        case LOAD_GAME_SUCCESS: {
            draft.gameData = (typeof action.data === 'object') ? action.data : [];
            draft.loadGameLoading = false;
            draft.loadGameDone = true;
            draft.loadGameError = false;
            break;
        }

        case LOAD_GAME_FAILURE:
            draft.loadGameLoading = false;
            draft.loadGameDone = false;
            draft.loadGameError = true;
            break;

        // [D] 특정 게임 데이터 추가하기
        case ADD_GAME_REQUEST:
            draft.addGameLoading = true;
            draft.addGameDone = false;
            draft.addGameError = false;
            break;

        case ADD_GAME_SUCCESS: {
            draft.addGameLoading = false;
            draft.addGameDone = true;
            draft.addGameError = false;
            break;
        }

        case ADD_GAME_FAILURE:
            draft.addGameLoading = false;
            draft.addGameDone = false;
            draft.addGameError = true;
            break;

        default:
            break;
    }
});

export default reducer;