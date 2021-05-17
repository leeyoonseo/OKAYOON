import produce from '../util/produce';
import { bucketUrl } from '../config/config';

export const initialState = {
    modals: [], 
    modalIndex: 1000,
    battery: null,
    time: null,
    imageData: [
        { 
            src: `${bucketUrl}/gallery/img00.JPG`, 
            title : '랍스타',
            desc: '내가 돈이 넘쳤다면? 랍스타 씨가 말랐다',
        },
        { 
            src: `${bucketUrl}/gallery/img01.JPG`, 
            title : '공원',
            desc: '공기 좋아보이지만 미세먼지',
        },
        { 
            src: `${bucketUrl}/gallery/img02.JPG`, 
            title : '막걸리',
            desc: '비오는 날은 역시..',
        },
        { 
            src: `${bucketUrl}/gallery/img03.JPG`, 
            title : '전시회',
            desc: '죽기전에 달에 가볼 수 있을까?',
        },
        { 
            src: `${bucketUrl}/gallery/img04.JPG`, 
            title : '달',
            desc: '인스타 갬성때문에 찍었지만...',
        },
        { 
            src: `${bucketUrl}/gallery/img05.JPG`, 
            title : '케이크',
            desc: '동네에 케이크 맛집이 있어 좋다',
        },
        { 
            src: `${bucketUrl}/gallery/img06.JPG`, 
            title : '책상',
            desc: '치운건데..',
        },
        { 
            src: `${bucketUrl}/gallery/img07.JPG`, 
            title : '에피타이저',
            desc: '입맛 돋구지 않아도 난 잘 묵는다',
        },
        { 
            src: `${bucketUrl}/gallery/img08.JPG`, 
            title : '식탁',
            desc: '인스타 갬성샷 (각도가 맞나?)',
        },
        { 
            src: `${bucketUrl}/gallery/img09.JPG`, 
            title : '화장실 벽',
            desc: '인스타 갬성샷이지만 여긴 화장실',
        },
        { 
            src: `${bucketUrl}/gallery/img10.JPG`, 
            title : '무지개 떡',
            desc: '빨주노초파남보 내가 다먹음',
        },
        { 
            src: `${bucketUrl}/gallery/img11.JPG`, 
            title : '빵 진열',
            desc: '빵맛 짱맛 국룰',
        },
        { 
            src: `${bucketUrl}/gallery/img12.JPG`, 
            title : '빵 & 커피',
            desc: '빵 맛집이라는데? 뷰 맛집',
        },
        { 
            src: `${bucketUrl}/gallery/img13.JPG`, 
            title : '벽에 꽃',
            desc: '꽃인가 디퓨저인가',
        },
        { 
            src: `${bucketUrl}/gallery/img14.JPG`, 
            title : '정신없는 식사',
            desc: '정신없이 먹었기때문에',
        },
        { 
            src: `${bucketUrl}/gallery/img15.JPG`, 
            title : '하늘',
            desc: '맑은 하늘, 퇴근각!',
        },
        { 
            src: `${bucketUrl}/gallery/img16.JPG`, 
            title : '해산물',
            desc: '난 킬러다. 해산물 킬러',
        },
    ],

    modalLoading: false,
    modalDone: false,
    modalError: false,

    modalToggleLoading: false,
    modalToggleDone: false,
    modalToggleError: false,
};

// [D] 모달 팝업
export const CREATE_MODAL_REQUEST = 'CREATE_MODAL_REQUEST';
export const CREATE_MODAL_SUCCESS = 'CREATE_MODAL_SUCCESS';
export const CREATE_MODAL_FAILURE = 'CREATE_MODAL_FAILURE';

export const DELETE_MODAL_REQUEST = 'DELETE_MODAL_REQUEST';
export const DELETE_MODAL_SUCCESS = 'DELETE_MODAL_SUCCESS';
export const DELETE_MODAL_FAILURE = 'DELETE_MODAL_FAILURE';

export const TOGGLE_MODAL_REQUEST = 'TOGGLE_MODAL_REQUEST';
export const TOGGLE_MODAL_SUCCESS = 'TOGGLE_MODAL_SUCCESS';
export const TOGGLE_MODAL_FAILURE = 'TOGGLE_MODAL_FAILURE';

export const ALL_CLOSED_MODAL = 'ALL_CLOSED_MODAL';

const reducer = (state = initialState, action) => produce(state,(draft) => {
    switch(action.type){
        case CREATE_MODAL_REQUEST:
            draft.modalLoading = true;
            draft.modalDone = false;
            draft.modalError = false;
            break;

        case CREATE_MODAL_SUCCESS:
            draft.modalLoading = false;
            draft.modalDone = true;
            draft.modalError = false;

            draft.modals.push(action.data);
            break;

        case CREATE_MODAL_FAILURE:
            draft.modalLoading = false;
            draft.modalDone = false;
            draft.modalError = true;
            break;

        case TOGGLE_MODAL_REQUEST:
            draft.modalToggleLoading = true;
            draft.modalToggleDone = false;
            draft.modalToggleError = false;
            break;

        case TOGGLE_MODAL_SUCCESS: {
            const modal = draft.modals.find((v) => v.id === action.data);
            modal.visible = !modal.visible;

            if(modal.visible){
                draft.modalIndex = draft.modalIndex + 1;
                modal.zIndex = draft.modalIndex;
            }

            draft.modalToggleLoading = false;
            draft.modalToggleDone = true;
            draft.modalToggleError = false;
            break;
        }

        case TOGGLE_MODAL_FAILURE:
            draft.modalToggleLoading = false;
            draft.modalToggleDone = false;
            draft.modalToggleError = true;
            break;

        case ALL_CLOSED_MODAL:
            draft.modals.map((v) => {
                if (v.visible === true) {
                    v.visible = false
                } 
            });
            break;

        default:
            break;
    }
});

export default reducer;