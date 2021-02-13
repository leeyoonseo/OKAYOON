import React from 'react';
import styled from 'styled-components';

import { CloseOutlined } from '@ant-design/icons';

const Wrap = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba( 0, 0, 0, 0.3);


    transform: translate(-50%, -50%);
    z-index: 1000;
`;

const Inner = styled.div`
    position: relative;
    background: #fff;   
`;

const CloseButton = styled.button`
    position: absolute;
    top: 2%;
    left: 2%;
    padding: 0;
    line-height: 1;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
`;

const CloseIcon = styled(CloseOutlined)`
    font-size: 16px;
    color: #666;
`;

const ImageZoom = ({ src, onClose }) => {
    return (
        <Wrap>
            <Inner>
                <CloseButton onClick={onClose}>
                    <CloseIcon />
                </CloseButton>

                <img src={src} />
            </Inner>
        </Wrap>
    );
};

export default ImageZoom;