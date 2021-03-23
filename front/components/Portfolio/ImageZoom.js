import React from 'react';
import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

const Wrap = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    background: rgba(0,0,0,.5);
`;

const Inner = styled.div`
width: 500px;
height: 400px;
position: absolute;
left: 50%;
transform: translate(-50%, -50%);
top: 50%;
border: 1px solid #fff;
box-sizing: border-box;
`;

const CloseButton = styled.button`
    position: absolute;
    right: 0;
    top: -44px;
    width: 38px;
    height: 37px;
    border: 0;
    padding: 0;
    background: none;
    font-size: 32px;
    cursor: pointer;
    outline: none;
    border: none;
`;

const CloseIcon = styled(CloseOutlined)`
    color: #fff;
`;

const ImageWrap = styled.div`
    border: 9px solid #666;
    line-height: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
`;

const ImageZoom = ({
    src, 
    onClose,
}) => {
    return (
        <Wrap>
            <Inner>
                <CloseButton onClick={onClose}>
                    <CloseIcon />
                    <span className="hidden">닫기</span>
                </CloseButton>

                <ImageWrap>
                    <Image src={src} alt="zoom image" />
                </ImageWrap>
            </Inner>
        </Wrap>
    );
};

export default ImageZoom;