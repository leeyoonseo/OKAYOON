import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { STORE, NONSENSE_QUIZ, CATCH_MIND } from '../../../reducers/game';
import styled from 'styled-components';

import { SettingOutlined } from '@ant-design/icons';

import Controls from './Controls';
import Store from './Store';
import NonsenseQuiz from './NonsenseQuiz/index';
import CatchMind from './CatchMind';
import Admin from './Admin';

const Wrap = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const SetButton = styled.button`
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 0;
    line-height: 1;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
`;

const Game = () => {
    const { admin } = useSelector((state) => state.user);
    const [isSetting, setIsSetting] = useState(false);
    const [component, setComponent] = useState(STORE);
    const [muted, setMuted] = useState(false);

    useEffect(() => {

    }, []);

    const onClickMute = useCallback(() => {
        setMuted(!muted);
    }, [muted]);
    
    const onClickSet = useCallback(() => {
        if (!admin) return;
        setIsSetting(!isSetting);
    }, [isSetting]);

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

            {admin && (
                <SetButton onClick={onClickSet}>
                    <SettingOutlined />
                </SetButton>
            )}

            {admin && isSetting && (
                <Admin />
            )}
        </Wrap>
    );
};

export default Game;