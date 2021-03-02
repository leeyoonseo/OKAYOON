import React, { useRef, useCallback } from 'react';
import Slick from 'react-slick';
import styled, { css } from 'styled-components';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const Wrap = styled.div`
    overflow: hidden;
    text-align: center;
`;

const Title = styled.div`
    margin-bottom: 20px;
    display: inline-block;
    font-size: 20px;
    text-align: center;
    border-bottom: 1px solid #fff;
`;

const Item = styled.div`
    width: 100%;
    height: 400px;
    text-align: center;
    background: url(${props => props.image})no-repeat center;
    background-size: cover;
`;

const defaultButtonStyle = css`
    position: absolute;
    top: 50%;
    padding: 0;
    width: 30px;
    height: 30px;
    line-height: 1;
    border: none;
    border-radius: 50%;
    background: none;
    outline: none;
    transform:translateY(-50%);
    cursor: pointer;
`;

const PrevButton = styled.button`
    ${defaultButtonStyle}
    left: 0;
`;

const NextButton = styled.button`
    ${defaultButtonStyle}
    right: 0;
`;

const defaultIconStyle = css`
    font-size: 22px;
    color: #dedede;

    &:focus,
    &:hover { 
        color: #666;
    }
`;

const PrevIcon = styled(LeftOutlined)`
    ${defaultIconStyle}
`;

const NextIcon = styled(RightOutlined)`
    ${defaultIconStyle}
`;

// TODO: s3에 사진 올리고 주소 변경할 것
const images = [
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
];

const Guide = () => {
    const slickRef = useRef(null);
    
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const onClickPrev = useCallback(() => slickRef.current.slickPrev(), []);
    const onClickNext = useCallback(() => slickRef.current.slickNext(), []);

    return (
        <Wrap>
            <Title>가이드</Title>
            <Slick 
                ref={slickRef}
                {...settings}
            >
                {images.map((v, i) => {
                    return (
                        <Item 
                            key={`guide_image_${v.title}`}
                            image={v.src}
                        >
                            <span className="hidden">
                                {v.title} 이미지
                            </span>
                        </Item>
                    ) 
                })}
            </Slick>

            <PrevButton onClick={onClickPrev}>
                <PrevIcon />
                <span className="hidden">이전</span>
            </PrevButton>

            <NextButton onClick={onClickNext}>
                <NextIcon />
                <span className="hidden">다음</span>
            </NextButton>
        </Wrap>
    );
};

export default Guide;