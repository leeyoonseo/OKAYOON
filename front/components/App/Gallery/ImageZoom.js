import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, calcRem } from '../../../theme/styles';

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
    background ${colors.white};   
    box-shadow: ${calcRem(1)} ${calcRem(1)} ${calcRem(10)} ${colors.rgbaBlack};
`;

const CloseButton = styled.button`
    position: absolute;
    top: 2%;
    right: 2%;
    padding: 0;
    line-height: 1;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
`;

const CloseIcon = styled(CloseOutlined)`
    font-size:  ${calcRem(16)};
    color: ${colors.ivory};
`;

const Image = styled.img`
    max-width: 100%;
    max-height: ${calcRem(400)};
`;

const Info = styled.div`
    position: absolute;
    bottom: 0;
    padding: 2%;
    line-height: 1.25;
    color: ${colors.white};
    text-shadow: 1px 1px 1px ${colors.black};
`;

const Title = styled.div`
    font-size: ${calcRem(20)};
`;

const Desc = styled.div`
    margin-top: ${calcRem(5)};
    font-size: ${calcRem(14)};
`;

const ImageZoom = ({ item, onClose }) => {
    const { src, title, desc } = item;

    return (
        <Wrap>
            <Inner>
                <CloseButton onClick={onClose}>
                    <CloseIcon />
                </CloseButton>

                <Image src={src} alt={title}/>
                
                <Info>
                    <Title>{title}</Title>
                    <Desc>{desc}</Desc>
                </Info>
            </Inner>
        </Wrap>
    );
};

export default ImageZoom;