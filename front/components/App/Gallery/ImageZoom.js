import React from 'react';
import PropTypes from 'prop-types';
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
    transform: translate(-50%, -50%);
    z-index: 1000;
`;

const Inner = styled.div`
    position: relative;
    width: 50%;
    max-height: 25rem;
    background: #fff;   
    box-shadow: 1px 1px 10px; rgba(0, 0, 0, 0.7);
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

const Image = styled.img`
    width: 100%;
    height: 100%;
`;

const Info = styled.div`
    padding: 2%;
    text-align: center;
`;

const Title = styled.div`
    font-weight: 700;
`;

const Desc = styled.div`
    font-size: 0.875rem;
`;

const ImageZoom = ({ 
    item,
    onClose,
}) => {
    return (
        <Wrap>
            <Inner>
                <CloseButton onClick={onClose}>
                    <CloseIcon />
                </CloseButton>

                <Image src={item.src} alt={item.title}/>
                <Info>
                    <Title>'{item.title}'</Title>
                    <Desc>{item.desc}</Desc>
                </Info>
            </Inner>
        </Wrap>
    );
};

ImageZoom.propTypes = {
    src: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default ImageZoom;