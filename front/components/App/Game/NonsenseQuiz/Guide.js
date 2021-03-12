import React, { useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Slick from 'react-slick';
import styled, { css } from 'styled-components';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const Wrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 5%;
    height: calc(100% - ${({ theme }) => theme.calcRem(30)});
    font-size: ${({ theme }) => theme.calcRem(16)};
    text-align: center;
    background: none;
    border-radius: 0 0 ${({ theme }) => theme.calcRem(20)} ${({ theme }) => theme.calcRem(20)};
`;

const Inner = styled.div`
    padding: 0 5%;
    display: inline-block;

    & > div + div {
        margin-top: ${({ theme }) => theme.calcRem(20)};
    }
`;

const Title = styled.div`
    display: inline-block;
    line-height: 1;

    font-size: ${({ theme }) => theme.calcRem(35)};
    color: ${({ theme }) => theme.nonsenseColors.orange};
    text-shadow: -${({ theme }) => theme.calcRem(2)} 0  ${({ theme }) => theme.nonsenseColors.black}, 
                0 ${({ theme }) => theme.calcRem(2)}  ${({ theme }) => theme.nonsenseColors.black}, 
                ${({ theme }) => theme.calcRem(2)} 0  ${({ theme }) => theme.nonsenseColors.black}, 
                0 -${({ theme }) => theme.calcRem(2)}  ${({ theme }) => theme.nonsenseColors.black};
`;

const SlickWrap = styled.div`
    margin: 0 auto;
    position: relative;
    width: ${({ theme }) => theme.calcRem(550)};
    border: ${({ theme }) => theme.calcRem(2)} solid ${({ theme }) => theme.nonsenseColors.black};
    vertical-align: top;
    overflow: hidden;

    img {
        max-width: 100%;
        height: ${({ theme }) => theme.calcRem(450)};
    }
`;

const initialSlickButton = css`
    position: absolute;
    top: 50%;
    padding: 0;
    width: ${({ theme }) => theme.calcRem(30)};
    height: ${({ theme }) => theme.calcRem(30)};
    line-height: 1;
    border: none;
    border-radius: 50%;
    background: none;
    outline: none;
    transform:translateY(-50%);
    cursor: pointer;
`;

const PrevButton = styled.button`
    ${initialSlickButton}
    left: 0;
`;

const NextButton = styled.button`
    ${initialSlickButton}
    right: 0;
`;

const defaultIconStyle = css`
    font-size: ${({ theme }) => theme.calcRem(22)};
    color: ${({ theme }) => theme.nonsenseColors.black};

    &:hover { 
        color: ${({ theme }) => theme.colors.white};
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
            <Inner>
                <Title>게임 방법</Title>
                <SlickWrap>
                    <Slick 
                        ref={slickRef}
                        {...settings}
                    >
                        {nunsenseGuideImages.map(({ alt, src }) => (
                            <img key={`가이드_${alt}`} src={src} alt={alt} />
                        ))}
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
            </Inner>
        </Wrap>
    );
};

export default Guide;