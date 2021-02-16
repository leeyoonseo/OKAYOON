import React from 'react';
import PropTypes from 'prop-types';
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

const Chat = ({ children, nickname }) => {
    const SIMSIMI = 'simsimi';
    const SIMSIMI_ALIGN = 'left';
    const SIMSIMI_COLOR = '#ffe34f';
    const USER_ALIGN = 'right';
    const USER_COLOR = '#f18d8b';

    return (
        <Wrap 
            align={
                nickname === SIMSIMI 
                ? SIMSIMI_ALIGN 
                : USER_ALIGN
            }
        >
            <SpeechBubble 
                bgcolor={
                    nickname === SIMSIMI 
                    ? SIMSIMI_COLOR 
                    : USER_COLOR
                }
            >
                {children}
            </SpeechBubble>
        </Wrap>
    );
};

Chat.propTypes = {
    children: PropTypes.node.isRequired,
    nickname: PropTypes.string,
};

Chat.defaultProps = {
    nickname: 'user',
};

export default Chat;