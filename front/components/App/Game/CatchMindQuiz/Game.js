import React, { useEffect, useState, useCallback, createRef, useRef } from 'react';
import { useSelector } from 'react-redux';
import { shuffleArray, cloneObject } from '../index';

import styled, { css } from 'styled-components';
import { Avatar } from 'antd';
import { ArrowLeftOutlined, ClockCircleOutlined, ConsoleSqlOutlined, DeleteOutlined } from '@ant-design/icons';
import useInput from '../../../../hooks/useInput';

const devGameData = [
    {
        qusetion: 'https://postfiles.pstatic.net/MjAxOTA4MDlfMjgg/MDAxNTY1MzM4MTQ2MjM1.ZFeo0TvfJ5RC5Bxg5hBiP9mJhgRxsIVsAkIQ9DF8fNYg.Vb5BC5wlvdKa43TQaIG38WxyejU8QtVD5J9Ot7j3XVEg.JPEG.jinyh97/Screenshot_20190809-103258__.jpg?type=w966',
        correct: '걸음마',
        // [D] 최소 10개~최대 15개, 동일하지 않게 입력 (Example과도 동일하지 않아야함.). 저장할때 배열로...
        incorrect: ['구','길','갬','성','으','우','상','태','테','킹','콩','로','도','후','지','장'],
    },
    {
        question: 'https://img.insight.co.kr/static/2019/08/10/700/6qazze195m4q6043zwsy.jpg',
        correct: '세차장',
        incorrect: ['구','길','갬','성','으','우','상','태','테','킹','콩','로','도','후','지','장'],
    },
    {
        question: 'https://i.ytimg.com/vi/tAfUrRsPKi8/hqdefault.jpg',
        correct: '조기교육',
        incorrect: ['구','길','갬','성','으','우','상','태','테','킹','콩','로','도','후','지','장'],
    },
    {
        question: 'http://cfile.img.netmarble.kr/imageEditor/cmind/sketch/20110113/20110113144407277721.jpg',
        correct: '가격표',
        incorrect: ['구','길','갬','성','으','우','상','태','테','킹','콩','로','도','후','지','장'],
    }
];

const Wrap = styled.div`
    position: relative;        
    height: calc(100% - 31px);
`;

const OutputArea = styled.div`
    position: relative;

    &:after {
        content: '';
        display: block;
        clear: both;
    }
`;

const TimerWrap = styled.div`
    padding: 10px 0;
    text-align: center;
`;

const TimerInner = styled.div`
    display: inline-block;
`;

const TimerIcon = styled(ClockCircleOutlined)`
    color: #ffbf2e;
    font-size: 18px;
    margin-right: 5px;
    line-height: 1;
    vertical-align: middle;
`;

const TimerBar = styled.div`
    display: inline-block;
    height: 10px;
    width: 320px;
    text-align: center;
    background: none;
    overflow: hidden;

    &:after {
        content: '';
        display: block;
        width: 50%;
        height: 100%;
        border-radius: 0 3px 3px 0;
        background: #ffbf2e;
    }
`;

const Side = styled.div`
    float: left;
    width: 100px;
    height: 300px;
    display: block;
`;

const SideInner = styled.div`
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;

    > div + div {
        margin-top: 15px;
    }
`;

const GamerWrap = styled.div`
    height: 125px;
    line-height: 1;
    text-align: center;
    box-sizing: border-box;

    .ant-avatar {
        border-radius: 50%;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
    }   
`;

const Nickname = styled.div`
    margin-top: 10px;
    font-size: 18px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`;

const Score = styled.div`
    font-size: 16px;
`;

const Container = styled.div`
    position: relative;
    float: left;
    margin: 0 10px;
    width: calc(100% - 220px);
    height: 300px;
    border-radius: 10px;
    background: #fffff4;
`;  

const InputBox = styled.div`
    text-align: center;
    font-size: 30px;
    color: #666;

    span {
        display: inline-block;
        width: 50px;
        height: 50px;
        vertical-align: top;
        border-radius: 5px;
        background: #fffff4;
        box-shadow: 2px 2px 3px rgb(0 0 0);
        cursor: default;

        & + span {
            margin-left: 5px;
        }
    }
`;

const QuizBoard = styled.div``;

const Round = styled.span`
    position: absolute;
    bottom: 10px;
    left: 10px;
    display: inline-block;
    font-size: 20px;
    line-height: 1;
    color: #666;
`;

