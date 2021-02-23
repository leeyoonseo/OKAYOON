import React, { useCallback} from 'react';
import styled, { css } from 'styled-components';
import { STORE } from '../../../reducers/game';

import { CloseOutlined, SoundOutlined } from '@ant-design/icons';

const Wrap = styled.div`
    margin-bottom: 10px;
    
    button + button {
        margin-left: 5px;
    }
`;

const defaultButtonStyle = css`
    padding: 0;
    font-size: 16px;
    line-height: 1;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
`;

const BackButton = styled.button`
    ${defaultButtonStyle}
`;

const SoundButton = styled.button`
    ${defaultButtonStyle}

    &.mute {
        opacity: 0.5;
    }
`;

const Controls = ({
    setComponent,
    onMuted,
    onClickMute,
}) => {
    const onClickBack = useCallback((compName) => () => {
        setComponent(compName);
    }, []);

    return (
        <Wrap>
            <BackButton onClick={onClickBack(STORE)}>
                <CloseOutlined />
                <span className="hidden">게임 나가기</span>
            </BackButton>

            <SoundButton 
                className={onMuted ? 'mute' : ''}
                onClick={onClickMute}
            >
                <SoundOutlined />
                <span className="hidden">음소거</span>
            </SoundButton>
        </Wrap>
    );
};

export default Controls;