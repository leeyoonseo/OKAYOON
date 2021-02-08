import React, { useEffect, useCallback, useState, useRef } from 'react';
import styled from 'styled-components';

import { HeartFilled } from '@ant-design/icons';

const IframeWrap = styled.div`
    position: relative;
    width: 100%;
    height: 95%;
`;

const MouseCursor = styled(HeartFilled)`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    content: 'aa';
    display: block;
    width: 10px;
    height: 10px;
    color: Red;
`;

const Iframe = styled.iframe`
    width: 100%;
    height: 100%;
    border: none;
    background: #fff;
`;      

const Blog = () => {
    return (
        <IframeWrap>
            <Iframe src="http://okayoon.tistory.com/"/>
        </IframeWrap>
    );
};

export default Blog;

// TODO:
// DB 연결
// - 마우스 커서 사용하기, iframe에 제한이 있다면 다른 콘텐츠에서 이용하자!