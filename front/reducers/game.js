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
            image: 'https://t1.daumcdn.net/cfile/tistory/992576355E29A72519',
            description: '퀴즈 식의 문답형 말장난, 당신의 센스를 알아보아요',
        },
        {
            name: 'catchmind',
            title: '그림 퀴즈',
            image: 'http://www.topdaily.kr/news/photo/201910/59899_24563_3844.jpg',
            description: '그림을 보고 정답을 맞춰봐요',
        },    
    ],
    isMuted: false,

    gameData: [
        // {
        //     question: '타이타닉의 구명 보트에는 몇 명이 탈수 있을까?',
        //     example: [{
        //         isCorrect: true,
        //         answer: '9명',
        //     },{
        //         isCorrect: false,
        //         answer: '6명'
        //     },{
        //         isCorrect: false,
        //         answer: '제로'
        //     },{
        //         isCorrect: false,
        //         answer: '몇'
        //     }],
        //     description: '9명(구명 보트)',
        // },
        // {
        //     question: '고기 먹을 때마다 따라오는 개는?',
        //     example: [{
        //         isCorrect: true,
        //         answer: '이쑤시개',
        //     },{
        //         isCorrect: false,
        //         answer: '고개'
        //     },{
        //         isCorrect: false,
        //         answer: '배고픈 개'
        //     },{
        //         isCorrect: false,
        //         answer: '나의사랑스러운 뽀미'
        //     }],
        //     description: '항상 카운터에서 기다리고 있죠^^',
        // },
        // {
        //     question: '진짜 새의 이름은 무엇일까요?',
        //     example: [{
        //         isCorrect: true,
        //         answer: '참새',
        //     },{
        //         isCorrect: false,
        //         answer: 'bird'
        //     },{
        //         isCorrect: false,
        //         answer: '진짜 새나이'
        //     },{
        //         isCorrect: false,
        //         answer: '무명'
        //     }],
        //     description: '참: 사실이나 이치에 조금도 어긋남이 없는 것.',
        // },
        // {
        //     question: '젖소와 강아지가 싸우면 누가 이기는가?',
        //     example: [{
        //         isCorrect: true,
        //         answer: '강아지',
        //     },{
        //         isCorrect: false,
        //         answer: '젖소'
        //     },{
        //         isCorrect: false,
        //         answer: '비긴다'
        //     },{
        //         isCorrect: false,
        //         answer: '안싸운다'
        //     }],
        //     description: '강아지(젖소曰: "내가 졌소", 강아지曰: "나 강하지")',
        // },
        // {
        //     question: '눈치코치란?',
        //     example: [{
        //         isCorrect: true,
        //         answer: '눈 때리고 코 때리고',
        //     },{
        //         isCorrect: false,
        //         answer: '눈치를 강조하여 속되게 이르는 말'
        //     },{
        //         isCorrect: false,
        //         answer: '겨울에 눈이 오면 추워서 코 나옴'
        //     },{
        //         isCorrect: false,
        //         answer: '눈치를 알려주는 코치님'
        //     }],
        //     description: '눈(치고=때리고)코(치고=때리고)',
        // },
        // {
        //     question: '세상에서 제일 더러운 집은?',
        //     example: [{
        //         isCorrect: true,
        //         answer: '똥집',
        //     },{
        //         isCorrect: false,
        //         answer: '누나 집'
        //     },{
        //         isCorrect: false,
        //         answer: '청소어벤져스에 나오는 쓰레기 집'
        //     },{
        //         isCorrect: false,
        //         answer: '고집'
        //     }],
        //     description: '다른 집들이 똥집보다 더 더러울수도~~',
        // },
    ],

    nunsenseGuideImages : [
        { 
            src: awsBucketBaseURL + 'nonsense_guide00.png', 
            alt : '넌센스: 게임 메인화면 설명',
        },
        { 
            src: awsBucketBaseURL + 'nonsense_guide01.png', 
            title : '넌센스: 게임 진행 화면 설명',
        },
        { 
            src: awsBucketBaseURL + 'nonsense_guide02_0.png', 
            title : '넌센스: 정답 시 설명',
        },
        { 
            src: awsBucketBaseURL + 'nonsense_guide02_1.png', 
            title : '넌센스: 오답 시 설명',
        },
        { 
            src: awsBucketBaseURL + 'nonsense_guide03.png', 
            title : '넌센스: 게임 종료 화면 설명',
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