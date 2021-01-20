import React from 'react';
import { Button, Row, Col, Layout } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

import Head from 'next/head';
import Link from 'next/link';

import styled from 'styled-components';
import UserInfo from '../components/UserInfo/index';
import SystemTools from '../components/SystemTools';



const HeaderWrap = styled(Layout.Header)`
    padding: 5px 0;
    height: 30px;
    box-sizing: border-box;
    text-align:right;
`;

const SystemToolsWrap = styled.div`
    display: inline-block;
    vertical-align: top;
`;

const CircleBtnWrapper = styled.div`
    text-align:center;

    & > a{
        display:block;
        color:#333;
    }
`;

const Login = () => {
    const { Footer, Content } = Layout;

    return (
        <>
            <Head>
                <title>사용자 접속페이지 | OKAYOON</title>
            </Head>
            <Layout>
                <HeaderWrap>
                    <SystemToolsWrap>
                        <SystemTools themecolor="#fff" />    
                    </SystemToolsWrap>
                </HeaderWrap>

                <Content>
                    <UserInfo />
                </Content>

                <Footer>
                    <CircleBtnWrapper>
                        <Button 
                            shape="circle"
                            icon={<LogoutOutlined />} 
                        />

                        <Link href="./sleep">
                            <a>잠자기</a>
                        </Link>
                    </CircleBtnWrapper>
                </Footer>
            </Layout>
        </>

        // <>
        //     <Head>
        //         <title>사용자 접속페이지 | OKAYOON</title>
        //     </Head>

        //     <Row>
        //         <FixHeader>
        //             <SystemTools themecolor="#fff" />     
        //         </FixHeader>
        //         {/* <Col span={6} offset={18} style={{ backgroundColor: 'red' }}> */}
        //         {/* </Col> */}

        //         <FixContainer>
        //             <UserInfo />                
        //         </FixContainer>

        //         {/* <Col span={6} offset={9} style={{ textAlign: 'center',  background: 'yellow' }}>
        //             <UserInfo />                
        //         </Col> */}


        //         <FixBottom>
        //             <CircleBtnWrapper>
        //                     <Button 
        //                         shape="circle"
        //                         icon={<LogoutOutlined />} 
        //                     />
        //                     <Link href="./sleep">
        //                         <a>잠자기</a>
        //                     </Link>
        //                 </CircleBtnWrapper>
        //         </FixBottom>
        //         {/* <Col span={8} offset={8} style={{ background: 'green' }}>
        //             <CircleBtnWrapper>
        //                 <Button 
        //                     shape="circle"
        //                     icon={<LogoutOutlined />} 
        //                 />
        //                 <Link href="./sleep">
        //                     <a>잠자기</a>
        //                 </Link>
        //             </CircleBtnWrapper>
        //         </Col> */}
        //     </Row>
        // </>
    );
};

// TODO
// - 버튼에 로딩 추가
// - 처음들어왔을때 저번에 등록한 닉네임이 있다면

export default Login;