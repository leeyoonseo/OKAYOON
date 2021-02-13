import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { List, Avatar } from 'antd';
import ImageZoom from './ImageZoom';

const ListWrap = styled(List)`
    padding-bottom: 6%;

    &:after {
        content: '';
        display: block;
        clear: both;
    }

    li:nth-child(1),
    li:nth-child(2) {
        margin-top: 0;
    }

    li:nth-child(even) {
        margin-left: 2%;
    }
`;

const Item = styled(List.Item)`
    margin-top: 2%;
    padding: 2%;
    width: 49%;
    float: left;
    background: #fff;
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
    }
`;

const ItemMeta = styled(List.Item.Meta)`
    align-items: center;
`;

const ListType = ({ images }) => {
    const [opendZoom, setOpendZoom] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);

    const onCloseZoom = useCallback(() => {
        setOpendZoom(false);
        setImageSrc(null);
    }, []);

    const onClickZoom = useCallback((src) => () => {
        setImageSrc(src);
        setOpendZoom(!opendZoom);
    }, [opendZoom]);

    return (
        <>
            <ListWrap
                itemLayout="horizontal"
                dataSource={images}
                renderItem={item => (
                <Item onClick={onClickZoom(item.src)}>
                    <ItemMeta
                        avatar={<Avatar src={item.src} />}
                        title={<span>{item.title}</span>}
                        description={item.desc}
                    />
                </Item>
                )}
            />

            {opendZoom && (
                <ImageZoom 
                    src={imageSrc}
                    onClose={onCloseZoom}
                />
            )}
        </>
    );
};

export default ListType;