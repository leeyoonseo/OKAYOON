import React, { useCallback, useEffect, useRef } from 'react';
import Slick from 'react-slick';
import Head from 'next/head';
import { LeftOutlined, RightOutlined, ExportOutlined } from '@ant-design/icons';
import styled, { css } from 'styled-components';

import Header from '../components/Portfolio/Header';
import Home from '../components/Portfolio/Home';
import Contact from '../components/Portfolio/Contact';

// TODO: 데이터 옮기기
const skilsData = [
    {
        name: 'Javascript',
        src: './portfolio/skils/icon_javascript.png',
    },
    {
        name: 'jquery',
        src: './portfolio/skils/icon_jquery.png',
    },
    {
        name: 'react',
        src: './portfolio/skils/icon_react.png',
    },
    {
        name: 'redux',
        src: './portfolio/skils/icon_redux.png',
    },
    {
        name: 'redux_saga',
        src: './portfolio/skils/icon_redux_saga.png',
    },
    {
        title: 'Vue',
        src: './portfolio/skils/icon_vue.png',
    },
    {
        name: 'axios',
        src: './portfolio/skils/icon_axios.jpg',
    },
    {
        name: 'sequelize',
        src: './portfolio/skils/icon_sequelize.png',
    },
    {
        name: 'html',
        src: './portfolio/skils/icon_html5.png',
    },
    {
        name: 'css',
        src: './portfolio/skils/icon_css3.png',
    },
    {
        name: 'scss',
        src: './portfolio/skils/icon_scss.png',
    },
    
    {
        name: 'styled_components',
        src: './portfolio/skils/icon_styled_components.png',
    },
    {
        name: 'git',
        src: './portfolio/skils/icon_git.png',
    },
    {
        name: 'svn',
        src: './portfolio/skils/icon_svn.png',
    },
];


const PortfolioData = [
    {
        name: 'OKAYOON',
        image: [
            '../portfolio/site/portfolio_site0.png', 
            '../portfolio/site/portfolio_site1.png', 
            '../portfolio/site/portfolio_site2.png', 
            '../portfolio/site/portfolio_site3.png', 
            '../portfolio/site/portfolio_site4.png', 
            '../portfolio/site/portfolio_site5.png', 
        ],
        src: 'http://www.okayoon.com', 
        desc: 'React, Redux등 학습목적으로 만든 포플사이트입니다.',
        skils: ['next', 'React', 'redux-saga', 'axios', 'styled-components', 'eslint', 'dayjs', 'immer', 'sequelize', 'mySQL' ],
    },
    {
        name: '녹음기',
        image: [
            '../portfolio/site/portfolio_site0.png', 
            '../portfolio/site/portfolio_site1.png', 
            '../portfolio/site/portfolio_site2.png', 
        ],
        src: 'http://www.okayoon.com', 
        desc: 'React, Redux등 ',
        skils: ['next', 'React', 'redux-saga', 'axios'],
    },
    {
        name: 'Rsupport 브랜드사이트',
        image: [
            '../portfolio/site/portfolio_site0.png', 
            '../portfolio/site/portfolio_site1.png', 
            '../portfolio/site/portfolio_site2.png', 
            '../portfolio/site/portfolio_site2.png', 
            '../portfolio/site/portfolio_site2.png', 
            '../portfolio/site/portfolio_site3.png', 
            '../portfolio/site/portfolio_site4.png', 
            '../portfolio/site/portfolio_site5.png', 
        ],
        src: 'http://www.okayoon.com', 
        desc: 'React, Redux등 학습목적으로 만든 포플사이트입니다.',
        skils: ['next', 'React', 'redux-saga', 'axios', 'styled-components', 'eslint', 'dayjs', 'immer', 'sequelize', 'mySQL' ],
    },
    {
        name: 'Newsletter (사내 솔루션)',
        image: [
            '../portfolio/site/portfolio_site0.png', 
            '../portfolio/site/portfolio_site1.png', 
            '../portfolio/site/portfolio_site2.png', 
            '../portfolio/site/portfolio_site3.png', 
            '../portfolio/site/portfolio_site4.png', 
            '../portfolio/site/portfolio_site5.png', 
        ],
        src: 'http://www.okayoon.com', 
        desc: 'React, Redux등 학습목적으로 만든 포플사이트입니다.',
        skils: [],
    },
    {
        name: 'OKAYOON',
        image: [],
        src: 'http://www.okayoon.com', 
        desc: 'React, Redux등 학습목적으로 만든 포플사이트입니다.',
        skils: [],
    },
    // {
    //     name: '',
    //     image: ['', '', '',],
    //     src: '',
    //     desc: '',
    //     skils: [],
    // }
];
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

