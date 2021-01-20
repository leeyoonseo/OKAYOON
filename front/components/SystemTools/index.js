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

const SoundButton = styled(Button)`
    padding: 0;
    height: auto;
    line-height: 1;
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

    &.muted{
        opacity:0.8;
    }
`;

const SystemTools = ({ themecolor }) => {
    const dispatch = useDispatch();
    const { isMuted } = useSelector((state) => state.site);

    const onClickSound = useCallback(() => {
        dispatch({ type: CHANGE_MUTED });
    });

    return(
        <Row>
            <Col span={3}>
                <Wifi themecolor={themecolor} />
            </Col>
            <Col span={2} style={{ position: 'relative', verticalAlign: 'top' }}>
                <SoundButton onClick={onClickSound}>
                    <SoundIcon
                        className={isMuted && 'muted'} 
                        themecolor={themecolor}
                    />
                </SoundButton>
            </Col>
            <Col span={7}>
                <Battery themecolor={themecolor} />
            </Col>
            <Col span={4}>
                <Clock themecolor={themecolor} />
            </Col>
            <Col span={4}>
                검색
            </Col>
            <Col span={4}>
                메뉴
            </Col>
        </Row>
    );
};

SystemTools.propTypes = {
    themeColor: PropTypes.string,
}

SystemTools.defaultProps = {
    themeColor: '#333',
}

export default SystemTools;