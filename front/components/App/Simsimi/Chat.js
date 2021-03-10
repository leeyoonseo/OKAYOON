import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';

const Wrap = styled.div`
    text-align: ${({ align }) => align};
`;

const SpeechBubble = styled.div`
    padding: ${({ theme }) => theme.calcRem(3)} ${({ theme }) => theme.calcRem(15)};
    display: inline-block;
    border-radius: ${({ theme }) => theme.calcRem(5)};
    background: ${({ bg }) => bg};
`;

const Chat = ({ children, simsimi }) => {
    const themeContext = useContext(ThemeContext);

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
                    ? themeContext.colors.chatSimsimi 
                    : themeContext.colors.chatUser
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