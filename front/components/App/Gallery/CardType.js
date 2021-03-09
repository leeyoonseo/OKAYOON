import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ImageZoom from './ImageZoom';
import { Card } from 'antd';

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
    const [openedZoomPopup, setOpenedZoomPopup] = useState(false);
    const [item, setItem] = useState(null);

    const onCloseZoom = useCallback(() => {
        setOpenedZoomPopup(false);
        setZoomImageURL(null);
    }, []);

    const onClickZoom = useCallback((item) => () => {
        setItem(item);
        setOpenedZoomPopup(!openedZoomPopup);
    }, [openedZoomPopup]);

    return (
        <>
            <Wrap>
                {images.map((v, i) => {
                    const { title, src } = v;

                    return (
                        <Items 
                            key={`${title}_${i}`}
                            onClick={onClickZoom(v)}
                        >
                            <Figure>
                                <Image src={src} alt={title} />
                            </Figure>
                        </Items>
                    )
                })}
            </Wrap>

            {openedZoomPopup && (
                <ImageZoom 
                    item={item}
                    onClose={onCloseZoom}
                />
            )}
        </>
    );
};

CardType.propTypes = {
    images: PropTypes.array.isRequired,
};

export default CardType;