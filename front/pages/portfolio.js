import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import Head from 'next/head';

import styled from 'styled-components';
import { SEND_MAIL_REQUEST } from '../reducers/email';

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

const socialData = [
    {
        name: 'tstory',
        image: '../portfolio/icon_blog.png',
        src: 'https://okayoon.tistory.com/',
    },
    {
        name: 'github',
        image: '../portfolio/icon_github.png',
        src: 'https://github.com/leeyoonseo',
    },
    {
        name: 'instagram',
        image: '../portfolio/icon_instagram.png',
        // src: 'https://www.instagram.com/okayoon.lee/',
        src: '',
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
        name: '',
        image: ['', '', '',],
        src: '',
        desc: '',
        skils: [],
    }
];

const Wrap = styled.div`
    font-family: 'Nanum Gothic';
    color: #666;

    a, button, h1, h2, h3, h4 {
        color: #666;
    }
`;

const Header = styled.header`
    position: relative;
    padding: 20px 2%;
    text-align: right;
    box-sizing: border-box;
`;

const Logo = styled.span`
    position: absolute;
    left: 2%;
    vertical-align: top;
    line-height: 1;
`;

const LogoInner = styled.span`
    position: relative;
`;

const LogoIcon = styled.span`
    position: absolute;
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url(./icon_logo.png)no-repeat;
    background-size: 100% 100%;
`;

const LogoText = styled.span`
    padding-left: 22px;
    font-size: 22px;
    color: #ffd54f;
    text-shadow: 1px 1px 1px #666;
`;

const Nav = styled.div`
    display: inline-block;
    
    button {
        padding: 0;
        font-size: 17px;
        line-height: 1;
        border: none;
        outline: none;
        background: none;
        cursor: pointer;

        & + button {
            margin-left: 50px;
        }

        &:hover {
            opacity: 0.5;
        }
    }
`;

const Contents = styled.article`
    padding: 120px 2%;
    text-align: center;
    background: ${({ bg }) => bg ? bg : 'none'};
`;

const TitleArea = styled.div`
    line-height: 1;
`;

const SubTitle = styled.div`
    font-size: 25px;
`;

const Title = styled.div`
    font-size: 55px;
`;

const Frame = styled.div`
    margin: 30px auto 0;
    width: 250px;
    height: 250px;
    overflow: hidden;
    border-radius: 50%;

    img {
        width: 100%;
    }
`;

const Tags = styled.div`
    margin-top: 20px;
    font-size: 14px;

    span + span {
        margin-left: 10px;
    }

    a {
        color: #666;
        border-bottom: 1px solid #666;

        &:hover {
            opacity: 0.5;
        }
    }
`;

const Social = styled.div`
    margin-top: 20px;
    line-height: 1;

    a {
        display: inline-block;
        width: 25px;
        height: 25px;
        color: #666;

        & + a {
            margin-left: 15px;   
        }

        img {
            max-width: 100%;
        }
    }
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

const ContactInner = styled.div`
    max-width:700px;
    margin: 0 auto;
    padding: 30px;

    &:after { 
        content: '';
        display: block;
        clear: both;
    }

    & > div + div {
        margin-top: 20px;
    }
`;

const InfoArea = styled.div`
    display: block;
    font-size: 14px;

    & > div + div{
        margin-top: 5px;
    }
`;

const InfoImage = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto 15px;

    img {
        max-width: 100%;
    }
`;

const Portfolio = styled.div`

`;

const FormArea = styled.div`
    display: block;
    width: 100%
    box-sizing: border-box;
`;

const Form = styled.form`
    input,
    textarea {
        min-height: 35px;
        width: 100%;
        border: 1px solid #666;
        font-size: 14px;
        padding: 5px 10px;
        box-sizing: border-box;
        outline: none;
        resize: none;
        IME-MODE: auto;
    }

    button { 
        line-height: 1;
        border: 1px solid #666;
        outline: none;
        background: none;
        padding: 10px 20px;
        margin: 20px;
        cursor: pointer;
        font-size: 14px;
    }

    & > div + div {
        margin-top: 20px;
    }
`;

const FormReferenceMSG = styled.div`
    max-width: 700px;
    font-size: 13px;

    a {
        font-size: 13px;
        border-bottom: 1px solid #666;
    }
`;

const Footer = styled.footer`
    padding: 20px 2%;
    text-align: center;
    font-size: 13px;
    box-sizing: border-box;
`;

