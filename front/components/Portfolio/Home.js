import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';


const TitleArea = styled.div`
    line-height: 1;
`;

const Sub = styled.div`
    font-size: 25px;
`;

const Title = styled.div`
    font-size: 55px;
`;

const ImageWrap = styled.div`
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
        </>
    );
};

export default Home;