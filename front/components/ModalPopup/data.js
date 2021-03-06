/**
 * @desc 
 * 1. 모달 id 생성: 페이지컴포넌트_모달_인덱스
 * 2. 모달 콘텐츠 컴포넌트 import
 */

// [D] 로그인 페이지, 아바타
import ModalAvatar from '../Login/ModalAvatar';

export const AVATAR_MODAL_ID = 'LU_M_0';
export const AVATAR_MODAL_DATA = {
    id: AVATAR_MODAL_ID, 
    visible: false,
    size: {
        w: '500px',
        h: '500px'
    },
    title: "아바타 설정",
    content: ModalAvatar,
    buttonDisabled : {
        Maximize: true,
    },   
};

// [D] 메뉴 툴팁, info
import Info from '../Menu/Info';

export const INFO_MODAL_ID = 'MI_M_0'; 
export const INFO_MODAL_DATA = {
    id: INFO_MODAL_ID,
    visible: false,
    size: {
        w: '500px',
        h: '350px'
    },
    title: "Info",
    content: Info,
    buttonDisabled : {
        Maximize: true,
    },   
};

// [D] 메뉴 툴팁, welcome
import Welcome from '../Menu/Welcome';

export const WELCOME_MODAL_ID = 'MW_M_0';
export const WELCOME_MODAL_DATA = {
    id: WELCOME_MODAL_ID,
    visible: false,
    size: {
        w: '500px',
        h: '500px'
    },
    title: "Welcome",
    content: Welcome,
    buttonDisabled : {
        Maximize: true,
    },   
};

// [D] App, 방명록
import Guestbook from '../App/Guestbook/index';

export const GUESTBOOK_MODAL_ID = 'MG_M_2'; 
export const GUESTBOOK_MODAL_DATA = {
    id: GUESTBOOK_MODAL_ID,
    visible: false,
    size: {
        w: '600px',
        h: '600px'
    },
    title: "방명록",
    content: Guestbook,
};

// [D] App, 블로그
import Blog from '../App/Blog';

export const BLOG_MODAL_ID = 'MB_M_0'; 
export const BLOG_MODAL_DATA = {
    id: BLOG_MODAL_ID,
    visible: false,
    size: {
        w: '700px',
        h: '600px'
    },
    title: "블로그",
    content: Blog,
};

// [D] App, 심심이
import Simsimi from '../App/Simsimi/index';

export const SIMSIMI_MODAL_ID = 'MS_M_0'; 
export const SIMSIMI_MODAL_DATA = {
    id: SIMSIMI_MODAL_ID,
    visible: false,
    size: {
        w: '400px',
        h: '600px'
    },
    title: "Simsimi",
    content: Simsimi,
};

// [D] App, 사진첩
import Gallery from '../App/Gallery/index';

export const GALLERY_MODAL_ID = 'MG_M_0';
export const GALLERY_MODAL_DATA = {
    id: GALLERY_MODAL_ID,
    visible: false,
    size: {
        w: '800px',
        h: '600px'
    },
    title: "사진첩",
    content: Gallery,
};

// [D] App, 게임
import Store from '../App/Game/index';

export const GAME_MODAL_ID = 'MG_M_1';
export const GAME_MODAL_DATA = {
    id: GAME_MODAL_ID,
    visible: false,
    theme: 'dark',
    size: {
        w: '650px',
        h: 'auto'
    },
    title: "Game Store",
    content: Store,
};