import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { CREATE_MODAL_REQUEST, TOGGLE_MODAL_REQUEST } from '../reducers/site';

import { 
    GUESTBOOK_MODAL_ID, GUESTBOOK_MODAL_DATA,
    BLOG_MODAL_ID, BLOG_MODAL_DATA,
    GALLERY_MODAL_ID, GALLERY_MODAL_DATA,
    MEMO_MODAL_ID, MEMO_MODAL_DATA,
    SIMSIMI_MODAL_ID, SIMSIMI_MODAL_DATA,
    GAME_MODAL_ID, GAME_MODAL_DATA,
} from './ModalPopup/data';

const applistData = [
        {
            id: GUESTBOOK_MODAL_ID,
            name: '방명록',
            src: '../app/icon_guestbook.png',
        },
        {
            id: BLOG_MODAL_ID,
            name: '블로그',
            src: '../app/icon_blog.png',
        },
        {
            id: GALLERY_MODAL_ID,
            name: '사진첩',
            src: '../app/icon_gallery.png',
        },
        {
            id: MEMO_MODAL_ID,
            name: '메모',
            src: '../app/icon_meme.png',
        },
        {
            id: SIMSIMI_MODAL_ID,
            name: '심심이',
            src: '../app/icon_simsimi1.png',
        },
        {
            id: GAME_MODAL_ID,
            name: '게임',
            src: '../app/icon_game.png',
        },
];

const AppButton = styled.button`
    padding: 0;        
    width: 4.375rem;
    height: 4.375rem;
    font-size: 1rem;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;

    & + button {
        margin-left: 2.188rem;
    }
`;

const Icon = styled.img`
    width: 100%;
    height: 100%;
`;

const Name = styled.span`
    margin-top: 0.313rem;
    display: inline-block;
`;

const AppList = () => {
    const dispatch = useDispatch();
    const { modals } = useSelector((state) => state.site);
    
    const createModal = useCallback((id) => {
        if(modals.find((v) => v.id === id)) return;
    
        let data = '';

        switch(id) {
            case GUESTBOOK_MODAL_ID:
                data = GUESTBOOK_MODAL_DATA;
                break;

            case BLOG_MODAL_ID:
                data = BLOG_MODAL_DATA;
                break;

            case SIMSIMI_MODAL_ID:
                data = SIMSIMI_MODAL_DATA;
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
                data = null;
                break;
        }

        if (!data) return;
        
        dispatch({
            type: CREATE_MODAL_REQUEST,
            data: data
        })
    }, [modals]);

    const onClickApp = useCallback((id) => () => {
        createModal(id);
            
        dispatch({
            type: TOGGLE_MODAL_REQUEST,
            data: id
        });
    }, [modals]);

    return (
        <>
            {applistData.map((v, i) => {
                return(
                    <AppButton
                        key={`icon_${v.id}_${v.name}`}
                        onClick={onClickApp(v.id)}
                    >
                        <Icon src={v.src} alt={`${v.name} 아이콘`} />
                        <Name>{v.name}</Name>
                    </AppButton>
                )
            })}
        </>
    );
}

export default AppList;