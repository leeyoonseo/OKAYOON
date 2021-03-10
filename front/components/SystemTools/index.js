import React, { useCallback, useState, useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

const SoundButton = styled.button`
    padding: 0;
    height: 100%;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;

    &:hover,
    &:focus{
        background: none;
    }
`;

const SoundIcon = styled(SoundOutlined)`
    font-size: ${({ theme }) => theme.calcRem(18)};
    color: ${({ themecolor }) => themecolor};

    &:hover,
    &:focus,
    &.active{
        opacity: 0.5;
    }
`;

const SystemTools = ({ themecolor }) => {
    const dispatch = useDispatch();
    const themeContext = useContext(ThemeContext);
    const { isMuted } = useSelector((state) => state.site);
    const [pathname, setPathname] = useState('');

    useEffect(() => setPathname(Router.pathname), [pathname]);

    const onClickSound = useCallback(() => {
        console.log('onClickSound');
        // dispatch({ type: CHANGE_MUTED });
    });

    return(
        <SystemToolsWrap>
            <IconBox iconwidth={themeContext.calcRem(30)}>
                <Wifi themecolor={themecolor} />
            </IconBox>

            <IconBox 
                iconwidth={themeContext.calcRem(25)} 
                addstyled="text-align: left;"
            >
                <SoundButton onClick={onClickSound}>
                    <SoundIcon
                        className={isMuted && 'active'} 
                        themecolor={themecolor}
                    />
                </SoundButton>
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


// TODO
// - 검색, 메뉴 아이콘 로그인하고 들어간 화면에서만 접근 할 수 있도록 수정