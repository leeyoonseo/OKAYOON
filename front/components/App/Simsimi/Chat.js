import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, calcRem } from '../../../theme/styles';

const Wrap = styled.div`
    text-align: ${({ align }) => align};
`;

const SpeechBubble = styled.div`
    padding: ${calcRem(3)} ${calcRem(15)};
    display: inline-block;
    border-radius: ${calcRem(5)};
    background: ${({ bg }) => bg};
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
                bg={
                    simsimi
                    ? colors.chatSimsimi 
                    : colors.chatUser
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