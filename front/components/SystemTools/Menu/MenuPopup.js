import React from 'react';

import styled from 'styled-components';

const MenuPopupWrap = styled.div`
    position: absolute;
    top: 30px;
    right: 0;
    padding-top: 15px;
    display: none;
    width: 80px;
    height: 125px;
    background: rgba(0, 0, 0, 0.4); 
    clip-path: polygon(90% 10%,100% 10%,100% 100%,0 100%,0 10%,74% 10%,90% 0);

    &.active {
        display: block;
    }
`;

const MenuPopup = ({ isOpen }) => {
    return (
        <MenuPopupWrap
            className={isOpen ? 'active' : ''}
        >
            <ul>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
                <li>1</li>
            </ul>
        </MenuPopupWrap>
    );
};

export default MenuPopup;