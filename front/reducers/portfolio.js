import produce from '../util/produce';

export const initialState = {
    formData: [],

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
            // src: 'https://www.instagram.com/okayoon.lee/',
            src: '',
        },
    ],

    skilsData: [
        {
            name: 'Javascript',
            src: './portfolio/skils/icon_javascript.png',
        },
        {
            name: 'jquery',
            src: './portfolio/skils/icon_jquery.png',
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
            desc: 'React, Redux등 학습목적으로 만든 포플사이트입니다.',
            skils: ['next', 'react', 'redux', 'redux_saga', 'axios', 'styled_components', 'eslint', 'dayjs', 'immer', 'sequelize', 'mysql' ],
        },
        {
            name: 'Rsupport 브랜드사이트',
            image: [
                '../portfolio/site/portfolio_site0.png', 
                '../portfolio/site/portfolio_site1.png', 
                '../portfolio/site/portfolio_site2.png', 
                '../portfolio/site/portfolio_site2.png', 
                '../portfolio/site/portfolio_site2.png', 
                '../portfolio/site/portfolio_site3.png', 
                '../portfolio/site/portfolio_site4.png', 
                '../portfolio/site/portfolio_site5.png', 
            ],
            src: 'http://www.okayoon.com', 
            desc: 'React, Redux등 학습목적으로 만든 포플사이트입니다.',
            skils: ['next', 'react', 'redux', 'redux_saga', 'axios', 'styled_components', 'eslint', 'dayjs', 'immer', 'sequelize', 'mysql' ],
        },
        {
            name: 'Newsletter (사내 솔루션)',
            image: [
                '../portfolio/site/portfolio_site0.png', 
                '../portfolio/site/portfolio_site1.png', 
                '../portfolio/site/portfolio_site2.png', 
                '../portfolio/site/portfolio_site3.png', 
                '../portfolio/site/portfolio_site4.png', 
                '../portfolio/site/portfolio_site5.png', 
            ],
            src: 'http://www.okayoon.com', 
            desc: 'React, Redux등 학습목적으로 만든 포플사이트입니다.',
            skils: ['next', 'react', 'mysql' ],
        },
        
        // {
        //     name: '',
        //     image: ['', '', '',],
        //     src: '',
        //     desc: '',
        //     skils: [],
        // }
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