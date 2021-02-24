import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { STEP_FINISH } from './index';

const Game = ({
    onChangeStep,
}) => {
    const { nonsenseQuiz } = useSelector((state) => state.game);
    const [quizList, setQuizList] = useState(null);
    const [quiz, setQuiz] = useState(null);
    const [example, setExample] = useState(null);
    const [round, setRound] = useState(0);
    const [timer, setTimer] = useState(10);
    const MAX_ROUND = 20;

     // TODO: 랜덤하게 20개만 db에서 먼저 가져오기..
    useEffect(() => {
        const shuffleArr = shuffleArray(nonsenseQuiz);
        setQuizList(shuffleArr);
    }, []);

    useEffect(() => {
        if(!quizList) return;
        
        const q = quizList[round];
        const exam = shuffleArray(Object.values(q.example));

        setQuiz(q);
        setExample(exam);
    }, [quizList, round]);


    const onClickAnswer = useCallback(() => {
        console.log('e.currentTarget', e.currentTarget);
    }, []);

    const onClickNext = useCallback(() => {
        if (round === MAX_ROUND || round === (nonsenseQuiz.length - 1)) {
            // TODO: 종료 처리
            alert('라운드 종료');  
            return onChangeStep(STEP_FINISH)();  
        }

        setRound(round + 1);
    }, [round]);

    return (
        <>
            {quiz && (
                <div>
                    <div>
                        <span>{`Q_${round + 1}`}</span>
                        <span>{quiz.question}</span>
                    </div>

                    <ul>
                        {example && example.map((v) => {
                            if (v.isCorrect) {
                                return (
                                    <>
                                        정답 {v.answer}
                                    </>
                                )
                            } 
                            
                            return (
                                <>
                                    오답 {v.answer}
                                </>
                            )
                        })}


                        {/* <li>
                            <button onClick={onClick}>바보</button>
                        <ss/li>
                        <li>
                            <button onClick={onClick}>선비</button>
                        </li>
                        <li>
                            <button onClick={onClick}>강낭콩</button>
                        </li>
                        <li>
                            <button onClick={onClick}>산타할아버지</button>
                        </li> */}
                    </ul>
                </div>
            )}

            {/* <div>
                타이머
            </div> */}

            <button onClick={onClickNext}>다음</button>
        </>
    );
};

function shuffleArray (arr){
    let temp = arr.map((v) => {
        return cloneObject(v);
    });

    for(let i = temp.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        [temp[i], temp[j]] = [temp[j], temp[i]];
    }

    return temp;
};

function cloneObject(obj) {
    let clone = {};

    for (var key in obj) {
        if (typeof obj[key] == 'object' && obj[key] != null) {
            clone[key] = cloneObject(obj[key]);
        } else {
            clone[key] = obj[key];
        }
    }

    return clone;
}

export default Game;