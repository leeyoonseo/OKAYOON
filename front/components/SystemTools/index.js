import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import Wifi from './Wifi';

const SystemTools = ({ themeColor }) => {
    const { isMuted } = useSelector((state) => state.site);

    return(
        <Row>
            <Col span={4}>
                <Wifi themeColor={themeColor} />
            </Col>
            <Col span={4}>
                소리
            </Col>
            <Col span={4}>
                배터리와 시간
            </Col>
            <Col span={4}>
                다국어
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