import React, { useCallback, useEffect, useState } from 'react';
import { STORE, NONSENSE_QUIZ, CATCH_MIND } from '../../../reducers/game';
import styled from 'styled-components';

import Controls from './Controls';
import Store from './Store';
import NonsenseQuiz from './NonsenseQuiz/index';
import CatchMind from './CatchMind';

const Wrap = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const Game = () => {
    const [component, setComponent] = useState(STORE);
    const [muted, setMuted] = useState(false);

    const onClickMute = useCallback(() => {
        setMuted(!muted);
    }, [muted]);
    
    return (
        <Wrap>
            {component !== STORE && (
                <Controls
                    setComponent={setComponent} 
                    muted={muted}
                    onClickMute={onClickMute}
                />
            )}

            {(() => {
                if (component === STORE) {
                    return (
                        <Store 
                            setComponent={setComponent}
                        /> 
                    )
                } else {
                    if (component === NONSENSE_QUIZ) {
                        return <NonsenseQuiz />;

                    } else if (component === CATCH_MIND) {
                        return <CatchMind />;
                    }
                }
            })()}
        </Wrap>
    );
};

export default Game;