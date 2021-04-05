import React, { useCallback, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { AppstoreOutlined, SplitCellsOutlined, ProfileOutlined } from '@ant-design/icons';

import SlideType from './SlideType';
import CardType from './CardType';
import ListType from './ListType';
import { bucketUrl } from '../../../config/config';

const imageData = [
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
];

const Container = styled.div`
    height: calc(100% - ${({ menuHeight }) => menuHeight}px);
    overflow-y: auto;
`;

const MenuArea = styled.div`
    position: fixed;
    bottom: 0;
    padding: 2%;
    display: flex;
    width: 100%;
    min-height: ${({ theme }) => theme.calcRem(30)};
    left: 0;
    background: ${({ theme }) => theme.colors.gray};
    align-items: center;
    
    button + button {
        margin-left: ${({ theme }) => theme.calcRem(7)};
    }
`;

const Button = styled.button`
    padding: 0;
    width: ${({ theme }) => theme.calcRem(25)};
    height: ${({ theme }) => theme.calcRem(25)};
    border: 1px solid ${({ theme }) => theme.colors.black};
    outline: none;
    background: none;
    cursor: pointer;

    &:hover { 
        background: ${({ theme }) => theme.colors.rgbaGray};
    }

    &.active {
        background: ${({ theme }) => theme.colors.rgbaGray};
    }
`;

const setIconColor = (type, name, colors) => {
    return (type === name) ? 'white' : colors.black;
};

const CardIcon = styled(AppstoreOutlined)`
    color: ${({ type, name }) => setIconColor(type, name, `${({ theme }) => theme.colors}`)};
`;

const SlideIcon = styled(SplitCellsOutlined)`
    color: ${({ type, name }) => setIconColor(type, name, `${({ theme }) => theme.colors}`)};
`;

const ListIcon = styled(ProfileOutlined)`
    color: ${({ type, name }) => setIconColor(type, name, `${({ theme }) => theme.colors}`)};
`;

const Gallery = () => {
    const [type, setType] = useState(null);
    const [menuHeight, setMenuHeight] = useState(null);
    const menuRef = useRef(null);
    const CARD = 'card';
    const SLIDE = 'slide';
    const LIST = 'list';

    useEffect(() => setType(SLIDE), []);
    
    useEffect(() => {
        if (!menuRef.current) return;

        setMenuHeight(menuRef.current.clientHeight);
    }, [menuRef]);

    const setActive = useCallback((name) => (type === name) ? 'active' : '', [type]);
    const onClickButton = useCallback((name) => () =>  setType(name), []);

    return (
        <>
            <Container menuHeight={menuHeight}>
                {type && (() => {
                    if (type === SLIDE) {
                        return <SlideType data={imageData} />;

                    } else if (type === CARD) {
                        return <CardType data={imageData} />;

                    } else if (type === LIST) {
                        return <ListType data={imageData} />;
                    }
                })()}
            </Container>
            
            <MenuArea ref={menuRef}>
                <Button     
                    className={setActive(CARD)}
                    onClick={onClickButton(CARD)}
                >
                    <CardIcon 
                        name={CARD}
                        type={type} 
                    />
                    <span className="hidden">카드</span>
                </Button>

                <Button 
                    className={setActive(SLIDE)}
                    onClick={onClickButton(SLIDE)}
                >
                    <SlideIcon 
                        name={SLIDE}
                        type={type} 
                    />
                    <span className="hidden">슬라이드</span>
                </Button>

                <Button 
                    className={setActive(LIST)}
                    onClick={onClickButton(LIST)}
                >
                    <ListIcon 
                        name={LIST}
                        type={type} 
                    />
                    <span className="hidden">목록</span>
                </Button>
            </MenuArea>
        </>
    );
};

export default Gallery;