import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const lineDefaultStyle = `
    border: 2px solid transparent;
    border-radius: 100%;
`;

const appearIn = (themecolor) => keyframes`
    0%{ border-top-color: transparent; }
    25%{ border-top-color: ${themecolor}; }
    75%{ border-top-color: ${themecolor}; }
    100%{ border-top-color: ${themecolor}; }
`;

const appearMiddle = (themecolor) => keyframes`
    0%{ border-top-color: transparent; }
    25%{ border-top-color: transparent; }
    75%{ border-top-color: ${themecolor}; }
    100%{ border-top-color: ${themecolor}; }
`;

const appearOut = (themecolor) => keyframes`
    0%{ border-top-color: transparent; }
    25%{ border-top-color: transparent; }
    75%{ border-top-color: transparent; }
    100%{ border-top-color: ${themecolor}; }
`;

const OutLine = styled.div`
    ${lineDefaultStyle}
    margin: 0 auto;
    width: 25px;
    height: 20px;
    border-top-color: ${props => props.themecolor};
    animation: ${props => appearOut(props.themecolor)} 1.5s infinite linear;

    .line{
        border-top-color: ${props => props.themecolor};
    }
`;

const MiddleLine = styled.div`
    ${lineDefaultStyle}
    margin: 1px auto;
    width: 18px;
	height: 15px;
	animation: ${props => appearMiddle(props.themecolor)} 1.5s infinite linear;
`;

const InLine = styled.div`
    ${lineDefaultStyle}
    margin: 1px auto;
    width: 14px;
    height: 13px;
	animation: ${props => appearIn(props.themecolor)} 1.5s infinite linear;
`;

const Dot = styled.div`
    ${lineDefaultStyle}
    margin: 2px auto;
    width: 3px;
    height: 3px;
    border: 0;
    background: ${props => props.themecolor};
`;

const Wifi = (({ themecolor }) => {
    return(
        <OutLine className="line" themecolor={themecolor}>
            <MiddleLine className="line" themecolor={themecolor}>
                <InLine className="line" themecolor={themecolor}>
                    <Dot themecolor={themecolor} />
                </InLine>
            </MiddleLine>
        </OutLine>
    );
});

Wifi.propTypes = {
    themecolor: PropTypes.string,
};

Wifi.defaultProps = {
    themecolor: '#333',
};

export default Wifi;