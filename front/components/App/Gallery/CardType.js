import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ImageZoom from './ImageZoom';

const Wrap = styled.div`
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

const CardType = ({ data }) => {
    const [openedZoom, setOpenedZoom] = useState(false);
    const [item, setItem] = useState(null);

    const onCloseZoom = useCallback(() => setOpenedZoom(false), []);
    const onClickZoom = useCallback((item) => () => {
        setItem(item);
        setOpenedZoom(!openedZoom);
    }, [openedZoom]);

    return (
        <>
            <Wrap>
                {data.map((v, i) => {
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

            {openedZoom && (
                <ImageZoom 
                    item={item}
                    onClose={onCloseZoom}
                />
            )}
        </>
    );
};

export default CardType;