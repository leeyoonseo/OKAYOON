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
        },
        { 
            src: 'https://cdn.pixabay.com/photo/2021/02/03/13/54/cupcake-5978060__340.jpg', 
            title : '2번',
        },
        { 
            src: 'https://cdn.pixabay.com/photo/2020/05/25/20/14/holland-iris-5220407__340.jpg', 
            title : '3번',
        },
        { 
            src: 'https://cdn.pixabay.com/photo/2020/10/08/17/39/waves-5638587__340.jpg', 
            title : '4번',
        },
        { 
            src: 'https://cdn.pixabay.com/photo/2019/01/30/11/17/zebra-3964360__340.jpg', 
            title : '5번',
        },
        { 
            src: 'https://cdn.pixabay.com/photo/2021/02/01/13/37/cars-5970663__340.png', 
            title : '6번',
        },
        { 
            src: 'https://cdn.pixabay.com/photo/2019/06/05/10/34/mimosa-4253396__340.jpg', 
            title : '7번',
        },
        { 
            src: 'https://cdn.pixabay.com/photo/2020/08/04/14/42/sky-5463015__340.jpg', 
            title : '8번',
        },
        { 
            src: 'https://cdn.pixabay.com/photo/2021/02/03/13/54/cupcake-5978060__340.jpg', 
            title : '9번',
        },
        { 
            src: 'https://cdn.pixabay.com/photo/2020/01/09/01/00/the-eye-on-the-greek-4751572__340.png', 
            title : '10번',
        },
        { 
            src: 'https://cdn.pixabay.com/photo/2021/01/30/12/19/couple-5963678__340.png', 
            title : '11번',
        },
        { 
            src: 'https://cdn.pixabay.com/photo/2021/01/23/07/53/dogs-5941898__340.jpg', 
            title : '12번',
        },
        { 
            src: 'https://cdn.pixabay.com/photo/2020/06/15/01/06/sunset-5299957__340.jpg', 
            title : '13번',
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
    const [status, setStatus] = useState('slide'); // TODO: slide를 기본으로 변경할 것
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