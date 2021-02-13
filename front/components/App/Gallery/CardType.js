import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import ImageZoom from './ImageZoom';

const Wrap = styled.div`
    padding-bottom: 6%;
    column-count: 4;
    column-gap: 1em;
`;

const Items = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 1em; 
    cursor: pointer;
`;

const Figure = styled.div`
    display: inline-block;
    filter: grayscale(0.8);

    &:hover { 
        filter: none;
    }
`;

const Image = styled.img`
    width: 100%;
`;

const CardType = ({ images }) => {
    const [opendZoom, setOpendZoom] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);

    const onCloseZoom = useCallback(() => {
        setOpendZoom(false);
        setImageSrc(null);
    }, []);

    const onClickZoom = useCallback((i) => () => {
        setImageSrc(images[i].src);
        setOpendZoom(!opendZoom);
    }, [opendZoom]);

    return (
        <>
            <Wrap>
                {images.map((v, i) => {
                    return (
                        <Items 
                            key={`${v.title}_${i}`}
                            onClick={onClickZoom(i)}
                        >
                            <Figure>
                                <Image src={v.src} />
                            </Figure>
                        </Items>
                    )
                })}
            </Wrap>

            {opendZoom && (
                <ImageZoom 
                    src={imageSrc}
                    onClose={onCloseZoom}
                />
            )}
        </>
    );
};

export default CardType;