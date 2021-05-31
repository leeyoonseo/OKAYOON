import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import PropTypes from 'prop-types';
import styled, { ThemeContext } from 'styled-components';
import { SoundOutlined } from '@ant-design/icons';

import Wifi from './Wifi';
import Battery from './Battery';
import Clock from './Clock';

const SystemToolsWrap = styled.div`
    line-height: 1 !important;

    button{
        line-height: 1 !important;
    }
`;

const IconBox = styled.div`
    display: inline-block;
    width: ${({ iconwidth }) => iconwidth ? iconwidth : 'auto'};
    vertical-align: middle;
    ${({ addstyled }) => addstyled && addstyled};
`;

const SoundIcon = styled(SoundOutlined)`
    font-size: ${({ theme }) => theme.calcRem(18)};
    color: ${({ themecolor }) => themecolor};
`;

const SystemTools = ({ themecolor }) => {
    const themeContext = useContext(ThemeContext);
    const { isMuted } = useSelector(state => state.site);
    const [pathname, setPathname] = useState('');

    useEffect(() => setPathname(Router.pathname), [pathname]);

    return(
        <SystemToolsWrap>
            <IconBox iconwidth={themeContext.calcRem(30)}>
                <Wifi themecolor={themecolor} />
            </IconBox>

            <IconBox 
                iconwidth={themeContext.calcRem(25)} 
                addstyled="text-align: left;"
            >
                <SoundIcon
                    className={isMuted && 'active'} 
                    themecolor={themecolor}
                />
            </IconBox>

            <IconBox>
                <Battery themecolor={themecolor} />
            </IconBox>

            <IconBox iconwidth={themeContext.calcRem(45)}>
                <Clock themecolor={themecolor} />
            </IconBox>
        </SystemToolsWrap>
    );
};

SystemTools.propTypes = {
    themeColor: PropTypes.string,
}

SystemTools.defaultProps = {
    themeColor: '#566270',
}

export default SystemTools;