import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';
import { colors, calcRem } from '../../theme/styles';

const lineDefaultStyle = css`
    border: ${calcRem(2)} solid transparent;
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
    position: relative;
    top: ${calcRem(2)};
    margin: 0 auto;
    width: ${calcRem(25)};
    height: ${calcRem(20)};
    border-top-color: ${({ themecolor }) => themecolor};
    animation: ${({ themecolor }) => appearOut(themecolor)} 1.5s infinite linear;

    .line{
        border-top-color: ${({ themecolor }) => themecolor};
    }
`;

const MiddleLine = styled.div`
    ${lineDefaultStyle}
    margin: ${calcRem(1)} auto;
    width: ${calcRem(18)};
	height: ${calcRem(15)};
	animation: ${({ themecolor }) => appearMiddle(themecolor)} 1.5s infinite linear;
`;

const InLine = styled.div`
    ${lineDefaultStyle}
    margin: ${calcRem(1)} auto;
    width: ${calcRem(14)};
    height: ${calcRem(13)};
	animation: ${({ themecolor }) => appearIn(themecolor)} 1.5s infinite linear;
`;

const Dot = styled.div`
    ${lineDefaultStyle}
    margin: ${calcRem(2)} auto;
    width: ${calcRem(3)};
    height: ${calcRem(3)};
    border: 0;
    background: ${({ themecolor }) => themecolor};
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
    themecolor: colors.black,
};

export default Wifi;