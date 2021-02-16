import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';

const Wrap = styled.div`
    text-align: ${props => props.align};
`;

const SpeechBubble = styled.div`
    padding: 5px 10px;
    display: inline-block;
    border-radius: 5px;
    background: ${props => props.bgcolor};
`;

// [D] 닉네임 안들어오면 user임
const ChatLine = ({ children, nickname }) => {
    const SIMSIMI = 'simsimi';
    const SIMSIMI_ALIGN = 'left';
    const SIMSIMI_COLOR = '#ffe34f';
    const USER_ALIGN = 'right';
    const USER_COLOR = '#f18d8b';

    return (
        <Wrap 
            align={nickname === SIMSIMI ? SIMSIMI_ALIGN : USER_ALIGN}
        >
            <SpeechBubble 
                bgcolor={nickname === SIMSIMI ? SIMSIMI_COLOR : USER_COLOR}
            >
                {children}
            </SpeechBubble>
        </Wrap>
    );
};

ChatLine.defaultProps = {
    nickname: 'user',
}
export default ChatLine;