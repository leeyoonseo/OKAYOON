import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { SoundOutlined } from '@ant-design/icons';
import { CHANGE_MUTED } from '../../reducers/site';

import Wifi from './Wifi';
import Battery from './Battery';
import Clock from './Clock';
import Search from './Search/index';
import Menu from './Menu/index';

const SystemToolsWrapper = styled.div`
    width: 250px;
    line-height: 1 !important;
    background-color: red;

    button{
        line-height: 1 !important;
    }
`;

const IconBox = styled.div`
    display: inline-block;
    width: ${props => props.iconWidth ? props.iconWidth + 'px' : 'auto'};
`;

const SoundButton = styled.button`
    padding: 0;
    height: 100%;
    text-align: left;
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
    font-size: 16px;
    color: ${props => props.themecolor};

    &.active{
        opacity:0.5;
    }
`;

const SystemTools = ({ themecolor }) => {
    const dispatch = useDispatch();
    const { isMuted } = useSelector((state) => state.site);

    const onClickSound = useCallback(() => {
        dispatch({ type: CHANGE_MUTED });
    });

    return(
        <SystemToolsWrapper>
            <IconBox iconWidth={25}>
                <Wifi themecolor={themecolor} />
            </IconBox>

            <IconBox iconWidth={20}>
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

            <IconBox iconWidth={35}>
                <Clock themecolor={themecolor} />
            </IconBox>

            <IconBox iconWidth={20}>
                <Search themecolor={themecolor} />
            </IconBox>

            <IconBox>
                <Menu themecolor={themecolor} />
            </IconBox>
        </SystemToolsWrapper>
    );
};

SystemTools.propTypes = {
    themeColor: PropTypes.string,
}

SystemTools.defaultProps = {
    themeColor: '#333',
}

export default SystemTools;