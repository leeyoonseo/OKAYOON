import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import Slick from 'react-slick';
import styled, { css } from 'styled-components';
import { LeftOutlined, RightOutlined, ExportOutlined } from '@ant-design/icons';

import Header from '../components/Portfolio/Header';
import Footer from '../components/Portfolio/Footer';
import Home from '../components/Portfolio/Home';
import SideNav from '../components/Portfolio/SideNav';
import Introduce from '../components/Portfolio/Introduce';
import Skils from '../components/Portfolio/Skils';
import ImageZoom from '../components/Portfolio/ImageZoom';
import Contact from '../components/Portfolio/Contact';

const MAX_WIDTH = '1240px';

const Wrap = styled.div`
    font-family: 'Nanum Gothic';
    color: #666;

    a, button, h1, h2, h3, h4 {
        color: #666;
    }
`;

const Contents = styled.article`
    padding: 120px 2%;
    text-align: center;
    background: ${({ bg }) => bg ? bg : 'none'};
`;

const ContTitleArea = styled.div`
    margin-bottom: 50px;
    text-align: center;
`;

const ContTitle = styled.h3`
    font-size: 30px;
    color: #333;
    display: inline-block;
    border-bottom: 2px solid #666;
`;

const ContSubTitle = styled.div`
    font-size: 12px;
`;

const WorkArea = styled.div`
    margin: 0 auto;
    max-width: ${MAX_WIDTH};

    .slick-center img {
        filter: none;
    }

    .slick-track {
        margin: 0 auto;
    }
`;

const WorkItems = styled.div`
    & + div {
        margin-top: 100px;
    }
`;

const InfoArea = styled.div`
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 1.25;
`;

const WorkName = styled.div`
    margin-bottom: 15px;
    font-weight: 700;

    a { 
        margin-left: 10px;
        line-height: 1;
    }
`;

const SlickWrap = styled.div`
    position: relative;
    width: 100%;
    line-height: 1;
    overflow: hidden;
`;


const initSlickButtonStyle = css`
    position: absolute;
    top: 50%;
    padding: 0;
    line-height: 1;
    border: none;
    outline: none;
    background: #fff;
    cursor: pointer;
    transform: translateY(-50%);
    z-index: 1;
`;

const SlickPrevButton = styled.button`
    ${initSlickButtonStyle}
    left: 0;
`;

const SlickNextButton = styled.button`
    ${initSlickButtonStyle}
    right: 0;
`;

const SlickImage = styled.div`
    width: 20%;
    height: 12vw;
    cursor: pointer;
    overflow: hidden;

    img {
        width: 98%;
        height: 98%;
        filter: grayscale(1);
        border: 1px solid #666;
        box-sizing: border-box;
    }

    &:hover img {
        filter: none;
    }
`;

const WorkDesk = styled.div`
    line-height: 1.5;
`;

const WorkSkilsArea = styled.div`
    margin-top: 15px;   
    line-height: 2;
`;

const WorkSkils = styled.span`
    display: inline-block;
    height: 30px;
    border-radius: 10px;
    overflow: hidden;

    & + span {
        margin-left: 10px;
    }

    img {
        max-height: 80%;
    }
`;

