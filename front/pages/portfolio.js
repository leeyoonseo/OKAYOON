import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import styled, { ThemeContext, css } from 'styled-components';
import { ExportOutlined } from '@ant-design/icons';

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
    color: ${({ theme }) => theme.colors.black};

    a, button, h1, h2, h3, h4 {
        color: ${({ theme }) => theme.colors.black};
    }
`;

const Contents = styled.article`
    padding: ${({ theme }) => theme.calcRem(120)} 2%;
    text-align: center;
    background: ${({ bg }) => bg ? bg : 'none'};

    @media only screen and ${({ theme }) => theme.device.mobileS} {
        padding: ${({ theme }) => theme.calcRem(60)} 10%;
    }
`;

const ContTitleArea = styled.div`
    margin-bottom: ${({ theme }) => theme.calcRem(50)};
    text-align: center;
`;

const ContTitle = styled.h3`
    display: inline-block;
    font-size: ${({ theme }) => theme.calcRem(30)};
    color: ${({ theme }) => theme.pfColors.black};
    border-bottom: ${({ theme }) => theme.calcRem(2)} solid ${({ theme }) => theme.colors.black};
`;

const ContSubTitle = styled.div`
    font-size: ${({ theme }) => theme.calcRem(12)};
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
        margin-top: ${({ theme }) => theme.calcRem(100)};
    }
`;

const InfoArea = styled.div`
    margin-bottom: ${({ theme }) => theme.calcRem(10)};
    font-size: ${({ theme }) => theme.calcRem(14)};
    line-height: 1.25;
`;

const CaptureItem = styled.span`
    display: inline-block;
    width: 16%;
    height: ${({ theme }) => theme.calcRem(190)};
    line-height: 1;
    border: 1px solid ${({ theme }) => theme.colors.black};
    box-sizing: border-box;
    overflow: hidden;
    cursor: pointer;
    filter: grayscale(1);

    @media only screen and ${({ theme }) => theme.device.mobile} {
        width: ${({ len }) => (len === 4) ? '40%' : '25%'};
    }

    @media only screen and ${({ theme }) => theme.device.mobileSS} {
        width: 40%;
        height: ${({ theme }) => theme.calcRem(150)};
    }
    
    &:hover {
        filter: none;
    }
    
    & + span {
        margin-left: 0.5%;
    }

    img {
        width: 100%;
        height: 100%;
    }
`;

const WorkName = styled.div`
    margin-bottom: ${({ theme }) => theme.calcRem(15)};
    font-weight: 700;

    a { 
        margin-left: ${({ theme }) => theme.calcRem(10)};
        line-height: 1;
    }
`;

const WorkDesk = styled.div`
    line-height: 1.5;
`;

const WorkSkilsArea = styled.div`
    margin-top: ${({ theme }) => theme.calcRem(15)};  
    line-height: 2;
`;

const WorkSkils = styled.span`
    display: inline-block;
    height: ${({ theme }) => theme.calcRem(30)};
    border-radius: ${({ theme }) => theme.calcRem(10)};
    overflow: hidden;

    & + span {
        margin-left: ${({ theme }) => theme.calcRem(10)};
    }

    img {
        max-height: 80%;
    }
`;

const portfolio = () => {
    const themeContext = useContext(ThemeContext);
    const { portfolioData } = useSelector((state) => state.portfolio);
    const [openedZoom, setOpenedZoom] = useState(false);
    const [zoomImageSrc, setZoomImageSrc] = useState(null);

    const onClickImage = useCallback((e) => {
        setZoomImageSrc(e.target.src);
        onToggleZoom();
    }, [zoomImageSrc, openedZoom]);

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

                    <Contents className="iam" bg={themeContext.pfColors.lightYellow}>
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
                            {portfolioData.map(({ image, name, src, desc, skils }) => {
                                return (
                                    <WorkItems key={`portfolio_${name}`}>
                                        <InfoArea>
                                            <WorkName>
                                                <span>
                                                    {name}
                                                </span>
                                                <a
                                                    href={src} 
                                                    title={`${name} 바로가기`} 
                                                    target="_blank"
                                                >
                                                    <ExportOutlined />
                                                </a>
                                            </WorkName>
    
                                            <WorkDesk dangerouslySetInnerHTML={{__html: desc}} />
    
                                            <WorkSkilsArea>
                                                {skils.length >= 1 && skils.map((o, i) => {
                                                    if (!o) return;

                                                    return (
                                                        <WorkSkils key={`${name}_skils_${i}`}>
                                                            <img 
                                                                src={`../portfolio/skils/icon_${o}.png`} 
                                                                alt={`icon_${o}`}
                                                            />
                                                        </WorkSkils>
                                                    )
                                                })}
                                            </WorkSkilsArea>
                                        </InfoArea>

                                            {image.length >= 1 && image.map((o, i) => (
                                                <CaptureItem
                                                    key={`${name}_image_${i}`}
                                                    len={image.length}
                                                    onClick={onClickImage}
                                                >
                                                    <img 
                                                        src={o}
                                                        alt={`${name}_image_${i}`}
                                                    />
                                                </CaptureItem>
                                            ))}
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
                    
                    <Contents 
                        className="contact" 
                        bg={themeContext.pfColors.lightYellow}
                    >
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

// TODO: 반응형