import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { List, Avatar } from 'antd';
import ImageZoom from './ImageZoom';

const ListWrap = styled(List)`
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
    background: white;
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
        box-shadow: ${({ theme }) => theme.calcRem(1)} ${({ theme }) => theme.calcRem(1)} ${({ theme }) => theme.calcRem(5)} ${({ theme }) => theme.colors.rgbaBlack};
    }


    @media only screen and ${({ theme }) => theme.device.mobileS} {
        .ant-list-item-meta-description {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    }
`;

const ItemMeta = styled(List.Item.Meta)`
    align-items: center;
`;

const ListType = ({ data, onClickZoom }) => (
    <ListWrap
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
        <Item onClick={(() => onClickZoom(item))}>
            <ItemMeta
                avatar={<Avatar src={item.src} />}
                title={<span>{item.title}</span>}
                description={item.desc}
            />
        </Item>
        )}
    />
);

ListType.propTypes = {
    data: PropTypes.array.isRequired,
    onClickZoom: PropTypes.func.isRequired,
};

export default ListType;