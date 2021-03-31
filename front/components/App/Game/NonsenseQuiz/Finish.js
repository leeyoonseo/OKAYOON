import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { bucketUrl } from '../../../../config/config';

import Layout from './Layout';

const Inner = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
    display: inline-block;
`;

const Title = styled.div`
    display: inline-block;
    padding: 5%;
    min-width: ${({ theme }) => theme.calcRem(200)};
    min-height: ${({ theme }) => theme.calcRem(150)};
    font-size: ${({ theme }) => theme.calcRem(70)};
    line-height: 1;
    color: ${({ theme }) => theme.nColors.black};
    background: url(${bucketUrl}/game/nonsense/icon_speech_bubble.png)no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;
`;

const Text = styled.div`
    margin-top: ${({ theme }) => theme.calcRem(20)};
    font-size: ${({ theme }) => theme.calcRem(35)};
    line-height: 1.25;
    color: ${({ theme }) => theme.nColors.orange};
    text-shadow: -${({ theme }) => theme.calcRem(2)} 0  ${({ theme }) => theme.nColors.black}, 
                0 ${({ theme }) => theme.calcRem(2)}  ${({ theme }) => theme.nColors.black}, 
                ${({ theme }) => theme.calcRem(2)} 0  ${({ theme }) => theme.nColors.black}, 
                0 -${({ theme }) => theme.calcRem(2)}  ${({ theme }) => theme.nColors.black};
`;

const ImageArea = styled.div`
    margin: 0 auto;
    width: ${({ theme }) => theme.calcRem(150)};

    img { 
        max-width: 100%;
    }
`;

const Finish = ({ 
    score, 
    MAX_ROUND, 
}) => {
    const [title, setTitle] = useState(null);
    const [text, setText] = useState(null);
    const [randomChar, setRandomChar] = useState(null);
    const MAX_CHARACTER_NUM = 8;

    useEffect(() => {
        const randomNum = Math.floor(Math.random() * MAX_CHARACTER_NUM);
        const char = `../../game/nonsense/icon_child_${randomNum}.png`;

        setRandomChar(char);
    }, []);

    useEffect(() => {
        const ratio = (score / MAX_ROUND) * 100;
        let title = '';
        let text = '';

        if (ratio >= 95) { // [D] 오답 1
            title = 'Perfect';
            text = '부장님!!!?? ㅎㅎ 앗, 부장님^^~<br />여기서 이러시면 안됩니다.';
        
        } else if (ratio >= 75) { // [D] 오답 5
            title = 'Excellent';
            text = '썰렁한 개그에 잘 웃고?<br /> 가끔 치시는편?!!<br />아니라고요? 눼~눼~ 그렇다고 칩시다!!';
        
        } else if (ratio >= 50) { // [D] 오답 10
            title = 'Great';
            text = '사회생활력 갑!!<br /> 눈치밥 좀 많이 드셨군요?!<br />가끔 넌센스 넝~담도 하시고?^ㅜ^<br />사회생활이란~';

        } else if (ratio >= 25) { // [D] 오답 15
            title = 'Good';
            text = '그대는 일반인!!<br />일반인이 분명합니다.<br />남이 하는 농담 가끔 웃는 스탈~~';

        } else {
            title = 'So So';
            text = '지식인이신가요? 고지식인?^^<br />나에게 넌센스는 없다.! 마이웨~이';
        }

        setText(text);
        setTitle(title);
    }, [score]);

    return (
        <Layout>
            <Inner>
                <Content>
                    <Title>
                        {title && title}
                    </Title>

                    {randomChar && (
                        <ImageArea>
                            <img src={randomChar} alt="아이 캐릭터"/>
                        </ImageArea>
                    )}

                    <Text>
                        {`'${score}점'`} <span dangerouslySetInnerHTML={{__html: text}}></span>
                    </Text>
                </Content>
            </Inner>
        </Layout>
    );
};

export default Finish;      