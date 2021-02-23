import React, { useCallback, useEffect, useState } from 'react';

import { STORE, NONSENSE_QUIZ, CATCH_MIND } from '../../../reducers/game';

import Controls from './Controls';
import Store from './Store';
import NonsenseQuiz from './NonsenseQuiz/index';
import CatchMind from './CatchMind';

const Game = () => {
    const [component, setComponent] = useState(null);
    const [onMuted, setOnMuted] = useState(false);

    useEffect(() => {
        setComponent(STORE);
    }, []);

    const onClickMute = useCallback(() => {
        setOnMuted(!onMuted);
        console.log('click!!!', onMuted)
    }, [onMuted]);

    const renderGame = useCallback(() => {
        if (component === STORE) {
            return (
                <Store 
                    setComponent={setComponent}
                />     
            );
        } else if (component === NONSENSE_QUIZ) {
            return (
                <>
                    <Controls
                        setComponent={setComponent} 
                        onMuted={onMuted}
                        onClickMute={onClickMute}
                    />
                    <NonsenseQuiz />
                </>
            );

        } else if (component === CATCH_MIND) {
            return (
                <>
                    <Controls
                        setComponent={setComponent} 
                        onMuted={onMuted}
                        onClickMute={onClickMute}
                    />
                    <CatchMind />
                </>
            );
        }
    }, [component, onMuted]);

    return (
        <>
            {component && renderGame()}
        </>
    );
};

export default Game;


// TODO:
// DB 연결