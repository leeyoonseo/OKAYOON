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
    background: rgba(0,0,0,0.3);
`;

const Inner = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    width: ${({ theme }) => theme.calcRem(500)};
    height: ${({ theme }) => theme.calcRem(400)};
    border: 1px solid white;
    box-sizing: border-box;
    transform: translate(-50%, -50%);
`;

const CloseButton = styled.button`
    position: absolute;
    right: 0;
    top: 0;
    padding: 0;
    width: ${({ theme }) => theme.calcRem(38)};
    height: ${({ theme }) => theme.calcRem(37)};
    font-size: ${({ theme }) => theme.calcRem(32)};
    line-height: 1;
    border: 2px solid white;
    outline: none;
    background: #566270;
    transform: translateY(-100%);
    cursor: pointer;
`;

const CloseIcon = styled(CloseOutlined)`
    color: white;
`;

const ImageWrap = styled.div`
    border: ${({ theme }) => theme.calcRem(9)} solid ${({ theme }) => theme.colors.black};
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