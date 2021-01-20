import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const lineDefaultStyle = `
    border: 2px solid transparent;
    border-radius: 100%;
`;

const appearIn = (themeColor) => keyframes`
    0%{ border-top-color: transparent; }
    25%{ border-top-color: ${themeColor}; }
    75%{ border-top-color: ${themeColor}; }
    100%{ border-top-color: ${themeColor}; }
`;

const appearMiddle = (themeColor) => keyframes`
    0%{ border-top-color: transparent; }
    25%{ border-top-color: transparent; }
    75%{ border-top-color: ${themeColor}; }
    100%{ border-top-color: ${themeColor}; }
`;

const appearOut = (themeColor) => keyframes`
    0%{ border-top-color: transparent; }
    25%{ border-top-color: transparent; }
    75%{ border-top-color: transparent; }
    100%{ border-top-color: ${themeColor}; }
`;

const OutLine = styled.div`
    ${lineDefaultStyle}
    margin: 1px auto;
    width: 25px;
    height: 30px;
    border-top-color: ${props => props.themeColor};
	animation: ${props => appearOut(props.themeColor)} 1.5s infinite linear
`;

const MiddleLine = styled.div`
    ${lineDefaultStyle}
    margin: 1px auto;
    width: 18px;
	height: 25px;
    border-top-color: ${props => props.themeColor};
	animation: ${props => appearMiddle(props.themeColor)} 1.5s infinite linear;
`;

const InLine = styled.div`
    ${lineDefaultStyle}
    margin: 1px auto;
    width: 14px;
    height: 23px;
    border-top-color: ${props => props.themeColor};
	animation: ${props => appearIn(props.themeColor)} 1.5s infinite linear;
`;

const Dot = styled.div`
    ${lineDefaultStyle}
    margin: 2px auto;
    width: 3px;
    height: 3px;
    border: 0;
    background: ${props => props.themeColor};
`;

const Wifi = (({ themeColor }) => {
    return(
        <OutLine themeColor={themeColor}>
            <MiddleLine themeColor={themeColor}>
                <InLine themeColor={themeColor}>
                    <Dot themeColor={themeColor} />
                </InLine>
            </MiddleLine>
        </OutLine>
    );
});

Wifi.propTypes = {
    themeColor: PropTypes.string,
};

Wifi.defaultProps = {
    themeColor: '#333',
};

export default Wifi;