import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const TitleArea = styled.div`
    line-height: 1;
`;

const Sub = styled.div`
    font-size: ${({ theme }) => theme.calcRem(25)};
`;

const Title = styled.div`
    font-size: ${({ theme }) => theme.calcRem(55)};
`;

const ImageWrap = styled.div`
    margin: ${({ theme }) => theme.calcRem(30)} auto 0;
    width: ${({ theme }) => theme.calcRem(250)};
    height: ${({ theme }) => theme.calcRem(250)};
    overflow: hidden;
    border-radius: 50%;

    img {
        width: 100%;
    }
`;

const Tags = styled.div`
    margin-top: ${({ theme }) => theme.calcRem(20)};
    font-size: ${({ theme }) => theme.calcRem(14)};

    span + span {
        margin-left: ${({ theme }) => theme.calcRem(10)};
    }

    a {
        color: ${({ theme }) => theme.colors.black};
        border-bottom: 1px solid ${({ theme }) => theme.colors.black};

        &:hover {
            opacity: 0.5;
        }
    }
`;

const Social = styled.div`
    margin-top: ${({ theme }) => theme.calcRem(20)};
    line-height: 1;

    a {
        display: inline-block;
        width: ${({ theme }) => theme.calcRem(25)};
        height: ${({ theme }) => theme.calcRem(25)};
        color: ${({ theme }) => theme.colors.black};

        & + a {
            margin-left: ${({ theme }) => theme.calcRem(15)}; 
        }

        img {
            max-width: 100%;
        }
    }
`;

const Home = () => {
    const { tagData, socialData } = useSelector((state) => state.portfolio);

    return (
        <>
            <TitleArea>
                <Sub>FRONT-END DEVELOPER</Sub>
                <Title>PORTFOLIO</Title>
            </TitleArea>

            <ImageWrap>
                <img src="./portfolio/img_iam.jpg" alt="okayoon 사진" />
            </ImageWrap>

            <Tags>
                {tagData.map((v, i) => (
                    <span key={`tag_${v}_${i}`}>
                        {`#${v}`}
                    </span>
                ))}
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
                {socialData.map(({ name, src, image }) => (
                    <a 
                        key={`social_${name}`}
                        href={src} 
                        title={`${name} 바로가기`} 
                        target="_blank"
                    >
                        <img 
                            src={image} 
                            alt={`${name} 아이콘`} 
                        />
                    </a>
                ))}
            </Social>
        </>
    );
};

export default Home;