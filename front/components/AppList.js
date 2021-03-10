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
    width: ${({ theme }) => theme.calcRem(70)};
    height: ${({ theme }) => theme.calcRem(70)};
    font-size: ${({ theme }) => theme.calcRem(16)};
    border: none;
    outline: none;
    background: none;
    cursor: pointer;

    & + button {
        margin-left: ${({ theme }) => theme.calcRem(35)};
    }
`;

const Icon = styled.img`
    width: 100%;
    height: 100%;
`;

const Name = styled.span`
    margin-top: ${({ theme }) => theme.calcRem(5)};
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
            {applistData.map((v) => {
                const { id, name, src } = v;
                return(
                    <AppButton
                        key={`icon_${id}_${name}`}
                        onClick={onClickApp(id)}
                    >
                        <Icon src={src} alt={`${name} 아이콘`} />
                        <Name>{name}</Name>
                    </AppButton>
                )
            })}
        </>
    );
}

export default AppList;