const ContReferenctMSG = styled.div`
    font-size: 12px;
`;

const Introduce = styled.div`
    padding: 30px;
    background: white;
    max-width: 700px;
    margin: 0 auto;
    border-radius: 10px;
`;

const Skils = styled.div`
    margin: 0 auto;
    max-width: 700px;
`;

const SkilItems = styled.div`
    height: 50px;
    width: 19%;
    height: 100px;
    display: inline-block;

    &:nth-child(n+6) {
        margin-top: 10px;
    }

    & + div {
        margin-left: 1%;
    }    

    span {
        display: inline-block;
        padding: 5px;

        img {
            width: 100%;
        }
    }

    &.jquery {
        span {
            background: #0769ad;
        }
    }

    &.styled_components {
        span {
            background: #3e3e3e;
        }
    }
`;

const PortfolioArea = styled.div`
    margin: 0 auto;
    max-width: ${MAX_WIDTH};

    .slick-center img {
        filter: none;
    }
`;

const PortfolioItems = styled.div`
    & + div {
        margin-top: 60px;
    }
`;

const PortfolioInfo = styled.div`
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 1.25;
`;

const PortfolioName = styled.div`
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
    background: none;
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

const PortfolioImg = styled.div`
    width: 300px;
    height: 240px;
    overflow: hidden;

    img {
        width: 98%;
        height: 98%;
        filter: grayscale(1);
    }

    &:hover img {
        filter: none;
    }

    
`;

const PortfolioSkils = styled.span`
    display: inline-block;

    & + span {
        margin-left: 5px;
    }
`;


const Footer = styled.footer`
    padding: 20px 2%;
    text-align: center;
    font-size: 13px;
    box-sizing: border-box;