const portfolio = () => {
    const dispatch = useDispatch();
    const { sendMailDone } = useSelector((state) => state.email);
    const formRef = useRef(null);
    const [name, onChangeName, setName] = useInput('');
    const [email, onChangeEmail, setEmail] = useInput('');
    const [phone, onChangePhone, setPhone] = useInput('');
    const [message, onChangeMessage, setMessage] = useInput('');

    useEffect(() => {
        if (sendMailDone) {
            setName('');
            setEmail('');
            setPhone('');
            setMessage('');
        }
    }, [sendMailDone]);

    const validation = useCallback((target) => {
        const inputNum = target.childElementCount - 1; // [D] 버튼한개 제외
        const data = new FormData(target);
        const entries = data.entries();
        let failNum = 0;
        let next = '';
        let key = '';
        let value = '';

        for (let i = 0; i < inputNum; i++) {
            next = entries.next();
            key = next.value[0];
            value = next.value[1];

            if (!value) {
                if (key !== 'phone') {
                    failNum++;
                    alert(`${key} 비어있습니다.`);
                    break;
                }
            }
        }

        return !failNum ? true : false;
    }, []);
    
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        const { target } = e;
        const isChecked = validation(target);

        if (isChecked) {
            dispatch({
                type: SEND_MAIL_REQUEST,
                data: target
            });
        }
    }, []);

    return (
        <>
            <Head>
                <title>OKAYOON | PORTFOLIO</title>
            </Head>

            <Wrap>
                <h1 className="hidden">Portfolio 페이지</h1>

                <Header>
                    <h2 className="hidden">header 영역</h2>

                    <Logo>
                        <LogoInner>
                            <LogoIcon /><LogoText>kayoon</LogoText>
                        </LogoInner>
                    </Logo>

                    <Nav>
                        <button>Home</button>
                        <button>I am</button>
                        <button>Portfolio</button>
                        <button>Contact</button>
                    </Nav>
                </Header>

                <section>
                    <h2 className="hidden">content 영역</h2>

                    <Contents>
                        <h3 className="hidden">HOME</h3>

                        <TitleArea>
                            <SubTitle>FRONT-END DEVELOPER</SubTitle>
                            <Title>PORTFOLIO</Title>
                        </TitleArea>

                        <Frame>
                            <img src="./portfolio/img_iam.jpg" alt="okayoon 사진" />
                        </Frame>

                        <Tags>
                            <span>#집사_견주</span>
                            <span>#집순이</span>
                            <span>#흥미로운_도전</span>
                            <span>#카공_얼죽아</span>
                            <span>#공유</span>
                            <span>#오버워치</span>
                            <span>#
                                <a 
                                    href="https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-istp" 
                                    target="_blank" 
                                    title="ISTP 성격유형 새창으로보기"
                                >
                                    ISTP
                                </a>
                            </span>
                        </Tags>

                        <Social>
                            {socialData.map((v) => (
                                <a 
                                    key={`social_${v.name}`}
                                    href={v.src} 
                                    title={`${v.name} 바로가기`} 
                                    target="_blank"
                                >
                                    <img src={v.image} alt={`${v.name} 아이콘`} />
                                </a>
                            ))}
                        </Social>
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
                        
                        <Portfolio>
                            
                        </Portfolio>
                    </Contents>
                    
                    <Contents>
                        <ContTitle>Contact</ContTitle>

                        <ContactInner>
                            <InfoArea>
                                <InfoImage>
                                    <img src="./portfolio/img_cat.jpg" title="고양이 사진"/>
                                </InfoImage>

                                <div><span>이윤서 / 1992.04.23</span></div>
                                <div><span>okayoon.lee@gmail.com</span></div>
                            </InfoArea>

                            <FormArea>
                                <Form 
                                    ref={formRef}
                                    onSubmit={onSubmit}
                                >
                                    <div>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            placeholder="성함을 입력해주세요"
                                            value={name}
                                            onChange={onChangeName}
                                        />
                                    </div>

                                    <div>
                                        <input 
                                            type="text" 
                                            name="email" 
                                            placeholder="메일 주소를 입력해주세요" 
                                            value={email}
                                            onChange={onChangeEmail}
                                        />
                                    </div>

                                    <div>
                                        <input 
                                            type="text" 
                                            name="phone" 
                                            placeholder="연락처를 입력해주세요 (생략 가능)" 
                                            value={phone}
                                            onChange={onChangePhone}
                                        />
                                    </div>

                                    <div>
                                        <textarea 
                                            name="message" 
                                            rows="5" 
                                            placeholder="내용을 입력해주세요" 
                                            value={message}
                                            onChange={onChangeMessage}
                                        />
                                        <FormReferenceMSG>
                                            파일이 있는 메세지는&nbsp;
                                            <a href="mailto:okayoon.lee@gmail.com">okayoon.lee@gmail.com</a>로 발송해주세요.
                                        </FormReferenceMSG>
                                    </div>

                                    <button type="submit">
                                        보내기
                                    </button>
                                </Form>
                            </FormArea>
                        </ContactInner>                        
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
