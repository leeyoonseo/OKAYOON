import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';

import { Avatar, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LogoutOutlined, ReloadOutlined, PoweroffOutlined } from '@ant-design/icons';

import useInput from '../hooks/useInput';

import { LOG_IN_REQUEST } from '../reducers/user';

const CircleBtnWrapper = styled(Col)`
    text-align:center;

    & > span{
        display:block;
    }
`;

const Login = () => {
    const dispatch = useDispatch();
    const [nickname, onChangeNickname] = useInput('');

    const onPressEnterInput = useCallback(() => {
        console.log(nickname);
        
        dispatch({
            type: LOG_IN_REQUEST,
            data: nickname
        })
    }, [nickname]);

    return (
        <Row>
            <Col span={6} offset={18} style={{ backgroundColor: 'red' }}>
                <Row>
                    {/** header 영역 */}
                    <Col span={6}>
                        언어
                    </Col>
                    <Col span={6}>배터리</Col>
                    <Col span={6}>와이파이</Col>
                    <Col span={6}>시간</Col>
                </Row>
            </Col>

            <Col span={6} offset={9} style={{ background: 'yellow' }}>
                {/** 사용자정보영역 영역 */}
                <Avatar size={64} icon={<UserOutlined />} />
                <div>
                    사용자 닉네임
                    <Input 
                        size="large" 
                        maxLength="10"
                        placeholder="Please enter your nickname" 
                        prefix={<UserOutlined />}
                        onChange={onChangeNickname}
                        onPressEnter={onPressEnterInput}
                    />
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
// - 처음들어왔을때 저번에 등록한 닉네임이 있다면

export default Login;