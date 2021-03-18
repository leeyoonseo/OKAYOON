import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import Head from 'next/head';

import styled from 'styled-components';
import { SEND_MAIL_REQUEST } from '../reducers/email';

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

const Container = styled.section`
    // padding: 120px 0;
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

const ArticleTitle = styled.h3`
    font-size: 30px;
    color: #333;
    display: inline-block;
    border-bottom: 2px solid #666;
    margin-bottom: 50px;
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

const Items = styled.div`
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

const RefMessage = styled.div`
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

                <Container>
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
                            <span>#집사</span>
                            <span>#견주</span>
                            <span>#카공_얼죽아</span>
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
                    </Contents>

                    <Contents bg='#fff4ce'>
                        <ArticleTitle>I am</ArticleTitle>

                        <Introduce>
                            안녕하세요. Web Front-End 이윤서입니다.<br /><br />  

                            어릴적, 아침일찍 일어나 디즈니 만화를 집중하며 보던 경험들이 있으신가요?<br />
                            시간이 어떻게 흘러가는지도 모를만큼, 눈을 반짝이던 자신을요.<br />
                            저는 그 기억을 되새기며, <strong>"재미있게 접근하자"</strong>를 <br />
                            모토로 삼고 개발에 임하려 노력하고 있습니다.<br />
                            개발이 개발자에게 늘 재미있다면 얼마나 행복한 일인지 상상하면서요.
                        </Introduce>
                    </Contents>

                    <Contents>
                        <ArticleTitle>Skils</ArticleTitle>

                        <Skils> 
                            {skilsData.map((v, i) => {
                                return(
                                    <Items 
                                        key={`skils_${v.name}`}
                                        className={v.name}
                                    >
                                        <span>
                                            <img src={v.src} alt={`${v.title} 아이콘`} />
                                        </span>
                                    </Items>
                                )
                            })}
                        </Skils>
                    </Contents>

                    <Contents bg='#fff4ce'>
                        <ArticleTitle>Portfolio</ArticleTitle>

                        <div>

                        </div>
                    </Contents>
                    
                    <Contents>
                        <ArticleTitle>Contact</ArticleTitle>

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
                                        <RefMessage>
                                            파일이 있는 메세지는&nbsp;
                                            <a href="mailto:okayoon.lee@gmail.com">okayoon.lee@gmail.com</a>로 발송해주세요.
                                        </RefMessage>
                                    </div>

                                    <button type="submit">
                                        보내기
                                    </button>
                                </Form>
                            </FormArea>
                        </ContactInner>                        
                    </Contents>
                </Container>

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