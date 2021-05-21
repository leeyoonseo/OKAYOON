import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppstoreOutlined, SplitCellsOutlined, ProfileOutlined } from '@ant-design/icons';

import SlideType from './SlideType';
import CardType from './CardType';
import ListType from './ListType';
import ImageZoom from './ImageZoom';
import MenuButton from './MenuButton';

const CARD = 'card';
const SLIDE = 'slide';
const LIST = 'list';

const Wrap = styled.div`
    display: flex;
    height: 100%;   
    flex-direction: column;
`;

const Container = styled.div`
    height: 90%;
    overflow-y: auto;
    overflow-x: hidden;

    &::-webkit-scrollbar {
        width: 3px;
        height: 5px;
        -webkit-appearance: none;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.colors.purple};;
    }

    &::-webkit-scrollbar-track {
        background-color: ${({ theme }) => theme.colors.gray};
    }
`;

const MenuArea = styled.div`
    margin-top: auto;
    
    button + button {
        margin-left: ${({ theme }) => theme.calcRem(7)};
    }
`;

const Gallery = () => {
    const { imageData } = useSelector((state) => state.site);
    const [type, setType] = useState(SLIDE);
    const [openedZoom, setOpenedZoom] = useState(false);
    const [zoomItem, setZoomItem] = useState(null);

    const onCloseZoom = useCallback(() => setOpenedZoom(false), []);
    const onClickZoom = useCallback(item => {
        setZoomItem(item);
        setOpenedZoom(!openedZoom);
    }, [openedZoom]);

    const onClickMenu = useCallback(type => {
        setType(type);
    }, []);

    return (
        <Wrap>
            <Container>
                {(() => {
                    if (type === SLIDE) {
                        return (
                            <SlideType 
                                images={imageData} 
                            />
                        )
                    } else if (type === CARD) {
                        return (
                            <CardType 
                                images={imageData} 
                                onClickZoom={onClickZoom}
                            />
                        )
                    } else {
                        return (
                            <ListType 
                                images={imageData} 
                                onClickZoom={onClickZoom}
                            />
                        )
                    }
                })()}
            </Container>
            
            <MenuArea>
                <MenuButton 
                    type={type}
                    name={CARD}
                    onClick={onClickMenu}
                    Icon={AppstoreOutlined}
                />

                <MenuButton 
                    type={type}
                    name={SLIDE}
                    onClick={onClickMenu}
                    Icon={SplitCellsOutlined}
                />

                <MenuButton 
                    type={type}
                    name={LIST}
                    onClick={onClickMenu}
                    Icon={ProfileOutlined}
                />  
            </MenuArea>

            {openedZoom && (
                <ImageZoom 
                    item={zoomItem}
                    onClose={onCloseZoom}
                />
            )}
        </Wrap>
    );
};

export default Gallery;