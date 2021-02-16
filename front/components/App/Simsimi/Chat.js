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

const Chat = ({ children, simsimi }) => {
    return (
        <Wrap 
            align={
                simsimi
                ? 'left' 
                : 'right'
            }
        >
            <SpeechBubble 
                bgcolor={
                    simsimi
                    ? '#ffe34f' 
                    : '#f18d8b'
                }
            >
                {children}
            </SpeechBubble>
        </Wrap>
    );
};

Chat.propTypes = {
    children: PropTypes.node.isRequired,
    simsimi: PropTypes.bool,
};

Chat.defaultProps = {
    simsimi: false,
};

export default Chat;