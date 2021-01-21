import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Row, Col, Button } from 'antd';
import { SoundOutlined } from '@ant-design/icons';
import { CHANGE_MUTED } from '../../reducers/site';

import Wifi from './Wifi';
import Battery from './Battery';
import Clock from './Clock';
import Search from './Search/index';

const SystemToolsWrapper = styled(Row)`
    width: 250px;
    line-height: 1 !important;
    background-color: red;
    vertical-align: middle;

    button{
        line-height: 1 !important;
    }
`;

const FixedIconBox = styled.div`
    display: inline-block;
    width: ${props => props.iconWidth}px;
`;

const UnFixedIconBox = styled.div`
    display: inline-block;
    width: auto;
`;

const SoundButton = styled(Button)`
    padding: 0;
    height: 100%;
    text-align: left;
    border: none;
    background: none;

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
            <FixedIconBox iconWidth={30}>
                <Wifi themecolor={themecolor} />
            </FixedIconBox>

            <FixedIconBox iconWidth={20}>
                <SoundButton onClick={onClickSound}>
                    <SoundIcon
                        className={isMuted && 'active'} 
                        themecolor={themecolor}
                    />
                </SoundButton>
            </FixedIconBox>

            <UnFixedIconBox>
                <Battery themecolor={themecolor} />
            </UnFixedIconBox>

            <Col span={4}>
                <Clock themecolor={themecolor} />
            </Col>
            {
                themecolor === '#fff'  
            }
            <Col span={4}>
                <Search themecolor={themecolor} />
            </Col>
            <Col span={4}>
                메뉴
            </Col>
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