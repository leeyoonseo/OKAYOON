import React, { useRef } from 'react';
import Slick from 'react-slick';
import styled, { css } from 'styled-components';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const sampleImages = [
    {
        src: "https://www.artinsight.co.kr/data/tmp/1910/20191029212614_fawslbwd.jpg",
        title: "1"
    },
    {
        src: "https://www.artinsight.co.kr/data/tmp/1910/20191029212649_esiekzxf.jpg",
        title: "2"
    },
    {
        src: "https://www.artinsight.co.kr/data/tmp/1910/20191029212707_zcrkccgp.jpg",
        title: "3"
    },
    {
        src: "https://www.artinsight.co.kr/data/tmp/1910/20191029212724_pacwfbiz.jpg",
        title: "4"
    },
];

const Wrap = styled.div`
    position: relative;
    padding-bottom: 70px;
    overflow: hidden;

    .slick-slide {
        display: inline-block;
    }

    .slick-dots.slick-thumb {
        position: absolute;
        bottom: 0;
        left: 50%;
        padding: 0;
        margin: 0;
        list-style: none;
        transform: translate(-50%);

        li {
            position: relative;
            display: inline-block;

            &.slick-active {
                span {
                    filter: none;
                }
            }
        }
    }  
`;

const SlickItems = styled.div`
    width: 100%;    
    height: 400px;
    text-align: center;

    img {
        max-width: 100%;
        height: 100%;
        vertical-align: top;
    }
`;

const defaultButtonStyle = css`
    position: absolute;
    top: calc(50% - 50px);
    padding: 0;
    width: 30px;
    height: 30px;
    line-height: 1;
    border: none;
    border-radius: 50%;
    background: none;
    outline: none;
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

const PagingAnchor = styled.a`
    display: block;
    width: 50px;
    height: 50px;

    img {
        width: 100%;
        height: 100%;
    }
`;

const Paging = styled.span`
    display: inline-block;
    width: 100%;
    height: 100%;
    vertical-align: middle;
    background: url(${props => props.src})no-repeat;
    background-size: 100% 100%;
    filter: grayscale(1);
`;

const slide = () => {
    const slickRef = useRef(null);

    const settings = {
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        customPaging: function(i) {
            const imgSrc = sampleImages[i].src;
            return (
                <PagingAnchor>
                    <Paging src={imgSrc} />
                </PagingAnchor>
            );
        },
    };

    const previous = () => {
        slickRef.current.slickPrev();
    };

    const next = () => {
        slickRef.current.slickNext();
    };

    return (
        <Wrap>
            <Slick ref={slickRef} {...settings}>
                {sampleImages.map((v, i) => {
                    return (
                        <SlickItems key={`${v.title}_${i}`}>
                            <img src={v.src} />
                        </SlickItems>
                    )
                })}
            </Slick>

            <>
                <PrevButton onClick={previous}>
                    <PrevIcon />
                    <span className="hidden">이전</span>
                </PrevButton>

                <NextButton onClick={next}>
                    <NextIcon />
                    <span className="hidden">다음</span>
                </NextButton>
            </>
        </Wrap>
    );
};

export default slide;