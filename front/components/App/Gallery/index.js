import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { AppstoreOutlined, SplitCellsOutlined, ProfileOutlined } from '@ant-design/icons';

import SlideType from './SlideType';
import CardType from './CardType';
import ListType from './ListType';

// TODO:
const sampleImages = [
    {
        src: "https://www.artinsight.co.kr/data/tmp/1910/20191029212614_fawslbwd.jpg",
        title: "1"
    },
    {
        src: "https://www.artinsight.co.kr/data/tmp/1910/20191029212649_esiekzxf.jpg",
        title: "2"
    },
    {
        src: "https://www.artinsight.co.kr/data/tmp/1910/20191029212707_zcrkccgp.jpg",
        title: "3"
    },
    {
        src: "https://www.artinsight.co.kr/data/tmp/1910/20191029212724_pacwfbiz.jpg",
        title: "4"
    },
];

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
    width: 25px;
    height: 25px;
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

const defaultIconStyle = css`
    
`;

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
    const [status, setStatus] = useState('card'); // TODO: slide를 기본으로 변경할 것
    const NAME_CARD = 'card';
    const NAME_SLIDE = 'slide';
    const NAME_List = 'list';

    const changeClassName = useCallback((name) => status === name ? 'active' : '', [status]);

    const renderViewComponent = useCallback(() => {
        if (status === NAME_SLIDE) {
            return <SlideType images={sampleImages} />;

        } else if (status === NAME_CARD) {
            return <CardType images={sampleImages} />;

        } else if (status === NAME_List) {
            return <ListType images={sampleImages} />;
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
// - DB 연결
// - 샘플 이미지 수정할 것