import React, { useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Slick from 'react-slick';
import styled, { css } from 'styled-components';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Layout from './Layout';

const Inner = styled.div`
    display: inline-block;

    & > div + div {
        margin-top: ${({ theme }) => theme.calcRem(20)};
    }
`;

const Title = styled.div`
    display: inline-block;
    line-height: 1;

    font-size: ${({ theme }) => theme.calcRem(35)};
    color: ${({ theme }) => theme.nColors.orange};
    text-shadow: -${({ theme }) => theme.calcRem(2)} 0  ${({ theme }) => theme.nColors.black}, 
                0 ${({ theme }) => theme.calcRem(2)}  ${({ theme }) => theme.nColors.black}, 
                ${({ theme }) => theme.calcRem(2)} 0  ${({ theme }) => theme.nColors.black}, 
                0 -${({ theme }) => theme.calcRem(2)}  ${({ theme }) => theme.nColors.black};
`;

const SlickWrap = styled.div`
    margin: 0 auto;
    position: relative;
    width: ${({ theme }) => theme.calcRem(550)};
    border: ${({ theme }) => theme.calcRem(3)} solid ${({ theme }) => theme.nColors.black};
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
    color: ${({ theme }) => theme.nColors.black};

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
        <Layout>
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
        </Layout>
    );
};

export default Guide;