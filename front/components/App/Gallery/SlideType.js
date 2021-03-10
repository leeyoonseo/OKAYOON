import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
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
    overflow: hidden;

    & > div + div {
        margin-top: ${({ theme }) => theme.calcRem(20)};
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
    height: ${({ theme }) => theme.calcRem(350)};

    img {
        max-width: 100%;
    }
`;

const PagingItems = styled.div`
    ${defaultItemStyle}    
    height: ${({ theme }) => theme.calcRem(80)};
    cursor: pointer;
    
    img {
        width: 100%;
    }
`;

const defaultButtonStyle = css`
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
    ${defaultButtonStyle}
    left: 0;
`;

const NextButton = styled.button`
    ${defaultButtonStyle}
    right: 0;
`;

const defaultIconStyle = css`
    font-size: ${({ theme }) => theme.calcRem(22)};
    color: ${({ theme }) => theme.colors.gray};

    &:focus,
    &:hover { 
        color: ${({ theme }) => theme.colors.black};
    }
`;

const PrevIcon = styled(LeftOutlined)`
    ${defaultIconStyle}
`;

const NextIcon = styled(RightOutlined)`
    ${defaultIconStyle}
`;

const SlideType = ({ data }) => {
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
                        {data.map((v, i) => {
                            return (
                                <MainSlickItems key={`${v.title}_${i}`}>
                                    <img src={v.src} alt={v.title} />
                                    <div>{v.desc}</div>
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
                        {data.map((v, i) => {
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