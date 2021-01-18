import React from 'react';
import { Button, Row, Col } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

import Head from 'next/head';
import Link from 'next/link';

import styled from 'styled-components';
import UserInfo from '../components/UserInfo/index';

const CircleBtnWrapper = styled(Col)`
    text-align:center;

    & > span{
        display:block;
    }
`;

const Login = () => {

    return (
        <>
            <Head>
                <title>사용자 접속페이지 | OKAYOON</title>
            </Head>

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

                <Col span={6} offset={9} style={{ textAlign: 'center',  background: 'yellow' }}>
                    <UserInfo />                
                </Col>

                <Col span={8} offset={8} style={{ background: 'green' }}>
                    {/** footer 영역 */}
                    <Row>
                        <CircleBtnWrapper span={8}>
                            <Button 
                                shape="circle"
                                icon={<LogoutOutlined />} 
                            />
                            <Link href="./sleep">
                                <a>잠자기</a>
                            </Link>
                        </CircleBtnWrapper>
                    </Row>
                </Col>
            </Row>
        </>
    );
};

// TODO
// - 버튼에 로딩 추가
// - 처음들어왔을때 저번에 등록한 닉네임이 있다면

export default Login;