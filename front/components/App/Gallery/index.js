import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { AppstoreOutlined, SplitCellsOutlined, ProfileOutlined } from '@ant-design/icons';

import SlideType from './SlideType';
import CardType from './CardType';
import ListType from './ListType';

const imageData = [
        { 
            src: '../../gallery/img00.jpg', 
            title : '랍스타',
            desc: '내가 돈이 넘쳤다면 랍스타 씨가 말랐다',
        },
        { 
            src: '../../gallery/img01.jpg', 
            title : '공원',
            desc: '공기 좋아보이지만 미세먼지',
        },
        { 
            src: '../../gallery/img02.jpg', 
            title : '막걸리',
            desc: '비오는 날 단골집',
        },
        { 
            src: '../../gallery/img03.jpg', 
            title : '전시회',
            desc: '나도 가보고 싶다',
        },
        { 
            src: '../../gallery/img04.jpg', 
            title : '달',
            desc: '인스타 갬성때문에 찍었지만...',
        },
        { 
            src: '../../gallery/img05.jpg', 
            title : '케이크',
            desc: '케이크 맛집, 얼그레이케이크 갑',
        },
        { 
            src: '../../gallery/img06.jpg', 
            title : '책상',
            desc: '치운게 저정도',
        },
        { 
            src: '../../gallery/img07.jpg', 
            title : '에피타이저',
            desc: '입맛 돋구지 않아도 난 잘 묵는데',
        },
        { 
            src: '../../gallery/img08.jpg', 
            title : '식탁',
            desc: '인스타 갬성샷 (각도가 맞나?)',
        },
        { 
            src: '../../gallery/img09.jpg', 
            title : '화장실 벽',
            desc: '인스타 갬성샷 (화장실..)',
        },
        { 
            src: '../../gallery/img10.jpg', 
            title : '무지개 떡',
            desc: '빨주노초파남보 내가 다먹음',
        },
        { 
            src: '../../gallery/img11.jpg', 
            title : '빵 진열',
            desc: '빵 맛집인데 그냥그랬다',
        },
        { 
            src: '../../gallery/img12.jpg', 
            title : '빵과 커피',
            desc: '빵 맛집이라는데 뷰 맛집',
        },
        { 
            src: '../../gallery/img13.jpg', 
            title : '벽에 꽃',
            desc: '인스타 갬성샷인데 뭔지 모름',
        },
        { 
            src: '../../gallery/img14.jpg', 
            title : '정신없는 식사, 초밥',
            desc: '정신 없어보이지, 정신없이 먹었다',
        },
        { 
            src: '../../gallery/img15.jpg', 
            title : '하늘',
            desc: '점심시간, 하늘이 맑다. 퇴근시켜주세요.',
        },
        { 
            src: '../../gallery/img16.jpg', 
            title : '해산물',
            desc: '난 킬러다. 해산물 킬러',
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
    const CARD = 'card';
    const SLIDE = 'slide';
    const LIST = 'list';
    const [status, setStatus] = useState(SLIDE);

    const changeClassName = useCallback((name) => status === name ? 'active' : '', [status]);

    const renderViewComponent = useCallback(() => {
        if (status === SLIDE) {
            return <SlideType images={imageData} />;

        } else if (status === CARD) {
            return <CardType images={imageData} />;

        } else if (status === LIST) {
            return <ListType images={imageData} />;
        }
    }, [status]);

    const onClickButton = useCallback((name) => () =>  setStatus(name), []);

    return (
        <>
            {renderViewComponent()}
            
            <Footer>
                <Button     
                    className={changeClassName(CARD)}
                    onClick={onClickButton(CARD)}
                >
                    <CardIcon 
                        name={CARD}
                        status={status} 
                    />
                    <span className="hidden">카드</span>
                </Button>

                <Button 
                    className={changeClassName(SLIDE)}
                    onClick={onClickButton(SLIDE)}
                >
                    <SlideIcon 
                        name={SLIDE}
                        status={status} 
                    />
                    <span className="hidden">슬라이드</span>
                </Button>

                <Button 
                    className={changeClassName(LIST)}
                    onClick={onClickButton(LIST)}
                >
                    <ListIcon 
                        name={LIST}
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