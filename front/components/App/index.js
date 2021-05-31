import React, { useCallback } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { CREATE_MODAL_REQUEST, TOGGLE_MODAL_REQUEST } from '../../reducers/site';
import { 
    GUESTBOOK_MODAL_ID, GUESTBOOK_MODAL_DATA,
    BLOG_MODAL_ID, BLOG_MODAL_DATA,
    GALLERY_MODAL_ID, GALLERY_MODAL_DATA,
    SIMSIMI_MODAL_ID, SIMSIMI_MODAL_DATA,
    GAME_MODAL_ID, GAME_MODAL_DATA,
} from '../ModalPopup/data';

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

const AppIndex = () => {
    const dispatch = useDispatch();
    const { applistData, modals } = useSelector(state => state.site);

    const getModalData = useCallback(id => {
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

        return data;
    }, []);

    const createModal = useCallback(id => {
        const data = getModalData(id);
        
        if (data) {
            dispatch({
                type: CREATE_MODAL_REQUEST,
                data
            });
        }
    }, [modals]);

    const onClickApp = useCallback(id => {
        const isSameModal = modals.some(({ id: modalId }) => modalId === id);

        if(!isSameModal) {
            createModal(id);
        }
            
        dispatch({
            type: TOGGLE_MODAL_REQUEST,
            data: id
        });
    }, [modals]);

    return (
        <Wrap>
            {applistData && applistData.map(({ id, name, src }) => {
                if (id === 'portfolio') {
                    return (
                        <Link 
                            key={`icon_${id}_${name}`}
                            href={`./${id}`}
                        >
                            <AppButton>
                                <span>
                                    <Icon 
                                        src={src} 
                                        alt={`${name} 아이콘`} 
                                    />
                                </span>
                                <span>
                                    <Name>{name}<br/>바로가기</Name>
                                </span>
                            </AppButton>
                        </Link>
                    );
                }

                return (
                    <AppButton
                        key={`icon_${id}_${name}`}
                        onClick={(() => onClickApp(id))}
                    >
                        <span>
                            <Icon 
                                src={src} 
                                alt={`${name} 아이콘`} 
                            />
                        </span>
                        <span>
                            <Name>{name}</Name>
                        </span>
                    </AppButton>
                );
            })}
        </Wrap>
    );
}

export default AppIndex;