`;

const portfolio = () => {

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
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 4,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 500,
        nextArrow: <SlickNextArrow />,
        prevArrow: <SlickPrevArrow />,
    };

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

                    <Contents>
                        <h3 className="hidden">HOME</h3>

                        <Home />
                    </Contents>

                    <Contents bg='#fff4ce'>
                        <ContTitleArea>
                            <ContTitle>I am</ContTitle>
                        </ContTitleArea>

                        <Introduce>
                            안녕하세요. Web Front-End 이윤서입니다.<br /><br />  

{/* 타이틀 달기!! */}
                            {/* 어릴적, 아침 일찍 일어나 디즈니 만화를 본 경험이 있나요?
                            시간이 어떻게 흘러가는지도 모를만큼 눈을 반짝이며 집중하던 어린아이를 전 기억합니다.<br />

                            '재미' 
                            단 하나의 단어가 나를 부지런하게 그리고 꾸준하게 만드는 것을 많이 겪으며 살았습니다.
                            그래서 저는 '재미있게 접근하자'를 모토로 삼게되었습니다.
                            
                            물론 늘 재미있을수는 없겠지만,
                            간혹 느끼는 재미들이 저를 더욱 발전하게만들고 성장시켰다고 생각합니다. */}

                            {/* 어릴적, 아침일찍 일어나 디즈니 만화를 집중하며 보던 경험들이 있으신가요?<br />
                            시간이 어떻게 흘러가는지도 모를만큼, 눈을 반짝이던 자신을요.<br />
                            저는 그 기억을 되새기며, <strong>"재미있게 접근하자"</strong>를 <br />
                            모토로 삼고 개발에 임하려 노력하고 있습니다.<br />
                            개발이 개발자에게 늘 재미있다면 얼마나 행복한 일인지 상상하면서요. */}

                            {/* 저는 반복된 작업을 별로 좋아하지않습니다.
                                사내에서 반복적으로 작업하는 비효율적인 부분을 개인이 토이프로젝트로 설정하여
                                HTML을 업로드하고 결과물을 확인할 수 있으며
                                HTML로 부터 원하는 영역의 코드들을 복사해서 사용할 수 있도록 하는 마케팅팀과의 협업사이트였습니다.
                            */}

                            {/*
    업무 중 협업에 대한 차이를 느낀 적들이 있는데, 
    이번에 제작한 포트폴리오를 통해 기획부터 디자인, 개발, 배포까지 여러직군의 대한 이해도를 한층 키웠습니다.
    과거부터 개발 뿐만 아니라 전체적인 서비스를 생각하며 사용자들에게 도움이 되는 서비스를 만들어 나가고 싶어서
    좋은 아이디어가 있으면 팀원에게 정보를 공유를 하는 것을 좋아했습니다.

    처음 입사한 회사가 자사 솔루션 회사였기에 팀 규모가 있었고, 주마다 돌아가며 발표하는 문화가 있었는데, 도움이 많이 되었습니다.
    이후 입사한 회사에서도 마음이 맞는 분과 함께 공유하는 문화를 이어갔고, 그렇지 않은 팀원들에게는 내가 얻은 정보를 공유하는 
    형식으로 진행했습니다. 
    이렇듯 저는 같이 일하는 개발자들과 함께 좋은 개발 문화를 만들어 나가는데에 관심이 있습니다.
 */}
                            
                        </Introduce>
                    </Contents>

                    <Contents>
                        <ContTitleArea>
                            <ContTitle>Exprienced</ContTitle>
                            <ContReferenctMSG>
                                *상대적인 것이라 점수는 의미없다고 생각해 작성하지 않았습니다.<br />
                                업무에서 사용하였거나 결과물을 만든 경험이 있는 항목들만 추가하였습니다.
                            </ContReferenctMSG>
                        </ContTitleArea>
                        
                        <Skils> 
                            {skilsData.map((v, i) => {
                                return(
                                    <SkilItems 
                                        key={`skils_${v.name}`}
                                        className={v.name}
                                    >
                                        <span>
                                            <img src={v.src} alt={`${v.title} 아이콘`} />
                                        </span>
                                    </SkilItems>
                                )
                            })}
                        </Skils>
                    </Contents>

                    <Contents bg='#fff4ce'>
                        <ContTitleArea>
                            <ContTitle>Portfolio</ContTitle>
                            <ContReferenctMSG>
                                *일부 사이트는 업체측에 의해 리뉴얼되었을 수 있습니다.<br />
                                공부 목적의 페이지도 포함되어있습니다.
                            </ContReferenctMSG>
                        </ContTitleArea>
                        
                        {/* 
    //     name: '',
    //     image: ['', '', '',],
    //     src: '',
    //     desc: '',
    //     skils: [], */}
    
                        <PortfolioArea>
                            {PortfolioData.map((v) => (
                                <PortfolioItems key={`portfolio_${v.name}`}>
                                    <PortfolioInfo>
                                        <PortfolioName>
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
                                        </PortfolioName>

                                        <div>
                                            {v.desc}
                                        </div>
                                        
                                        {v.skils.length >= 1 && v.skils.map((o, i) =>(
                                            <PortfolioSkils key={`${v.name}_skils_${i}`}>
                                                {(i === v.skils.length - 1) ? o : `${o},`}
                                            </PortfolioSkils>
                                        ))}
                                    </PortfolioInfo>


                                    <SlickWrap>
                                        <Slick
                                            {...slickSettings}
                                        >
                                            {v.image.length >= 1 && v.image.map((o, i) => (
                                                <PortfolioImg key={`${v.name}_image_${i}`}>
                                                    <img 
                                                        src={o} 
                                                        alt={`${v.name}_image_${i}`}
                                                    />
                                                </PortfolioImg>
                                            ))}
                                        </Slick>
                                    </SlickWrap>
                                </PortfolioItems>
                            ))}
                        </PortfolioArea>
                    </Contents>
                    
                    <Contents>
                        <ContTitle>Contact</ContTitle>
                        <Contact />                    
                    </Contents>
                </section>

                {/* <SideNav>
                    <div>Home</div>
                    <div>About us</div>
                    <div>Portfolio</div>
                    <div>Contact</div>
                </SideNav> */}

                <Footer>
                    <h2 className="hidden">footer 영역</h2>

                    Copyright 2021. Web Front-end developer portfolio
                </Footer>
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
