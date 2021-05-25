import React from 'react';
import styled from 'styled-components';

const IframeWrap = styled.div`
    position: relative;
    width: 100%;
    height: 95%;
`;

const Iframe = styled.iframe`
    width: 100%;
    height: 100%;
    border: none;
    background: white;
`;      

const Blog = () => (
    <IframeWrap>
        <Iframe src="https://okayoon.tistory.com/"/>
    </IframeWrap>
);

export default Blog;