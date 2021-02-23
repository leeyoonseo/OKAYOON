import produce from '../util/produce';

// [D] 게임 리스트
export const STORE = 'store';
export const NONSENSE_QUIZ = 'nonsenseQuiz';
export const CATCH_MIND = 'catchMind';

export const initialState = {
    gameList: [
        {
            gameId: 'game_nonsense',
            name: NONSENSE_QUIZ,
            image: 'https://t1.daumcdn.net/cfile/tistory/992576355E29A72519',
            title: '넌센스 퀴즈',
            description: '당신의 센스를 알아봐요!',
        },
        {
            gameId: 'game_catch',
            name: CATCH_MIND,
            image: 'https://mblogthumb-phinf.pstatic.net/MjAxOTA4MTlfMTk4/MDAxNTY2MTQ3MTQ4OTE5.WIdEWyPeeJZ1_zRVl-eeotpKwzSjT_mV9iiXIa5h94Ig.fx0CEkPUMA5pNCGjtRfguv2Mjr4tvoXpHEWsnjF81B8g.JPEG.muhan_jilju/190805_%EB%84%A4%EC%9D%B4%EB%B2%84_bnr_main%EB%8C%80%EB%AC%B8.jpg?type=w800',
            title: '그림 퀴즈',
            description: '추억의 캐치마인드! 그림을 보고 정답을 맞춰봐요~',
        },    
    ],
    isMuted: false,

    nonsenseQuiz: [
        {
            quiz: '타이타닉의 구명 보트에는 몇 명이 탈수 있을까?',
            answer: '9명',
            wrongAnswer: ['6명', '몇 명', '제로'],
            description: '9명(구명 보트)',
            image: 'http://www.polinews.co.kr/data/photos/20200207/art_15815643276382_3c7422.jpg',
        },
        {
            quiz: '고기 먹을 때마다 따라오는 개는?',
            answer: '이쑤시개',
            wrongAnswer: ['고개', '갈빗대가 상한 개', '우리집 개'],
            description: '항상 카운터에서 기다리고 있죠^^',
            image: 'https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/yB0/image/ColS0Bp-1_e8LooI0XXE1hyV4HM',
        },
        {
            quiz: '진짜 새의 이름은 무엇일까요?',
            answer: '참새',
            wrongAnswer: ['bird', '진짜 새', '무명'],
            description: '참: 사실이나 이치에 조금도 어긋남이 없는 것.',
            image: 'https://dictionary.cambridge.org/images/thumb/bird_noun_001_01476.jpg?version=5.0.152',
        },
        {
            quiz: '젖소와 강아지가 싸우면 누가 이기는가?',
            answer: '강아지',
            wrongAnswer: ['젖소', '비긴다', '안싸운다'],
            description: '강아지(젖소曰: "내가 졌소", 강아지曰: "나 강하지")',
            image: 'https://t1.daumcdn.net/cfile/blog/146AEF1A4A5E8D1E7A',
        },
        {
            quiz: '눈치코치란?',
            answer: '눈 때리고 코 때리고',
            wrongAnswer: ['눈치를 강조하여 속되게 이르는 말.', '겨울에 눈이 오면 추워서 나오는 코 풀기', '눈치를 알려주는 코치님'],
            description: '강아지("너 졌소", "나 강하지")',
            image: 'https://lh3.googleusercontent.com/proxy/QOJBH3ppURZ1PdOWhTuoDoLBBtvJ7C3YI_JHPwgWyYiP2boUwCNq8CWOGJe1k0HFGOlVlzZG3orJaEbQqy370EbnK3uPhwM4C_jFhUYPtA7HPus0rUX8lzzcQD-eK-o6fCQXFdakExxhPbFvDHaLK7OhXz3YfjVpOKKlnaRFHklzURipOAtm',
        },
        {
            quiz: '세상에서 제일 더러운 집은?',
            answer: '똥집',
            wrongAnswer: ['우리 누나 집', '청소어벤져스에 나오는 쓰레기 집', '고집'],
            description: '다른 집들이 똥집보다 더 더러울수도~~',
            image: 'https://s3.ap-northeast-2.amazonaws.com/img.kormedi.com/news/article/__icsFiles/artimage/2018/03/23/c_km601/shutterstock_423841075_540.jpg',
        },
    ],
    
    // [D] 게임 리스트 가져오기
    loadGameListLoading: false,
    loadGameListDone: false,
    loadGameListError: false,

    // [D] 게임 데이터 가져오기
    // loadGameLoading: false,
    // loadGameDone: false,
    // loadGameError: false,
};

// [D] 게임 리스트 가져오기
export const LOAD_GAMELIST_REQUEST = 'LOAD_GAMELIST_REQUEST';
export const LOAD_GAMELIST_SUCCESS = 'LOAD_GAMELIST_SUCCESS';
export const LOAD_GAMELIST_FAILURE = 'LOAD_GAMELIST_FAILURE';

const reducer = (state = initialState, action) => produce(state,(draft) => {
    switch(action.type){
        // [D] 게임 리스트 가져오기
        case LOAD_GAMELIST_REQUEST:
            draft.loadGameListLoading = true;
            draft.loadGameListDone = false;
            draft.loadGameListError = false;
            break;

        case LOAD_GAMELIST_SUCCESS:
            draft.loadGameListLoading = false;
            draft.loadGameListDone = true;
            draft.loadGameListError = false;
            break;

        case LOAD_GAMELIST_FAILURE:
            draft.loadGameListLoading = false;
            draft.loadGameListDone = false;
            draft.loadGameListError = true;
            break;

        default:
            break;
    }
});

export default reducer;