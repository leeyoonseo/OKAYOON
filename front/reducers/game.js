import { bucketUrl } from '../config/config';
import produce from '../util/produce';

// [D] 게임 리스트
export const STORE = 'store';
export const NONSENSE_QUIZ = 'nonsensequiz';
export const CATCH_MIND = 'catchmind';
export const PERSONALITY_TEST = 'personalitytest';

export const initialState = {
    // [D] 전체 게임 리스트
    gameList: [
        {
            name:  NONSENSE_QUIZ,
            title: "넌센스 퀴즈",
            image: `${bucketUrl}/game/nonsense/cover.png`,
        },
        {
            name: CATCH_MIND,
            title: "그림 퀴즈",
            image: `${bucketUrl}/game/catchmind/cover.png`,
        },  
        {
            name: PERSONALITY_TEST,
            title: "성격 테스트",
            image: `${bucketUrl}/game/personality/cover.png`,
        },   
    ],

    nonsenseData: [],
    catchmindData: [],

    // [D] 성격 테스트
    personalityTestData : [
        {
            round: 1,
            question: `마카롱 세트를 선물 받아서 가족과 함께 먹으려고한다. 다 같이 모여서 마카롱 포장을 뜯었는데,<br />
                        내가 좋아하는 맛의 마카롱이 하나 있었다. 이때 첫번째로 드는 생각이나 말은 무엇인가?`,
            example: [
                {
                    type: "1",
                    answer: `'이거 내가 좋아하는 맛인데!, 아싸!'`,
                },
                {
                    type: "2",
                    answer: `"다들 뭐 먹을 거야? 내가 이거 먹어도 돼?"`,
                },
                {
                    type: "3",
                    answer: "'아무거나 먹지 뭐'",
                },
            ]
        },
        {
            round: 2,
            question: "큰 실수를 저질렀다. 이때 드는 심정은?",
            example: [
                {
                    type: "a",
                    answer: "다음에는 그런 일이 생기지 않도록 상황을 정리한다.",
                },
                {
                    type: "b",
                    answer: "휴 생각은 나지만 별수 없다. 괜찮겠지..",
                },
                {
                    type: "c",
                    answer: "자꾸만 그 일이 생각나서 괴롭다.",
                },
            ]
        },
    ],

    // [D] 성격 테스트 결과
    personalityTestResult: [
        {   
            typeIndex: 3,
            type: "1a",
            title: "목표 달성에 가치를 두는 성취형",
            tag: ['성취자', '효율적인_사람', '성공주의자'],
            habit: ['이득이라니까', '윈윈이지'],
            description: `
                '목표 달성'을 무엇보다 중시합니다.<br />
                목표를 세우고,<br />
                그에 가까워지기 위해 최선으 다합니다.<br />
                자신에게 <span class="strong">득</span>이 될 것이 없다고<br />
                생각하는 사람은<br />
                쳐다보지도 않는 면이 있습니다.
            `,
        }, 
        {
            typeIndex: 7,
            type: "1b",
            title: "새로운 모험을 즐기는 낙천형",
            tag: ['낙천가', '밝은_사람', '낙천주의자'],
            habit: ['괜찮아, 괜찮아', '맞아, 맞아'],
            description: `
                인생에서 재미를 추구하는 <span class="strong">'자유인'</span>입니다.<br />
                흥미를 중시하기 때문에<br />
                다양한 분야에 관심을 가지고 뛰어듭니다.<br />
                <span class="strong">기획력</span>과 <span class="strong">표현력</span>이 뛰어나고<br />
                일 처리도 빠르지만,<br />
                정확도가 떨어지는 어려움도 있습니다.
            `,
        },
        {
            typeIndex: 8,
            type: "1c",
            title: "그야말로 리더인 사람, 리더형",
            tag: ['지도자', '강한_사람', '도전주의자'],
            habit: ['틀림없어', '한번 해 보자'],
            description: `
                다른 사람 위에 서는 것을 좋아하는<br />
                <span class="strong">'리더'</span> 타입입니다.<br />
                <span class="strong">승부</span>에 집착하며, 적군과 아군으ㅗ<br />
                타인을 구분하는 경향이 있습니다.<br />
                직감적이고 야생적인 행동력을 지녔으며,<br />
                빠르게 움직입니다.
            `,
        },
        {
            typeIndex: 1,
            type: "2a",
            title: "잘하고 싶어 하는 완벽형",
            tag: ['개혁가', '올곧은_사람', '완벽주의자'],
            habit: ['똑바로 좀 해', '00해야만 해'],
            description: `
                '개선 욕구'가 강한 사람입니다.<br />
                '주어진 일을 잘 해내고 싶어 하는 마음'이<br />
                가치의 중심에 있는 <span class="strong">완벽주의자</span>입니다.<br />
                모든 일을 선악, 흑백으로<br />
                확실히 구분하고 싶어 하는 성질이<br />
                있습니다.
            `,
        },
        {
            typeIndex: 2,
            type: "2b",
            title: "해 주고 싶어 하는 조력형",
            tag: ['조력자', '자상한_사람', '사람주의자'],
            habit: ['뭔가 그런 느낌이야', '느낌이 좋은데!'],
            description: `
                밝고 낙천적인 <span class="strong">'분위기 메이커'</span>입니다.<br />
                약한 사람에게 잘 다가가며,<br />
                곤경에 처한 사람에게는 손을 내밉니다.<br />
                모든 일을 감정적으로 판단하지만,<br />
                <span class="strong">평화</span>를 사랑하기 때문에 다툼을 피합니다.
            `,
        },
        {
            typeIndex: 6,
            type: "2c",
            title: "시뮬레이션을 하는 안전형",
            tag: ['충성가', '충직한_사람', '안전주의자'],
            habit: ['어, 정말 괜찮겠어?', '싫지는 않아'],
            description: `
                <span class="strong">'위험 회피'</span>의 달인입니다.<br />
                부지런하고, 자신이 어떻게 행동해야<br />
                지금 속한 조직이 잘 굴러갈지<br />
                고민할 줄 아는 사람입니다.<br />
                가족이나 조직을 지키고자 하는<br />
                <span class="strong">책임감</span>이 강하며, 다른사람을<br />
                보조하는 능력도 있습니다.
            `,
        },
        {
            typeIndex: 5,
            type: "3a",
            title: "사실을 추구하는 탐구형",
            tag: ['사색가', '현명한_사람', '관찰주의자'],
            habit: ['즉, 이런 것입니까?', '아, 아닙니다'],
            description: `
                무슨 일이든 <span class="strong">'사실을 기반으로'</span> 생각합니다.<br />
                정보 수집 능력과 집중력이 뛰어나지만,<br />
                관심이 없는 일은 쳐다보지도 않습니다.<br />
                <span class="strong">'다른 사람과의 관계'</span>를 생각하며<br />
                살지 않으므로 보고, 연락, 상담에 대한<br />
                개념이 없습니다.
            `,
        },
        {
            typeIndex: 9,
            type: "3b",
            title: "전체의 조화를 중시하는 조화형",
            tag: ['중재자', '조화로운_사람', '평화주의자'],
            habit: ['뭐든지 상관없어', '모르겠는데'],
            description: `
                어떤 자리든 그 곳의 균형이나<br />
                조화를 맞추어 줍니다.<br />
                성품이 온화하며 남들을 넉넉히 품어줄 만큼<br />
                <span class="strong">'수용적'</span>이고 <span class="strong">'수동적'</span>입니다.<br />
                자기의 뜻을 주장하려는 선택지 자체가 없으며,<br />
                항상 주변 사람들의 의견에 맞추어 줍니다.
            `,
        },
        {
            typeIndex: 4,
            type: "3c",
            title: "자기 본연의 모습을 지키고 싶어하는 독창형",
            tag: ['예술가', '독창적인_사람', '독창주의자'],
            habit: ['마음만 먹으면 할 수 있지 않아?', '그러는 건 실례 아니야?'],
            description: `
                <span class="strong">자신을 표현</span>하고 싶다는<br />
                열정으로 가득하며,<br />
                늘 이를 표출할 방법을 찾으려고 합니다.<br />
                다만, 열정이 넘치다 못해<br />
                주체할 수 없는 수준이라<br />
                자신의 상황에 일희일비할 때도 있습니다.
            `,
        },
    ],

    isMuted: false,

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
            const { name, quiz } = action.data;
            let data = (typeof quiz === 'object') ? quiz : []; 

            if (name === NONSENSE_QUIZ) {
                draft.nonsenseData = data;
            } else if (name === CATCH_MIND) {
                draft.catchmindData = data;
            }

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