import React, { useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Slick from 'react-slick';
import styled, { css } from 'styled-components';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const Wrap = styled.div`
    text-align: center;
`;

const Title = styled.div`
    margin-bottom: 20px;
    display: inline-block;
    font-size: 20px;
    text-align: center;
    border-bottom: 1px solid #fff;
`;

const SlickWrap = styled.div`
    margin: 0 auto;
    position: relative;
    width: 450px;
    border: 1px solid #fff;
    vertical-align: top;
    overflow: hidden;

    img {
        width: 100%;
        height: 420px;
    }
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

const Guide = () => {
    const { nunsenseGuideImages } = useSelector((state) => state.game);
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
            <SlickWrap>
                <Slick 
                    ref={slickRef}
                    {...settings}
                >
                    {nunsenseGuideImages.map((v) => <img key={`가이드_${v.alt}`} src={v.src} alt={v.alt} />)}
                </Slick>

                <PrevButton onClick={onClickPrev}>
                    <PrevIcon />
                    <span className="hidden">이전</span>
                </PrevButton>

                <NextButton onClick={onClickNext}>
                    <NextIcon />
                    <span className="hidden">다음</span>
                </NextButton>
            </SlickWrap>
        </Wrap>
    );
};

export default Guide;