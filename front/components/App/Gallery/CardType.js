import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

const CardType = ({ images, onClickZoom }) => (
    <Wrap>
        {images.map(({ title, src }) => (
            <Items 
                key={title}
                onClick={(() => onClickZoom({ title, src }))}
            >
                <Figure>
                    <Image 
                        src={src} 
                        alt={title} 
                    />
                </Figure>
            </Items>
        ))}
    </Wrap>
);

CardType.propTypes = {
    images: PropTypes.array.isRequired,
    onClickZoom: PropTypes.func.isRequired,
};

export default CardType;