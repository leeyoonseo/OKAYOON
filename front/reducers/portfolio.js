import { bucketUrl } from '../config/config';
import produce from '../util/produce';

export const initialState = {
    formData: [],

    navList: ['Home', 'Exprience', 'Portfolio', 'Contact'],

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
                React 학습 목적으로 제작한 포트폴리오 사이트<br/>
                기획~배포까지 전체 작업 진행<br/><br/>
                Nextjs로 환경 구축, Redux와 Redux-saga를 통해 데이터 상태 관리 및 통신 작업<br/>
                sequelize로 데이터베이스 생성부터 정적인 데이터 삽입 등 db 관리<br/>
                Passportjs로 어드민 로그인 구현, emailjs로 메일 발송기능 구현<br/>
                외부 api 사용을 통한 (심심이api) 채팅 구현 등의 작업<br>
                AWS EC2, S3, Route53을 사용하여 배포, pm2를 통한 프로세스 관리
            `,
            skils: [
                'next', 'react', 'redux', 'redux_saga',
                'styled_components', 'eslint', 'sequelize', 
                'mysql', 'html5', 'css3' 
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
            // [D] size는 src가 하나일때만 사용 가능(window.open에서 사용)
            size: ['800', '400'],
            src: 'https://recorder-9c060.web.app/', 
            desc: `
                리틀팍스 어학원에서 사용하는 녹음기 프론트엔드 담당<br/><br/>
                Audio Web API를 활용한 녹음 및 플레이어 기능 구현<br/>
                가입자에게만 공개되어있으므로 테스트를 위해 firebase를 사용하여 임시배포
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
                사내 솔루션 웹 서비스 프론트엔드 담당<br/>
                기획, 디자인, 프론트엔드 개발까지 진행<br/><br/>
                javascript, jQuery, vueJS로 개발 진행(vuejs 점진적 도입)<br/>
                보안 상 내부 네트워크에서만 확인가능하므로 테스트를 위해 firebase를 사용하여 임시배포
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
            src: 'https://www.littlefox.co.kr/ko/games/contents_list/DP001024',
            desc: `
                Construct와 Javascript를 사용하여 개발된 게임의 프론트엔드 담당<br/><br/>
                개편으로 인한 전체 코드 리팩터링 진행 및 신규 기능 개발 작업<br/>
                (사이트 접속 후 play를 눌러 확인할 수 있습니다.)
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
                사이트 프론트 개발 담당<br><br/>
                유지보수, 신규 페이지 개발, 기능 개발 작업<br/>
                브라우저 체크, 타이머, 팝업등의 기능 개발 후 컴포넌트화 작업
            `,
            skils: ['javascript', 'jquery', 'firebase', 'css3', 'html5'],
        },
        {
            name: '알서포브 브랜드사이트 | Remotecall 솔루션',
            image: [
                `${bucketUrl}/portfolio/site/portfolio_rsupport0.png`,
                `${bucketUrl}/portfolio/site/portfolio_rsupport1.png`,
                `${bucketUrl}/portfolio/site/portfolio_rsupport2.png`,
                `${bucketUrl}/portfolio/site/portfolio_rsupport3.png`,
            ],
            src: 'https://www.rsupport.com/ko-kr/',
            desc: `
                브랜드 사이트 유지보수(알서포트, 리모트콜, 리모트뷰, 타스, 라이트캠)<br/>
                솔루션 프로그램 Remotecall 프론트엔드 담당<br/><br/>
                워드프레스 기반의 사이트 유지보수, 신규 페이지 제작<br/>
                Taas 사이트 구축 시 전체 프론트 개발 작업<br/>
                솔루션의 원격 연결페이지, 어드민 페이지 작업
            `,
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