import React, { useCallback } from 'react';
import Link from 'next/link';
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
            id: SIMSIMI_MODAL_ID,
            name: '심심이',
            src: '../app/icon_simsimi.png',
        },
        {
            id: GAME_MODAL_ID,
            name: '게임',
            src: '../app/icon_game.png',
        },
];

const portfolio = {
    id: 'portfolio',
    name: '포트폴리오',
    src: '../app/icon_portfolio.png',
};

const Wrap = styled.div`
    display: inline-block;
    max-width: ${({ theme }) => theme.calcRem(600)};    
    width: 100%;
`;

const AppButton = styled.button`
    padding: 0;        
    max-width: 15%;
    width: 100%;
    font-size: ${({ theme }) => theme.calcRem(16)};
    border: none;
    outline: none;
    background: none;
    cursor: pointer;

    @media only screen and ${({ theme }) => theme.device.mobile} {
        max-width: none;
        width: 30%;

        &:nth-child(4n) {
            margin-left: 0;
        }

        &:nth-child(n+3) {
            margin-top: 3%;
        }
    }

    & + button {
        margin-left: 2%;
    }

    span {
        display: block;
    }
`;

const Icon = styled.img`
    max-width: ${({ theme }) => theme.calcRem(70)};
    max-height: ${({ theme }) => theme.calcRem(70)};
    width: 100%;
    height: 100%;
`;

const Name = styled.span`
    margin-top: ${({ theme }) => theme.calcRem(5)};
    display: inline-block;
    line-height: 1.25;
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
        <Wrap>
            {applistData.map((v) => {
                const { id, name, src } = v;
                return(
                    <AppButton
                        key={`icon_${id}_${name}`}
                        onClick={onClickApp(id)}
                    >
                        <span>
                            <Icon src={src} alt={`${name} 아이콘`} />
                        </span>

                        <span><Name>{name}</Name></span>
                    </AppButton>
                )
            })}

            {/* [D] 포트폴리오 */}
            <Link href="./portfolio">
                <AppButton key="icon_portfolio">
                    <span>
                        <Icon src={portfolio.src} alt={`${portfolio.name} 아이콘`} />
                    </span>
                    <span>
                        <Name>{portfolio.name}<br/>바로가기</Name>
                    </span>
                </AppButton>
            </Link>
        </Wrap>
    );
}

export default AppList;