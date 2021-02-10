import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { AppstoreOutlined, SplitCellsOutlined, ProfileOutlined } from '@ant-design/icons';

import Slide from './Slide';
import Card from './Card';
import List from './List';

const Footer = styled.div`
    position: fixed;
    bottom: 0;
    padding: 0 3%;
    display: flex;
    width: 100%;
    height: 50px;
    left: 0;
    background: #dedede;
    align-items: center;
    
    button + button {
        margin-left: 5px;
    }
`;

const Button = styled.button`
    padding: 0;
    width: 30px;
    height: 30px;
    border: 1px solid #666;
    border-radius: 3px;
    outline: none;
    background: none;
    cursor: pointer;

    &:hover,
    &:focus { 
        background: rgba(0, 0, 0, 0.3);
    }

    &.active {
        background: rgba(0, 0, 0, 0.3);
    }
`;

const getIconColor = (status, name) => {
    return status === name ? '#fff' : '#666';
};

const CardIcon = styled(AppstoreOutlined)`
    color: ${props => getIconColor(props.status, props.name)};
`;

const SlideIcon = styled(SplitCellsOutlined)`
    color: ${props => getIconColor(props.status, props.name)};
`;

const ListIcon = styled(ProfileOutlined)`
    color: ${props => getIconColor(props.status, props.name)};
`;

const Gallery = () => {
    const [status, setStatus] = useState('slide');
    const NAME_CARD = 'card';
    const NAME_SLIDE = 'slide';
    const NAME_List = 'list';

    const changeClassName = useCallback((name) => status === name ? 'active' : '', [status]);

    const renderViewComponent = useCallback(() => {
        if (status === NAME_SLIDE) {
            return <Slide />;

        } else if (status === NAME_CARD) {
            return <Card />;

        } else if (status === NAME_List) {
            return <List />;
        }
    }, [status]);

    const onClickButton = useCallback((name) => () =>  setStatus(name), []);

    return (
        <>
            {renderViewComponent()}
            
            <Footer>
                <Button     
                    className={changeClassName(NAME_CARD)}
                    onClick={onClickButton(NAME_CARD)}
                >
                    <CardIcon 
                        name={NAME_CARD}
                        status={status} 
                    />
                    <span className="hidden">카드</span>
                </Button>

                <Button 
                    className={changeClassName(NAME_SLIDE)}
                    onClick={onClickButton(NAME_SLIDE)}
                >
                    <SlideIcon 
                        name={NAME_SLIDE}
                        status={status} 
                    />
                    <span className="hidden">슬라이드</span>
                </Button>

                <Button 
                    className={changeClassName(NAME_List)}
                    onClick={onClickButton(NAME_List)}
                >
                    <ListIcon 
                        name={NAME_List}
                        status={status} 
                    />
                    <span className="hidden">목록</span>
                </Button>
            </Footer>
        </>
    );
};

export default Gallery;


// TODO:
// DB 연결