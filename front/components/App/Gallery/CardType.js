import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';

import ImageZoom from './ImageZoom';

const ImageWrap = styled.span`
    display: inline-block;
    padding: 1%;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    cursor: pointer;
`;
const Image = styled.img`
    width: 100%;
    height: 100%;
`;

const CardType = ({ images }) => {
    const [opendZoom, setOpendZoom] = useState(false);
    const [zoomSrc, setZoomSrc] = useState('');

    const onClickZoom = useCallback((src) => () => {
        setZoomSrc(src);
        setIsImageZoom(!isImageZoom);

    }, [isImageZoom]);

    const renderZoom = useCallback(() => {
        if (isImageZoom && zoomSrc !== '') {
            return (
                <ZoomImage />
            )
        }
    }, [isImageZoom, zoomSrc]);

    return (
        <>
            <Row>
                {images.map((v, i) => {
                    return(
                        <Col 
                            span={6}
                            key={`${v.title}_${i}`}
                        >
                            <ImageWrap
                                onClick={onClickZoom(v.src)}
                            >
                                <Image src={v.src} />
                            </ImageWrap>
                        </Col>
                    )
                })}
            </Row>
{/* renderZoom
            {isImageZoom && (
                
            )} */}
            
            {/* {opendZoom && (
                <ImageZoom 
                    onClose={onClickZoom}
                    images={images} 
                />
            )} */}
        </>
    );
};

export default CardType;