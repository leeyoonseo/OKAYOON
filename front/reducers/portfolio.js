import produce from '../util/produce';

export const initialState = {
    formData: [],

    navList: ['Home', 'I am', 'Portfolio', 'Contact'],

    tagData: [
        '집사_견주',
        '집순이',
        '흥미로운',
        '카공_얼죽아',
        '오버워치',
    ],

    socialData: [
        {
            name: 'tstory',
            image: '../portfolio/icon_blog.png',
            src: 'https://okayoon.tistory.com/',
        },
        {
            name: 'github',
            image: '../portfolio/icon_github.png',
            src: 'https://github.com/leeyoonseo',
        },
        {
            name: 'instagram',
            image: '../portfolio/icon_instagram.png',
            src: 'https://www.instagram.com/okayoon.lee/',
        },
    ],

    skilsData: [
        {
            name: 'javascript',
            src: './portfolio/skils/icon_javascript.png',
        },
        {
            name: 'jquery',
            src: './portfolio/skils/icon_jquery.png',
        },
        {
            name: 'nodejs',
            src: './portfolio/skils/icon_nodejs.png',
        },
        {
            name: 'react',
            src: './portfolio/skils/icon_react.png',
        },
        {
            name: 'redux',
            src: './portfolio/skils/icon_redux.png',
        },
        {
            name: 'redux_saga',
            src: './portfolio/skils/icon_redux_saga.png',
        },
        {
            title: 'Vue',
            src: './portfolio/skils/icon_vue.png',
        },
        {
            name: 'axios',
            src: './portfolio/skils/icon_axios.png',
        },
        {
            name: 'gulp',
            src: './portfolio/skils/icon_gulp.png',
        },
        {
            name: 'sequelize',
            src: './portfolio/skils/icon_sequelize.png',
        },
        {
            name: 'html',
            src: './portfolio/skils/icon_html5.png',
        },
        {
            name: 'css',
            src: './portfolio/skils/icon_css3.png',
        },
        {
            name: 'scss',
            src: './portfolio/skils/icon_scss.png',
        },
        
        {
            name: 'styled_components',
            src: './portfolio/skils/icon_styled_components.png',
        },
        {
            name: 'git',
            src: './portfolio/skils/icon_git.png',
        },
        {
            name: 'svn',
            src: './portfolio/skils/icon_svn.png',
        },
        {
            name: 'firebase',
            src: './portfolio/skils/icon_firebase.png',
        },
        {
            name: 'construct',
            src: './portfolio/skils/icon_construct.png',
        },
    ],

    portfolioData: [
        {
            name: 'OKAYOON',
            image: [
                '../portfolio/site/portfolio_site0.png', 
                '../portfolio/site/portfolio_site1.png', 
                '../portfolio/site/portfolio_site2.png', 
                '../portfolio/site/portfolio_site3.png', 
                '../portfolio/site/portfolio_site4.png', 
                '../portfolio/site/portfolio_site5.png', 
            ],
            src: 'http://www.okayoon.com', 
            desc: `
                React, Redux등 학습목적으로 만든 포트폴리오 사이트입니다.<br />
                기획부터 개발까지 작업하여 협업 과정에 대해 더 많이 이해하는 시간이었습니다.<br /> 
                결론은, 굉장히 재미있는 작업이었습니다.
            `,
            skils: [
                'next', 'react', 'redux', 'redux_saga', 'axios', 
                'styled_components', 'eslint', 'dayjs', 'immer', 
                'sequelize', 'mysql', 'html5', 'css3' 
            ],
        },        
        {
            name: '어학원 녹음기',
            image: [
                '../portfolio/site/portfolio_recorder0.png', 
                '../portfolio/site/portfolio_recorder1.png', 
                '../portfolio/site/portfolio_recorder2.png', 
                '../portfolio/site/portfolio_recorder3.png', 
            ],
            src: 'https://recorder-9c060.web.app/', 
            desc: `
                리틀팍스 어학원에서 사용하는 녹음기 개발에 참여하였습니다.<br />
                가입자만 확인 가능하기 때문에 firebase에서 테스트 할 수 있도록 추가 작업했습니다.<br />
                Audio Web API에 대해 공부할 수 있었습니다. 
            `,
            skils: ['javascript', 'jquery', 'firebase', 'css3', 'html5'],
        },
        {
            name: 'Newsletter (사내 솔루션)',
            image: [
                '../portfolio/site/portfolio_newsletter0.png', 
                '../portfolio/site/portfolio_newsletter1.png', 
                '../portfolio/site/portfolio_newsletter2.png', 
                '../portfolio/site/portfolio_newsletter3.png', 
                '../portfolio/site/portfolio_newsletter4.png', 
            ],
            src: 'https://toy-littlefox-newsletter.web.app/global', 
            desc: `
                타 부서와 협업 시 불편함을 느끼고 개발한 사이트입니다.<br/>
                정적인 코드들을 통해 아웃풋을 확인하고 필요한 부분의 코드를 결합하여 제공합니다.<br />
                Vue 학습 후 개인적으로 제작하여 오픈했었던 사이트입니다.
            `,
            skils: ['javascript', 'vue', 'jquery', 'firebase', 'html5', 'css3' ],
        },
        {
            name: '리틀팍스 사이트 / 크로스워드, 스타워즈 게임',
            image: [
                '../portfolio/site/portfolio_littlefox0.png', 
                '../portfolio/site/portfolio_littlefox1.png', 
                '../portfolio/site/portfolio_littlefox2.png', 
                '../portfolio/site/portfolio_littlefox3.png', 
                '../portfolio/site/portfolio_littlefox4.png', 
                '../portfolio/site/portfolio_littlefox5.png', 
            ],
            src: 'https://www.littlefox.co.kr/ko/main', 
            desc: `
                사이트 프론트엔드 개발을 진행했습니다.<br />
                자주 사용하는 기능들을 컴포넌트로 개발하였습니다.<br />
                컨스트럭트와 js로 개발된 게임들을 리팩토링 및 추가 개발하였습니다.<br />
                컨스트럭트는 HTML5 기반 게임편집기(게임엔진)입니다.<br /> 
                처음 접하는 툴이었지만 좋은 경험이었습니다. 
            `,
            skils: ['javascript', 'jquery', 'firebase', 'css3', 'html5', 'construct'],
        },
        {
            name: '알서포브 브랜드사이트 / Remotecall 솔루션',
            image: [
                '../portfolio/site/portfolio_rsupport0.png', 
                '../portfolio/site/portfolio_rsupport1.png', 
                '../portfolio/site/portfolio_rsupport2.png', 
                '../portfolio/site/portfolio_rsupport3.png', 
            ],
            src: 'https://www.rsupport.com/ko-kr/', 
            desc: '알서포트 브랜드 사이트와 자사 솔루션 Remotecall 프론트엔드 담당이었습니다.',
            skils: ['javascript', 'jquery', 'css3', 'html5' ],
        },
    ],

    sendMailLoading: false,
    sendMailDone: false,
    sendMailError: false,
};

// [D] 권한요청
export const SEND_MAIL_REQUEST = 'SEND_MAIL_REQUEST';
export const SEND_MAIL_SUCCESS = 'SEND_MAIL_SUCCESS';
export const SEND_MAIL_FAILURE = 'SEND_MAIL_FAILURE';

const reducer = (state = initialState, action) => produce(state,(draft) => {
    switch(action.type){

        // [D] 방명록 가져오기
        case SEND_MAIL_REQUEST:
            draft.sendMailLoading = true;
            draft.sendMailDone = false;
            draft.sendMailError = false;
            break;

        case SEND_MAIL_SUCCESS:
            draft.sendMailLoading = false;
            draft.sendMailDone = true;
            draft.sendMailError = false;
            break;

        case SEND_MAIL_FAILURE:
            draft.sendMailLoading = false;
            draft.sendMailDone = false;
            draft.sendMailError = true;
            break;
        
        default:
            break;
    }
});

export default reducer;