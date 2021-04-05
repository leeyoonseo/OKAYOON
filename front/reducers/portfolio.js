import { bucketUrl } from '../config/config';
import produce from '../util/produce';

export const initialState = {
    formData: [],

    navList: ['Home', 'I am', 'Portfolio', 'Contact'],

    tagData: [
        '주말_카공_얼죽아',
        '집순이',
        '견주_집사',
        '자유로움',
        'FPS',
    ],

    socialData: [
        {
            name: 'tstory',
            image: `${bucketUrl}/portfolio/icon_blog.png`,
            src: 'https://okayoon.tistory.com/',
        },
        {
            name: 'github',
            image: `${bucketUrl}/portfolio/icon_github.png`,
            src: 'https://github.com/leeyoonseo',
        },
        {
            name: 'instagram',
            image: `${bucketUrl}/portfolio/icon_instagram.png`,
            src: 'https://www.instagram.com/okayoon.lee/',
        },
    ],

    skilsData: [
        {
            name: 'javascript',
            src: `${bucketUrl}/portfolio/skils/icon_javascript.png`,
        },
        {
            name: 'jquery',
            src: `${bucketUrl}/portfolio/skils/icon_jquery.png`,
        },
        {
            name: 'nodejs',
            src: `${bucketUrl}/portfolio/skils/icon_nodejs.png`,
        },
        {
            name: 'react',
            src: `${bucketUrl}/portfolio/skils/icon_react.png`,
        },
        {
            name: 'redux',
            src: `${bucketUrl}/portfolio/skils/icon_redux.png`,
        },
        {
            name: 'redux_saga',
            src: `${bucketUrl}/portfolio/skils/icon_redux_saga.png`,
        },
        {
            title: 'Vue',
            src: `${bucketUrl}/portfolio/skils/icon_vue.png`,
        },
        {
            name: 'axios',
            src: `${bucketUrl}/portfolio/skils/icon_axios.png`,
        },
        {
            name: 'gulp',
            src: `${bucketUrl}/portfolio/skils/icon_gulp.png`,
        },
        {
            name: 'sequelize',
            src: `${bucketUrl}/portfolio/skils/icon_sequelize.png`,
        },
        {
            name: 'html',
            src: `${bucketUrl}/portfolio/skils/icon_html5.png`,
        },
        {
            name: 'css',
            src: `${bucketUrl}/portfolio/skils/icon_css3.png`,
        },
        {
            name: 'scss',
            src: `${bucketUrl}/portfolio/skils/icon_scss.png`,
        },
        
        {
            name: 'styled_components',
            src: `${bucketUrl}/portfolio/skils/icon_styled_components.png`,
        },
        {
            name: 'git',
            src: `${bucketUrl}/portfolio/skils/icon_git.png`,
        },
        {
            name: 'svn',
            src: `${bucketUrl}/portfolio/skils/icon_svn.png`,
        },
        {
            name: 'firebase',
            src: `${bucketUrl}/portfolio/skils/icon_firebase.png`,
        },
        {
            name: 'construct',
            src: `${bucketUrl}/portfolio/skils/icon_construct.png`,
        },
    ],

    portfolioData: [
        {
            name: 'OKAYOON',
            image: [
                `${bucketUrl}/portfolio/site/portfolio_site0.png`,
                `${bucketUrl}/portfolio/site/portfolio_site1.png`,
                `${bucketUrl}/portfolio/site/portfolio_site2.png`,
                `${bucketUrl}/portfolio/site/portfolio_site3.png`,
                `${bucketUrl}/portfolio/site/portfolio_site4.png`,
                `${bucketUrl}/portfolio/site/portfolio_site5.png`,
            ],
            src: 'http://www.okayoon.com', 
            desc: `
                React, Redux등 학습목적으로 만든 포트폴리오 사이트입니다.<br />
                기획부터 개발, 배포까지 작업하며 협업에 대한 이해도를 높일 수 있었습니다.<br /> 
                AWS EC2, S3, Route53을 사용하여 운영하고 있고 pm2로 프로세스 관리를 하고있습니다.
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
                `${bucketUrl}/portfolio/site/portfolio_recorder0.png`,
                `${bucketUrl}/portfolio/site/portfolio_recorder1.png`,
                `${bucketUrl}/portfolio/site/portfolio_recorder2.png`,
                `${bucketUrl}/portfolio/site/portfolio_recorder3.png`,
            ],
            src: 'https://recorder-9c060.web.app/', 
            desc: `
                리틀팍스 어학원에서 사용하는 녹음기 개발에 참여하였습니다.<br/>
                녹음 기능과 녹음한 파일을 들어볼 수 있는 기능이 있습니다.<br/>
                운영 서버는 가입자만 확인이 가능하기 때문에 firebase에서 테스트 할 수 있도록 추가 작업했습니다.<br />
                Audio Web API에 대해 공부할 수 있었습니다. 
            `,
            skils: ['javascript', 'jquery', 'firebase', 'css3', 'html5'],
        },
        {
            name: 'Newsletter (사내 솔루션)',
            image: [
                `${bucketUrl}/portfolio/site/portfolio_newsletter0.png`,
                `${bucketUrl}/portfolio/site/portfolio_newsletter1.png`,
                `${bucketUrl}/portfolio/site/portfolio_newsletter2.png`,
                `${bucketUrl}/portfolio/site/portfolio_newsletter3.png`,
                `${bucketUrl}/portfolio/site/portfolio_newsletter4.png`,
            ],
            src: 'https://toy-littlefox-newsletter.web.app/global', 
            desc: `
                타 부서와 협업 시 불편함을 개선하고자 만든 사이트 입니다.<br/>
                정적인 파일들을 서버에 올린 후, 필요한 영역의 코드들을 결합하여 아웃풋으로 제공합니다.<br/> 
                사이트의 목적은 정적인 파일의 버전관리와 개발자가 없이도 타 부서에 코드를 제공하기 위함입니다.<br/>
                Vue 학습 후 개인적으로 제작하여 팀의 허락을 받고 오픈했던 사이트이며<br/>
                보안 상 내부 네트워크에서만 운영이 되었기 때문에 firebase에서 테스트 할 수 있도록 추가 작업했습니다.
            `,
            skils: ['javascript', 'vue', 'jquery', 'firebase', 'html5', 'css3' ],
        },
        {
            name: '스타워즈 / 크로스워드 게임',
            image: [
                `${bucketUrl}/portfolio/site/portfolio_littlefox2.png`,
                `${bucketUrl}/portfolio/site/portfolio_littlefox3.png`,
                `${bucketUrl}/portfolio/site/portfolio_littlefox4.png`,
                `${bucketUrl}/portfolio/site/portfolio_littlefox5.png`,
            ],
            src: [
                'https://www.littlefox.co.kr/static/game/Starwords_v3/index.html?202103110949',
                'https://www.littlefox.co.kr/static/game/CrosswordPuzzle_v2/index.html?202012241016'
            ], 
            desc: `
                컨스트럭트와 Javascript를 이용해서 게임 개발 업무를 담당했습니다.<br/>
                개편으로 인해 전체 코드 리팩터링 및 기능 추가 업무를 진행했습니다.<br/>
                컨스트럭트는 HTML5 기반 게임편집기(게임엔진)입니다.<br/> 
            `,
            skils: ['javascript', 'jquery', 'firebase', 'css3', 'html5', 'construct'],
        },
        {
            name: '리틀팍스 사이트',
            image: [
                `${bucketUrl}/portfolio/site/portfolio_littlefox0.png`,
                `${bucketUrl}/portfolio/site/portfolio_littlefox1.png`,
            ],
            src: 'https://www.littlefox.co.kr/ko/main', 
            desc: `
                퍼블리싱&프론트 개발을 진행했습니다.<br/>
                유지보수, 페이지 제작 및 기능 추가, 컴포넌트 개발등의 업무를 맡았습니다.<br/> 
            `,
            skils: ['javascript', 'jquery', 'firebase', 'css3', 'html5', 'construct'],
        },
        {
            name: '알서포브 브랜드사이트 / Remotecall 솔루션',
            image: [
                `${bucketUrl}/portfolio/site/portfolio_rsupport0.png`,
                `${bucketUrl}/portfolio/site/portfolio_rsupport1.png`,
                `${bucketUrl}/portfolio/site/portfolio_rsupport2.png`,
                `${bucketUrl}/portfolio/site/portfolio_rsupport3.png`,
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