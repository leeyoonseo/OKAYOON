import React, { useCallback, useEffect, useState } from 'react';

import { STORE, NONSENSE_QUIZ, CATCH_MIND } from '../../../reducers/site';

import Store from './Store';
import NonsenseQuiz from './NonsenseQuiz';
import CatchMind from './CatchMind';

const Game = () => {
    const [component, setComponent] = useState(null);

    useEffect(() => {
        setComponent(STORE);
    }, []);

    const renderGame = useCallback(() => {
        if (component === STORE) {
            return (
                <Store setComponent={setComponent}/>
            );
        } else if (component === NONSENSE_QUIZ) {
            return (
                <NonsenseQuiz />
            );

        } else if (component === CATCH_MIND) {
            return (
                <CatchMind />
            );
        }
    }, [component]);

    return (
        <>
            {component && renderGame()}
        </>
    );
};

export default Game;


// TODO:
// DB 연결