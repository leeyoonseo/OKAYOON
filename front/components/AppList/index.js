import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CREATE_MODAL_REQUEST, TOGGLE_MODAL_REQUEST } from '../../reducers/site';

import Items from './Items';
import { GUESTBOOK_MODAL_ID, GUESTBOOK_MODAL_DATA } from '../App/Guestbook';
import { BLOG_MODAL_ID, BLOG_MODAL_DATA } from '../App/Blog';
import { CHATTING_MODAL_ID, CHATTING_MODAL_DATA } from '../App/Chatting';
import { DELETE_MODAL_ID, DELETE_MODAL_DATA } from '../App/Delete';
import { GALLERY_MODAL_ID, GALLERY_MODAL_DATA } from '../App/Gallery';
import { GAME_MODAL_ID, GAME_MODAL_DATA } from '../App/Game';
import { MEMO_MODAL_ID, MEMO_MODAL_DATA } from '../App/Memo';

import { 
    Wrap, GuestbookIcon, BlogIcon, GalleryIcon, MemoIcon, 
    ChattingIcon, GameIcon, DeleteIcon, IconTitle,
} from './style';

const index = () => {
    const dispatch = useDispatch();
    const { modals } = useSelector((state) => state.site);
    
    const createModal = useCallback((id) => {
        if(modals.find((v) => v.id === id)){
            return false;
        }
    
        // const data = id.split('_')[0] + '_MODAL_DATA';
        let data = '';

        switch(id) {
            case GUESTBOOK_MODAL_ID:
                data = GUESTBOOK_MODAL_DATA;
                break;

            case BLOG_MODAL_ID:
                data = BLOG_MODAL_DATA;
                break;

            case CHATTING_MODAL_ID:
                data = CHATTING_MODAL_DATA;
                break;
        
            case DELETE_MODAL_ID:
                data = DELETE_MODAL_DATA;
                break;

            case GALLERY_MODAL_ID:
                data = GALLERY_MODAL_DATA;
                break;
            
            case GAME_MODAL_ID:
                data = GAME_MODAL_DATA;
                break;

            case MEMO_MODAL_ID:
                data = MEMO_MODAL_DATA;
                break;

            default:
                break;
        }

        console.log('==================createModal');
        dispatch({
            type: CREATE_MODAL_REQUEST,
            data: data
        })
    }, [modals]);

    const onClickItem = useCallback((id) => () => {
        console.log('onClickItem', id)
        createModal(id);
            
        dispatch({
            type: TOGGLE_MODAL_REQUEST,
            data: id
        });
    }, [modals]);

    return (
        <Wrap>
            <Items
                title={<IconTitle>방명록</IconTitle>}
                icon={<GuestbookIcon />}
                onClick={onClickItem(GUESTBOOK_MODAL_ID)}
            />

            <Items
                title={<IconTitle>블로그</IconTitle>}
                icon={<BlogIcon />}
                onClick={onClickItem(BLOG_MODAL_ID)}
            />
                
            <Items
                title={<IconTitle>갤러리</IconTitle>}
                icon={<GalleryIcon />}
                onClick={onClickItem(GALLERY_MODAL_ID)}
            />

            <Items
                title={<IconTitle>메모</IconTitle>}
                icon={<MemoIcon />}
                onClick={onClickItem(MEMO_MODAL_ID)}
            />

            <Items
                title={<IconTitle>채팅</IconTitle>}
                icon={<ChattingIcon />}
                onClick={onClickItem(CHATTING_MODAL_ID)}
            />

            <Items
                title={<IconTitle>게임</IconTitle>}
                icon={<GameIcon />}
                onClick={onClickItem(GAME_MODAL_ID)}
            />

            <Items
                title={<IconTitle>휴지통</IconTitle>}
                icon={<DeleteIcon />}
                onClick={onClickItem(DELETE_MODAL_ID)}
            />
        </Wrap>
    );
}

export default index;

// TODO:
// - 방명록
// - 블로그 연결(iframe?)
// - 갤러리
// - 메모
// - 채팅, 챗봇?
// - 게임 (콘솔->게임? or 단일게임)
// - 휴지통 (UI 삭제가능하도록?)