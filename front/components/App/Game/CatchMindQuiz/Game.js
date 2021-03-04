import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { shuffleArray, cloneObject } from '../index';

import styled from 'styled-components';
import { Avatar } from 'antd';
import { RightOutlined, ClockCircleOutlined } from '@ant-design/icons';


const devGameData = [
    {
        qusetion: 'https://postfiles.pstatic.net/MjAxOTA4MDlfMjgg/MDAxNTY1MzM4MTQ2MjM1.ZFeo0TvfJ5RC5Bxg5hBiP9mJhgRxsIVsAkIQ9DF8fNYg.Vb5BC5wlvdKa43TQaIG38WxyejU8QtVD5J9Ot7j3XVEg.JPEG.jinyh97/Screenshot_20190809-103258__.jpg?type=w966',
        answer: '걸음마',
        // [D] 최소 10개~최대 15개, 동일하지 않게 입력 (answer과도 동일하지 않아야함.). 저장할때 배열로...
        example: ['구','길','갬','성','으','우','상','태','테','킹','콩','로','도','후','지','장'],
    },
    {
        question: 'https://img.insight.co.kr/static/2019/08/10/700/6qazze195m4q6043zwsy.jpg',
        answer: '세차장',
        example: ['구','길','갬','성','으','우','상','태','테','킹','콩','로','도','후','지','장'],
    },
    {
        question: 'https://i.ytimg.com/vi/tAfUrRsPKi8/hqdefault.jpg',
        answer: '조기교육',
        example: ['구','길','갬','성','으','우','상','태','테','킹','콩','로','도','후','지','장'],
    },
    {
        question: 'http://cfile.img.netmarble.kr/imageEditor/cmind/sketch/20110113/20110113144407277721.jpg',
        answer: '가격표',
        example: ['구','길','갬','성','으','우','상','태','테','킹','콩','로','도','후','지','장'],
    }
];

const Wrap = styled.div`
    position: relative;        
    height: calc(100% - 31px);
`;

const OutputArea = styled.div`
    height: 350px;

    &:after {
        content: '';
        display: block;
        clear: both;
    }
`;

const Side = styled.div`
    float: left;
    width: 100px;
    height: 100%;

    & > div + div {
        margin-top: 20px;
    }
`;

const Container = styled.div`
    float: left;
    margin: 0 10px;
    width: calc(100% - 220px);
    height: 100%;
    background: #fff;
`;  

const LetterHint = styled.div`
    display: inline-block;
    padding: 5px 15px;
    color: #666;
    border-right: 1px solid #666;
    border-bottom: 1px solid #666;
    border-radius: 0 0 10px;

    span {
        display: inline-block;
        width: 15px;
        height: 15px;
        line-height: 1;
        text-align: center;
        background: #666;
        border-radius: 50%;
        cursor: default;

        & + span {
            margin-left: 5px;
        }
    }
`;

const QuizBoard = styled.div``;

const Round = styled.span``;

const GamerWrap = styled.div`
    padding: 10px;
    font-size: 16px;
    line-height: 1;
    text-align: center;
    box-sizing: border-box;
`;

const Nickname = styled.div`
    margin-top: 10px;
`;

const Score = styled.div`
    margin-top: 5px;
`;

const InputArea = styled.div``;
const Timer = styled.span``;
const MyScore = styled.span``;
const AnswerArea = styled.div``;
const Answer = styled.div``;

const PassButton = styled.button`
    position: absolute;
    bottom: 0;
    right: 0;
    
    padding: 0;
    line-height: 1;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;

    &[disabled] {
        cursor: default;
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
    const [isCorrect, setIsCorrect] = useState(null);
    const [correctAnswer, setCorrectAnswer] = useState(null);

    const [quizList, setQuizList] = useState(null); // [D] 퀴즈배열 
    const [quiz, setQuiz] = useState(null); // [D] 현재퀴즈
    const [example, setExample] = useState(null); // [D] 보기
    const [round, setRound] = useState(null);
    const [time, setTime] = useState(null);

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
        console.log('arr', arr);
        setAiInfo(arr);
    }, [avatarList]);

    useEffect(() => {
        if(!devGameData) return;

        setQuizList(devGameData);
        setRound(0);
    }, [devGameData]);

    useEffect(() => {
        if(round === null || !quizList) return;
        const q = quizList[round];
        const answer = q.answer.split('');
        const wronAnswer = (typeof q.example === 'string') ? JSON.parse(q.example) : q.example;
        const ex = answer.concat(wronAnswer);

        const shuffleEx = shuffleArray(Object.values(ex));

        setQuiz(q);
        setCorrectAnswer(q.answer);
        setExample(shuffleEx);
        setTime(MAX_TIMER);
    }, [quizList, round]); 

    useEffect(() => {
        if (time === 0) {
            clearInterval(timer);
            onClickExample(false)();
            return;
        };

        const timer = setInterval(() => {
            setTime(time - 10);
        }, 100);

        return () => {
            clearInterval(timer);
        }
    }, [time]); 

    const getAvatarImageSrc = useCallback(() => {
        const item = avatarList.find((v) => v.title === avatar);

        if(!item) { 
            return null;
        }
    
        return item.src;
    }, [avatar]);

    const renderAiGamer = useCallback((i) => () => {
        return (
            <GamerWrap>
                {aiInfo && (
                    <>
                        <Avatar 
                            size={70}
                            src={aiInfo[i].avatar} 
                        /> 
                        <Nickname>{aiInfo[i].nickname}</Nickname> 
                        <Score>{aiInfo[i].score}</Score>
                    </>
                )}
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

    const onClickExample = useCallback((state) => () => {
        if (openedResult) return;

        moveNextRound(state);
    }, [round, openedResult]);

    const onClickPass = useCallback(() => {
        if (openedResult) return;

        moveNextRound(false);
    }, [round, openedResult]);

    return (
        <Wrap>
            <OutputArea>
                <Side>
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

                    {renderAiGamer(0)}

                    {/* <GamerWrap>
                        {aiInfo && (
                            <>
                                <Avatar 
                                    size={70}
                                    src={aiInfo[0].avatar} 
                                /> 
                                <Nickname>{aiInfo[0].nickname}</Nickname> 
                                <Score>{aiInfo[0].score}</Score>
                            </>
                        )}
                    </GamerWrap> */}
                </Side>

                <Container>
                    <LetterHint>
                        {correctAnswer && correctAnswer.split('').map((v, i) => {
                            return (
                                <span
                                    key={`letter_hint_${v}`}
                                >
                                    {i}
                                </span>
                            )
                        })}
                    </LetterHint>
                
                    
                    <QuizBoard>
                            {quiz && quiz.qustion}
                    </QuizBoard>

                    <Round>{round + 1}</Round>
                </Container>

                <Side>
                    사이드
                </Side>
            </OutputArea>

            <InputArea>
                <Timer>30</Timer>
                <MyScore>0</MyScore>

                {/* 걸음마 */}
                <AnswerArea>
                    <Answer>
                        <span>통</span>
                        <span>마</span>
                        <span>다</span>
                        <span>부</span>
                        <span>수</span>
                        <span>걸</span>
                        <span>루</span>
                        <span>음</span>
                        <span>로</span>
                        <span>가</span>
                        <span>수</span>
                        <span>길</span>
                    </Answer>

                    <button>지우기</button>
                    <button>삭제</button>
                </AnswerArea>
            </InputArea>

            <PassButton 
                onClick={onClickPass}
                disabled={openedResult}
            >
                통과 <RightOutlined />
            </PassButton>
        </Wrap>
    );
};

export default Game;