import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { AppstoreOutlined, SplitCellsOutlined, ProfileOutlined } from '@ant-design/icons';

import SlideType from './SlideType';
import CardType from './CardType';
import ListType from './ListType';

// TODO:
const sampleImages = [
        { 
            src: 'https://cdn.pixabay.com/photo/2020/09/02/20/52/dock-5539524__340.jpg', 
            title : '1번',
            desc: '1번 이미지입니다.',
        },
        { 
            src: 'https://cdn.pixabay.com/photo/2021/02/03/13/54/cupcake-5978060__340.jpg', 
            title : '2번',
            desc: '2번 이미지입니다.',
        },
        { 
            src: 'https://cdn.pixabay.com/photo/2020/05/25/20/14/holland-iris-5220407__340.jpg', 
            title : '3번',
            desc: '3번 이미지입니다.',
        },
        { 
            src: 'https://cdn.pixabay.com/photo/2020/10/08/17/39/waves-5638587__340.jpg', 
            title : '4번',
            desc: '4번 이미지입니다.',
        },
        { 
            src: 'https://cdn.pixabay.com/photo/2019/01/30/11/17/zebra-3964360__340.jpg', 
            title : '5번',
            desc: '5번 이미지입니다.',
        },
        { 
            src: 'https://cdn.pixabay.com/photo/2021/02/01/13/37/cars-5970663__340.png', 
            title : '6번',
            desc: '6번 이미지입니다.',
        },
        { 
            src: 'https://cdn.pixabay.com/photo/2019/06/05/10/34/mimosa-4253396__340.jpg', 
            title : '7번',
            desc: '7번 이미지입니다.',
        },
        { 
            src: 'https://cdn.pixabay.com/photo/2020/08/04/14/42/sky-5463015__340.jpg', 
            title : '8번',
        
            desc: '8번 이미지입니다.',
        },
        { 
            src: 'https://cdn.pixabay.com/photo/2021/02/03/13/54/cupcake-5978060__340.jpg', 
            title : '9번',
        
            desc: '9번 이미지입니다.',
        },
        { 
            src: 'https://cdn.pixabay.com/photo/2020/01/09/01/00/the-eye-on-the-greek-4751572__340.png', 
            title : '10번',
            desc: '10번 이미지입니다.',

        },
        { 
            src: 'https://cdn.pixabay.com/photo/2021/01/30/12/19/couple-5963678__340.png', 
            title : '11번',
            desc: '11번 이미지입니다.',

        },
        { 
            src: 'https://cdn.pixabay.com/photo/2021/01/23/07/53/dogs-5941898__340.jpg', 
            title : '12번',
            desc: '12번 이미지입니다.',

        },
        { 
            src: 'https://cdn.pixabay.com/photo/2020/06/15/01/06/sunset-5299957__340.jpg', 
            title : '13번',
            desc: '13번 이미지입니다.',

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
    const CARD = 'card';
    const SLIDE = 'slide';
    const LIST = 'list';
    const [status, setStatus] = useState(LIST); // TODO: slide를 기본으로 변경할 것

    const changeClassName = useCallback((name) => status === name ? 'active' : '', [status]);

    const renderViewComponent = useCallback(() => {
        if (status === SLIDE) {
            return <SlideType images={sampleImages} />;

        } else if (status === CARD) {
            return <CardType images={sampleImages} />;

        } else if (status === LIST) {
            return <ListType images={sampleImages} />;
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