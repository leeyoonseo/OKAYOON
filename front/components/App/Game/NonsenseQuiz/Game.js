import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const Game = () => {
    const { nonsenseQuiz } = useSelector((state) => state.game);
    const [quiz, setQuiz] = useState(null);
    const [question, setQuestion] = useState(quiz ? quiz[round].question : null);
    const [answer, setAnswer] = useState(quiz ? quiz[round].answer : null);
    const [round, setRound] = useState(0);
    const [timer, setTimer] = useState(10);
    const [life, setLife] = useState(3);
    const MAX_ROUND = 20;

     // TODO: 랜덤하게 20개만 db에서 먼저 가져오기..
    useEffect(() => setQuiz(shuffleArray(nonsenseQuiz)), []);

    const onClickAnswer = useCallback(() => {
        console.log('e.currentTarget', e.currentTarget);
    }, []);

    const onClickNext = useCallback(() => {
        if (round === 20) {
            // TODO: 종료 처리
            return alert('라운드 종료');    
        }

        setRound(round++);
    }, [round]);

   

    return (
        <>
            {quiz && (
                <div>
                    <div>
                        <span>{`Q_${round + 1}`}</span>
                        <span>{quiz[round].question}</span>
                    </div>

                    <ul>
                        {/* {quiz[round].wrongAnswer.map((v) => {

                            return (
                                <li>{v}</li>
                            )
                        })} */}
                        {/* <li>
                            <button onClick={onClick}>바보</button>
                        </li>
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

    console.log('temp', temp);
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