const InputArea = styled.div`

    > div {
        margin-top: 15px;
    }
`;
const ActivityArea = styled.div`

`;

const initialLetterStyle = css`
    padding: 0;
    display: inline-block;
    font-size: 20px;
    color: #666;
    background: #fff;
    border: none;
    border-radius: 3px;
    outline: none;
    cursor: pointer;
`;

const ExampleArea = styled.div` 
    display: inline-block;
    width: 85%;
    
    button {
        ${initialLetterStyle}
        width: 16%;

        & + button {
            margin-left: 0.5%;
        }

        &:nth-child(7n) {
            margin-left: 0;
        }

        &:nth-child(n + 6) { 
            margin-top: 0.5%;
        }

        &.active {
            background: #ffbf2e;
            color: #ffbf2e;
            box-shadow: inset 2px 3px 5px rgba(0, 0, 0, 0.5);
        }
    }
`;

const RemoveButtons = styled.div`
    display: inline-block;
    width: 14%;

    button {
        ${initialLetterStyle}
        width: 100%;
        background: #ffbf2e;

        & + button {
            margin-top: 3%;
        }
    }
`;

const Game = ({
    score, 
    setScore,
    MAX_ROUND,
    MAX_TIMER,
    gameData,
    onChangeStep,
}) => {
    const { me, avatarList } = useSelector((state) => state.user);
    // TODO: 세션, 쿠키 다 하면 avatar,nickname 찾아서 다 빈값으로 만들어버리기
    const [avatar, setAvatar] = useState(me.avatar ? me.avatar : 'nickname');
    const [nickname, setNickname] = useState(me.nickname ? me.nickname : 'Guest');
    const [aiInfo, setAiInfo] = useState(null);

    const [openedResult, setOpenedResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null); // [D] 정답여부
    const [correctWord, setCorrectWord] = useState(null); // [D] 정답단어

    const [quizList, setQuizList] = useState(null); // [D] 퀴즈배열 
    const [quiz, setQuiz] = useState(null); // [D] 현재퀴즈
    const [example, setExample] = useState(null); // [D] 보기
    const [round, setRound] = useState(null);
    const [time, setTime] = useState(null);

    const [examRef, setExamRef] = useState([]);
    const userInputRef = useRef(null);
    const [userInput, onChangeUserInput, setUserInput] = useInput('');

    // TODO: 실제 데이터로 넣기
    useEffect(() => {
        if(!devGameData) return;

        setQuizList(devGameData);
        setRound(0);
    }, [devGameData]);

    useEffect(() => {
        if(!example) return;

        setExamRef(examRef => (
            Array(example.length).fill().map((_, i) => examRef[i] || createRef())
        ));
    }, [example]);

    useEffect(() => {
        let ranNum = null;
        let arr = [];

        for (let i = 0; i < 3; i++) {
            ranNum = Math.floor(Math.random() * (avatarList.length - 1));
            arr.push({
                avatar: avatarList[ranNum].src,
                nickname: avatarList[ranNum].title,
                score: 0,
            });
        }

        setAiInfo(arr);
    }, [avatarList]);

    useEffect(() => {
        if(round === null || !quizList) return;
        const q = quizList[round];
        const correct = q.correct;
        let incorrect = q.incorrect;
        incorrect = (typeof incorrect === 'string') ? JSON.parse(incorrect) : incorrect;
        const example = correct.split('').concat(incorrect).slice(0, 12);
        const shuffleEx = shuffleArray(example).map((v) => v[0]);

        setQuiz(q);
        setCorrectWord(correct);
        setExample(shuffleEx);
        setTime(MAX_TIMER);
    }, [quizList, round]); 

    useEffect(() => {
        // if (time === 0) {
        //     clearInterval(timer);
        //     onClickExample(false)();
        //     return;
        // };

        // const timer = setInterval(() => {
        //     setTime(time - 10);
        // }, 100);

        // return () => {
        //     clearInterval(timer);
        // }
    }, [time]); 

    const getAvatarImageSrc = useCallback(() => {
        const item = avatarList.find((v) => v.title === avatar);

        if(!item) { 
            return null;
        }
    
        return item.src;
    }, [avatar]);

    const renderAiGamer = useCallback((i) => {
        return (
            <GamerWrap key={`gamer_${aiInfo[i].avatar}`}>
                <Avatar 
                    size={70}
                    src={aiInfo[i].avatar} 
                /> 
                <Nickname>{aiInfo[i].nickname}</Nickname> 
                <Score>{aiInfo[i].score}</Score>
            </GamerWrap>
        )
    }, [aiInfo]);

    const moveNextRound = useCallback((state) => {
        // if (state) {
        //     setScore(score + 1);
        // }

        // setIsCorrect(state);
        // setOpenedResult(true);

        // setTimeout(() => {
        //     setOpenedResult(false);
            
        //     if (round > MAX_ROUND || round >= (gameData.length - 1)) {
        //         setRound(null);
        //         onChangeStep(STEP_FINISH)();
        //         return;
        //     }

        //     setRound(round + 1);
        //     setTime(MAX_TIMER);
        // }, 1000);
    }, [round, score]);

    const onClickRemove = useCallback(() => {
        const word = userInput;
        const lastLetter = word.charAt(word.length - 1);
        
        if (lastLetter === '') return;

        examRef.forEach((v) => {
            const target = v.current;

            if (target.classList.contains('active') && target.value === lastLetter) {
                target.classList.remove('active');
                target.disabled = false;
            }
        });

        setUserInput(word.substr(0, word.length -1));
    }, [userInput]);

    const onClickAllRemove = useCallback(() => {
        examRef.forEach((v) => {
            const target = v.current;

            if (target.classList.contains('active')) {
                target.classList.remove('active');
                target.disabled = false;
            }
        });

        setUserInput('');
    }, [])

    const onClickExample = useCallback(({ target }) => {
        if (openedResult) return;
        if (correctWord.length === userInput.length) {
            // TODO: 
            // - 다음 스테이지로 가야함!
            // - 정답처리
            // moveNextRound(state);
            return;
        }

        target.classList.add('active');
        target.disabled = true;
        setUserInput(userInput + target.value);
    }, [openedResult, correctWord, userInput]);

    return (
        <Wrap>
            <OutputArea>
                <TimerWrap>
                    <TimerInner>
                        <TimerIcon />
                        <TimerBar time={time} />
                    </TimerInner>
                </TimerWrap>

                <Side>
                    <SideInner>
                        <GamerWrap>
                            {avatar === 'nickname' ? (
                                <Avatar size={70}>{nickname}</Avatar>
                            ) : (
                                <Avatar 
                                    size={100}
                                    src={getAvatarImageSrc()} 
                                /> 
                            )}
                            
                            <Nickname>{nickname}</Nickname>
                            <Score>{score}</Score>
                        </GamerWrap>

                        {aiInfo && renderAiGamer(0)}
                    </SideInner>
                </Side>

                <Container>                    
                    <QuizBoard>
                            {quiz && quiz.qustion}
                    </QuizBoard>

                    <Round>{round + 1}</Round>
                </Container>

                <Side>
                    <SideInner>
                        {aiInfo && [renderAiGamer(1),renderAiGamer(2)]}
                    </SideInner>
                </Side>
            </OutputArea>

            <InputArea>
                <InputBox>
                    <input 
                        ref={userInputRef}  
                        value={userInput} 
                        onChange={onChangeUserInput}
                    />

                    {correctWord && correctWord.split('').map((v, i) => {
                        return (
                            <span key={`submit_word_${i}`}>
                                {userInput.split('')[i]}
                            </span>
                        )
                    })}
                </InputBox>

                <ActivityArea>
                    <ExampleArea>
                        {example && example.map((v, i) => (
                            <button 
                                key={`example_${v}`}
                                value={v}
                                onClick={onClickExample}
                                ref={examRef[i]}
                            > 
                                {v}
                            </button>
                        ))}
                    </ExampleArea>
                    
                    <RemoveButtons>
                        <button
                            onClick={onClickRemove}
                        >
                            <ArrowLeftOutlined style={{ color: '#666' }} />
                            <span className="hidden">한글자 지우기</span>
                        </button>

                        <button
                            onClick={onClickAllRemove}
                        >
                            <DeleteOutlined style={{ color: '#666' }} />
                            <span className="hidden">전체 지우기</span>
                        </button>
                    </RemoveButtons>
                </ActivityArea>
            </InputArea>
        </Wrap>
    );
};

export default Game;