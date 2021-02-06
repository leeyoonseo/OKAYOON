/**
 * @desc 
 * 1. 모달 id 생성: 페이지컴포넌트_모달_인덱스
 * 2. 모달 콘텐츠 컴포넌트 import
 */

// [D] 로그인 페이지, 아바타
import AvatarContent from '../../components/UserInfo/AvatarContent';

export const AVATAR_MODAL_ID = 'LU_M_0';
export const AVATAR_MODAL_DATA = {
    id: AVATAR_MODAL_ID, 
    visible: false,
    size: {
        w: '500px',
        h: '500px'
    },
    title: "아바타 설정",
    content: AvatarContent,
    buttonDisabled : {
        Maximize: true,
    },   
};

// [D] 메뉴 툴팁, info
import InfoContent from '../SystemTools/Menu/InfoContent';

export const INFO_MODAL_ID = 'MI_M_0'; 
export const INFO_MODAL_DATA = {
    id: INFO_MODAL_ID,
    visible: false,
    size: {
        w: '300px',
        h: '300px'
    },
    title: "Info",
    content: InfoContent,
    buttonDisabled : {
        Maximize: true,
    },   
};

// [D] 메뉴 툴팁, welcome
import WelcomeContent from '../SystemTools/Menu/WelcomeContent';

export const WELCOME_MODAL_ID = 'MW_M_0';
export const WELCOME_MODAL_DATA = {
    id: WELCOME_MODAL_ID,
    visible: false,
    size: {
        w: '300px',
        h: '300px'
    },
    title: "Welcome",
    content: WelcomeContent,
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

// [D] App, 채팅
import Chatting from '../App/Chatting';

export const CHATTING_MODAL_ID = 'MC_M_0'; 
export const CHATTING_MODAL_DATA = {
    id: CHATTING_MODAL_ID,
    visible: false,
    size: {
        w: '200px',
        h: '300px'
    },
    title: "채팅",
    content: Chatting,
};

// [D] App, 휴지통
import Delete from '../App/Delete';

export const DELETE_MODAL_ID = 'MD_M_0'; 
export const DELETE_MODAL_DATA = {
    id: DELETE_MODAL_ID,
    visible: false,
    size: {
        w: '200px',
        h: '300px'
    },
    title: "휴지통",
    content: Delete,
};

// [D] App, 사진첩
import Gallery from '../App/Gallery';

export const GALLERY_MODAL_ID = 'MG_M_0';
export const GALLERY_MODAL_DATA = {
    id: GALLERY_MODAL_ID,
    visible: false,
    size: {
        w: '200px',
        h: '300px'
    },
    title: "사진첩",
    content: Gallery,
};

// [D] App, 게임
import Game from '../App/Game';

export const GAME_MODAL_ID = 'MG_M_1';
export const GAME_MODAL_DATA = {
    id: GAME_MODAL_ID,
    visible: false,
    size: {
        w: '200px',
        h: '300px'
    },
    title: "게임",
    content: Game,
};

// [D] App, 메모
import Memo from '../App/Memo';

export const MEMO_MODAL_ID = 'MM_M_0';
export const MEMO_MODAL_DATA = {
    id: MEMO_MODAL_ID,
    visible: false,
    size: {
        w: '200px',
        h: '300px'
    },
    title: "메모",
    content: Memo,
    buttonDisabled : {
        Maximize: true,
    },   
};