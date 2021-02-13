import React, { useCallback, useEffect, useRef, useState } from 'react';
import Slick from 'react-slick';
import styled, { css } from 'styled-components';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const Wrap = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
`;

const Inner = styled.div`
    position: relative;
    top: -25px;
    overflow: hidden;

    & > div + div {
        margin-top: 20px;
    }
`;

const SlickWrap = styled.div`
    position: relative;

    .paging_items {
        filter: grayscale(1);

        &:hover {
            filter: none;
        }
    }

    .slick-current .paging_items {
        filter: none;
    }
`;

const defaultItemStyle = css`
    width: 100%;    
    text-align: center;

    img {
        height: 100%;
        vertical-align: top;
    }
`;

const MainSlickItems = styled.div`
    ${defaultItemStyle}    
    height: 350px;

    img {
        max-width: 100%;
    }
`;

const PagingItems = styled.div`
    ${defaultItemStyle}    
    height: 80px;
    cursor: pointer;
    
    img {
        width: 100%;
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

const SlideType = ({ images }) => {
    const [mainSlick, setMainSlick] = useState(null);
    const [pagingSlick, setPagingSlick] = useState(null);
    const mainSlickRef = useRef(null);
    const pagingSlickRef = useRef(null);

    useEffect(() => {
        setMainSlick(mainSlickRef.current);
        setPagingSlick(pagingSlickRef.current);
    }, []);

    const mainSettings = {
        dots: false,
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const pagingSettings = {
        dots: false,
        arrows: false,
        centerMode: true,
        slidesToShow: 8,
        swipeToSlide: true,
        focusOnSelect: true,
    };

    const onClickPrev = useCallback((ref) => () => ref.current.slickPrev(), []);
    const onClickNext = useCallback((ref) => () => ref.current.slickNext(), []);

    return (
        <Wrap>
            <Inner>
                <SlickWrap>
                    <Slick 
                        ref={mainSlickRef} 
                        asNavFor={pagingSlick}
                        {...mainSettings}
                    >
                        {images.map((v, i) => {
                            return (
                                <MainSlickItems key={`${v.title}_${i}`}>
                                    <img src={v.src} />
                                </MainSlickItems>
                            )
                        })}
                    </Slick>

                    <>
                        <PrevButton onClick={onClickPrev(mainSlickRef)}>
                            <PrevIcon />
                            <span className="hidden">이전</span>
                        </PrevButton>

                        <NextButton onClick={onClickNext(mainSlickRef)}>
                            <NextIcon />
                            <span className="hidden">다음</span>
                        </NextButton>
                    </>
                </SlickWrap>

                <SlickWrap>
                    <Slick
                        ref={pagingSlickRef}
                        asNavFor={mainSlick}
                        {...pagingSettings}
                    >
                        {images.map((v, i) => {
                            return (
                                <PagingItems 
                                    key={`${v.title}_${i}`}
                                    className="paging_items"
                                >
                                    <img src={v.src} />
                                </PagingItems>
                            )
                        })}
                    </Slick>

                    <>
                        <PrevButton onClick={onClickPrev(pagingSlickRef)}>
                            <PrevIcon />
                            <span className="hidden">이전</span>
                        </PrevButton>

                        <NextButton onClick={onClickNext(pagingSlickRef)}>
                            <NextIcon />
                            <span className="hidden">다음</span>
                        </NextButton>
                    </>
                </SlickWrap>
            </Inner>
        </Wrap>
    );
};

export default SlideType;