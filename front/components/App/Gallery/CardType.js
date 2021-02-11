import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';

import ImageZoom from './ImageZoom';

const ImageWrap = styled.span`
    display: inline-block;
    padding: 1%;
    width: 100%;
    height: 150px;
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
    // const cardImages = [];
    const LIMIT_ROW_NUM = 4;

    // useEffect(() => {
    //     const repeat = Math.ceil(images.length / LIMIT_ROW_NUM);
    //     let sliceItems = '';

    //     for (let i = 0; i < repeat; i++) {
    //         sliceItems = images.slice(i * LIMIT_ROW_NUM, (i + 1) * LIMIT_ROW_NUM);
    //         cardImages.push(sliceItems); 
    //     }

    //     console.log('images',images);
    //     console.log('cardImages',cardImages);

    // }, [images, cardImages]);

    const renderCard = useCallback(() => {
        const repeat = Math.ceil(images.length / LIMIT_ROW_NUM);
        const arr = [];

        for (let i = 0; i < repeat; i++) {
            arr.push(
                images.slice(i * LIMIT_ROW_NUM, (i + 1) * LIMIT_ROW_NUM)
            ); 
        }

        return arr.map((v, i) => {
            return (
                <Row key={`card_row_${i}`}>
                    {v.map((m, j) => {
                        return (
                            <Col 
                                span={6}
                                key={`${m.title}_${j}`}
                            >
                                <ImageWrap onClick={onClickZoom(m.src)}>
                                    <Image src={m.src} />
                                </ImageWrap>
                            </Col>
                        )
                    })}
                </Row>
            )
        });        
    }, [images]);

    const onClickZoom = useCallback((src) => () => {
        setZoomSrc(src);
        setOpendZoom(!opendZoom);

    }, [opendZoom]);

    const renderZoom = useCallback(() => {
        if (opendZoom && zoomSrc !== '') {
            return (
                <ZoomImage />
            )
        }
    }, [opendZoom, zoomSrc]);

    return (
        <>  
            {images.map((a) => {
                console.log('images', a);
            })}

            {renderCard()}
            {/* {cardImages.map((v) => {
                return (
                    {v}
                )
            })}
            {cardImages && cardImages.map((v, i) => {
                return (
                    <>
                    dasddsada
                    <Row key={`card_row_${i}`}>
                        {v.map((m, j) => {
                            return (
                                <Col 
                                    span={6}
                                    key={`${m.title}_${j}`}
                                >
                                    <ImageWrap onClick={onClickZoom(m.src)}>
                                        <Image src={m.src} />
                                    </ImageWrap>
                                </Col>
                            )
                        })}
                    </Row>
                    </>
                )
            })} */}

            {/* <Row>
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
            </Row> */}
{/* renderZoom
            {opendZoom && (
                
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