const portfolio = () => {
    const { portfolioData } = useSelector((state) => state.portfolio);
    const [openedZoom, setOpenedZoom] = useState(false);
    const [zoomImageSrc, setZoomImageSrc] = useState(null);

    const SlickNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <SlickNextButton
                className={className}
                style={{ ...style }}
                onClick={onClick}
            >
                <RightOutlined />
            </SlickNextButton>
        );
    };

    const SlickPrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <SlickPrevButton
                className={className}
                style={{ ...style }}
                onClick={onClick}
            >
                <LeftOutlined />
            </SlickPrevButton>
        );
    };

    const slickSettings = {
        infinite: true,
        centerPadding: "60px",
        speed: 500,
        nextArrow: <SlickNextArrow />,
        prevArrow: <SlickPrevArrow />,
    };

    const onClickSlickImage = useCallback((src) => () => {
        setZoomImageSrc(src);
        onToggleZoom();
    }, [zoomImageSrc]);

    const onToggleZoom = useCallback(() => {
        setOpenedZoom(!openedZoom);
    }, [openedZoom]);

    return (
        <>
            <Head>
                <title>OKAYOON | PORTFOLIO</title>
            </Head>

            <Wrap>
                <h1 className="hidden">Portfolio 페이지</h1>

                <Header/>

                <section>
                    <h2 className="hidden">content 영역</h2>

                    <Contents className="home">
                        <h3 className="hidden">HOME</h3>

                        <Home />
                    </Contents>

                    <Contents className="iam" bg='#fff4ce'>
                        <ContTitleArea>
                            <ContTitle>I am</ContTitle>
                        </ContTitleArea>

                        <Introduce />
                    </Contents>

                    <Contents>
                        <ContTitleArea>
                            <ContTitle>Exprienced</ContTitle>
                            <ContSubTitle>
                                *상대적인 것이라 점수는 의미없다고 생각해 작성하지 않았습니다.<br />
                                업무에서 사용하였거나 결과물을 만든 경험이 있는 항목들만 추가하였습니다.
                            </ContSubTitle>
                        </ContTitleArea>

                        <Skils />
                    </Contents>

                    <Contents className="portfolio">
                        <ContTitleArea>
                            <ContTitle>Portfolio</ContTitle>
                            <ContSubTitle>
                                *일부 사이트는 업체측에 의해 리뉴얼되었을 수 있습니다.<br />
                                공부 목적의 페이지도 포함되어있습니다.
                            </ContSubTitle>
                        </ContTitleArea>

                        <WorkArea>
                            {portfolioData.map((v) => {
                                const max = 5;
                                const {length} = v.image;
                                const slickLenght = length < max ? length : max;

                                return (
                                    <WorkItems key={`portfolio_${v.name}`}>
                                        <InfoArea>
                                            <WorkName>
                                                <span>
                                                    {v.name}
                                                </span>
                                                <a
                                                    href={v.src} 
                                                    title={`${v.name} 바로가기`} 
                                                    target="_blank"
                                                >
                                                    <ExportOutlined />
                                                </a>
                                            </WorkName>
    
                                            <WorkDesk dangerouslySetInnerHTML={{__html: v.desc}} />
    
                                            <WorkSkilsArea>
                                                {v.skils.length >= 1 && v.skils.map((o, i) =>(
                                                    <WorkSkils key={`${v.name}_skils_${i}`}>
                                                        <img src={`../portfolio/skils/icon_${o}.png`} alt={`icon_${o}`}/>
                                                        {/* {(i === v.skils.length - 1) ? o : `${o},`} */}
                                                    </WorkSkils>
                                                ))}
                                            </WorkSkilsArea>
                                        </InfoArea>
    
                                        <SlickWrap>
                                            <Slick
                                                slidesToShow={slickLenght}
                                                {...slickSettings}
                                            >
                                                {v.image.length >= 1 && v.image.map((o, i) => (
                                                    <SlickImage 
                                                        key={`${v.name}_image_${i}`}
                                                        onClick={onClickSlickImage(o)}
                                                    >
                                                        <img 
                                                            src={o} 
                                                            alt={`${v.name}_image_${i}`}
                                                        />
                                                    </SlickImage>
                                                ))}
                                            </Slick>
                                        </SlickWrap>
                                    </WorkItems>
                                )
                            })}
                        </WorkArea>

                        {openedZoom && (
                            <ImageZoom 
                                src={zoomImageSrc} 
                                onClose={onToggleZoom}
                            />
                        )}
                    </Contents>
                    
                    <Contents className="contact" bg='#fff4ce'>
                        <ContTitle>Contact</ContTitle>
                        <Contact />                    
                    </Contents>
                </section>

                <SideNav />

                <Footer />
            </Wrap>
        </>
    );
};

export default portfolio;

// TODO:
// - reposistories 정리하기
// - 녹음기 완성해서 올릴것 
// - 뉴스레터 수정할 것 (망가진것들..)
// ----  사용할 수 있는지 확인..
// - trip checklist
//- chatapp 
// - pet_feed_calculator
