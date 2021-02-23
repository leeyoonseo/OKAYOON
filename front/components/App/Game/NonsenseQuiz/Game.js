import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function shuffleArray (array){
    let temp = [];
    let length = array.length;

    while (length) {
        let i = Math.floor((length--) * Math.random());
        temp.push(array.splice(i, 1));
    }

    return temp;
};

const Game = () => {
    const { nonsenseQuiz } = useSelector((state) => state.game);
    const [quiz, setQuiz] = useState(null);
    const [round, setRound] = useState(0);
    const [timer, setTimer] = useState(10);
    const [life, setLife] = useState(3);
    const MAX_ROUND = 20;

    useEffect(() => {
        console.log('nonsenseQuiz', shuffleArray(nonsenseQuiz))
        // setQuiz(shuffle(nonsenseQuiz));
        // console.log('quiz', shuffle(nonsenseQuiz));
    }, []);



    return (
        <div>
            <div>
                <div>
                    <span>Q</span>
                    <span>퀴증비니다. 어쩌고저쩌고 따발따발?</span>
                </div>

                <ul>
                    <li>
                        <button>바보</button>
                    </li>
                    <li>
                        <button>선비</button>
                    </li>
                    <li>
                        <button>강낭콩</button>
                    </li>
                    <li>
                        <button>산타할아버지</button>
                    </li>
                </ul>
            </div>

            {/* <div>
                타이머
            </div> */}

            <button>다음</button>
        </div>
    );
};

export default Game;