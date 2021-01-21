import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { MenuOutlined } from '@ant-design/icons';

import MenuPopup from './MenuPopup';

const MenuButton = styled.button`
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    outline: none;

    &:hover,
    &:focus {
        background: none;
    }

    .active {
        opacity: 0.5;
    }
`;

const Menu = ({ themecolor }) => {
    const [isShowPopup, setIsShowPopup] = useState(false);

    const onClicButton = useCallback(() => {
        setIsShowPopup(!isShowPopup);
    }, [isShowPopup]);

    return(
        <>
            <MenuButton onClick={onClicButton}>
                <MenuOutlined 
                    className={isShowPopup && 'active'} 
                    style={{ color: themecolor }} 
                />
            </MenuButton>
            { isShowPopup && <MenuPopup /> }
        </>
    );
};

export default Menu;    