import React from 'react';
import styled from 'styled-components';

import { Tooltip } from 'antd';
import ModalPopup from '../ModalPopup/index';

const ItemButton = styled.button`
    width:60px;
    height:60px;
    background: #ddd;
    border: 1px solid #ccc;
    border-radius: 3px;
    outline: none;
    cursor: pointer;

    &:hover,
    &:focus {
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
    }
`;

const Items = ({ icon, title, onClick, children }) => {
    return (
        <>
            <Tooltip placement="top" color="#777" title={title}>
                <ItemButton onClick={onClick}>
                    {icon}
                </ItemButton>
            </Tooltip>

            {children}
        </>
    );
};

export default Items;