import React from 'react';

import styled from 'styled-components';

import { Avatar, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LogoutOutlined, ReloadOutlined, PoweroffOutlined } from '@ant-design/icons';

const CircleBtnWrapper = styled(Col)`
    text-align:center;

    & > span{
        display:block;
    }
`;

const Login = () => {
    return (
        <Row>
            <Col span={6} offset={18} style={{ backgroundColor: 'red' }}>
                {/** header 영역 */}
                <div>언어</div>
                <div>배터리</div>
                <div>와이파이</div>
                <div>시간</div>
            </Col>

            <Col span={6} offset={9} style={{ background: 'yellow' }}>
                {/** 사용자정보영역 영역 */}
                <Avatar size={64} icon={<UserOutlined />} />
                <div>
                    사용자 닉네임
                    <Input size="large" placeholder="Please enter your nickname" prefix={<UserOutlined />}/>
                </div>
            </Col>

            <Col span={8} offset={8} style={{ background: 'green' }}>
                {/** footer 영역 */}
                <Row>
                    <CircleBtnWrapper span={8}>
                        <Button 
                            shape="circle"
                            icon={<LogoutOutlined />} 
                        />
                        <span>잠자기</span>
                    </CircleBtnWrapper>

                    <CircleBtnWrapper span={8}>
                        <Button 
                            shape="circle"
                            icon={<ReloadOutlined />} 
                        />
                        <span>재시동</span>
                    </CircleBtnWrapper>

                    <CircleBtnWrapper span={8}>
                        <Button 
                            shape="circle"
                            icon={<PoweroffOutlined />} 
                        />
                        <span>종료</span>
                    </CircleBtnWrapper>
                </Row>
            </Col>
        </Row>
    );
};

// TODO
// - 버튼에 로딩 추가

export default Login;