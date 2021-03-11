import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { STEP_MAIN } from './index';

// const Wrap = styled.div`
//     display: flex;
//     width: 100%;
//     height: calc(100% - 31px);
//     font-size: 28px;
//     text-align: center;
//     justify-content: center;
//     align-items: center;
// `;

const Wrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 5%;
    height: calc(100% - ${({ theme }) => theme.calcRem(30)});
    font-size: ${({ theme }) => theme.calcRem(16)};
    text-align: center;
    background: ${({ theme }) => theme.nonsenseColors.lightPink};
    border-radius: 0 0 ${({ theme }) => theme.calcRem(20)} ${({ theme }) => theme.calcRem(20)};
`;

const Inner = styled.div`
    padding: 0 5%;
    display: inline-block;
`;

const Title = styled.div`
    display: inline-block;
    padding: 5%;
    min-width: 200px;
    min-height: 150px;
    font-size: 70px;
    line-height: 1;
    color: ${({ theme }) => theme.nonsenseColors.black};
    background: url(../../game/nonsense/icon_speech_bubble.png)no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;
`;

const Text = styled.div`
    margin-top: 20px;
    font-size: 35px;
    line-height: 1.25;
    color: ${({ theme }) => theme.nonsenseColors.orange};
    text-shadow: -${({ theme }) => theme.calcRem(2)} 0  ${({ theme }) => theme.nonsenseColors.black}, 
                0 ${({ theme }) => theme.calcRem(2)}  ${({ theme }) => theme.nonsenseColors.black}, 
                ${({ theme }) => theme.calcRem(2)} 0  ${({ theme }) => theme.nonsenseColors.black}, 
                0 -${({ theme }) => theme.calcRem(2)}  ${({ theme }) => theme.nonsenseColors.black};
`;

const ImageArea = styled.div`
    margin: 0 auto;
    width: 150px;

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
        console.log('char',char)
    }, []);

    useEffect(() => {
        const ratio = (score / MAX_ROUND) * 100;
        let title = '';
        let text = '';

        if (ratio >= 95) { // [D] 오답 1
            title = 'Perfect';
            text = '부장님!!!?? ㅎㅎ 앗, 부장님^^~ 여기서 이러시면 안됩니다.';
        
        } else if (ratio >= 75) { // [D] 오답 5
            title = 'Excellent';
            text = '썰렁한 개그에 잘 웃고 가끔 치시는편?!! 아니라고요? 눼~눼~ 그렇다고 칩시다!!';
        
        } else if (ratio >= 50) { // [D] 오답 10
            title = 'Great';
            text = '사회생활력 갑!! 눈치밥 좀 많이 드셨군요?! 가끔 넌센스 넝~담도 하시고?^ㅜ^ 사회생활이란~';

        } else if (ratio >= 25) { // [D] 오답 15
            title = 'Good';
            text = '그대는 일반인!! 일반인이 분명합니다. 남이 하는 넌센스에 가끔 웃어넘기는 스탈~~';

        } else {
            title = 'So So';
            text = '지식인이신가요? 고지식인?^^ 나에게 넌센스는 없다.! 마이웨~이';
        }

        setText(text);
        setTitle(title);
    }, [score]);

    return (
        <Wrap>
            <Inner>
                <Title>
                    {title && title}
                </Title>

                {randomChar && (
                    <ImageArea>
                        <img src={randomChar} alt="아이 캐릭터"/>
                    </ImageArea>
                )}

                <Text>
                    {`'${score}점', ${text}`}
                </Text>
            </Inner>
        </Wrap>
    );
};

export default Finish;      