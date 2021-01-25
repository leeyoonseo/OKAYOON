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

    &:hover,
    &:focus,
    &.active{
        opacity: 0.5;
    }
`;

const MenuIcon = styled(MenuOutlined)`
    font-size: 17px;
    color: ${props => props.themecolor};
`;

const Menu = ({ themecolor }) => {
    const [isShowPopup, setIsShowPopup] = useState(false);

    const onClicButton = useCallback(() => {
        setIsShowPopup(!isShowPopup);
    }, [isShowPopup]);



    // const [isVisibleHelpMenu, setIsVisibleHelpMenu] = useState(false);

    // let documentFunc = null;

    // useEffect(() => {
    //     const windowH = window.innerHeight;
    //     setContentHeight(windowH - fixedHeaderH - fixexFooterH);

    //     documentFunc = ({ target }) => {
    //         const { parentNode } = target;
    //         const isHelpItem = parentNode.classList.contains('help');

    //         if(!isHelpItem){
    //             setIsVisibleHelpMenu(false);
    //         }
    //     };

    //     document.addEventListener('click', documentFunc);

    //     return() => {
    //         document.removeEventListener('click', documentFunc);
    //     };
    // }, []);

    // const onClickHelp = useCallback(() => {
    //     console.log('onClickHelp');
    //     setIsVisibleHelpMenu(true);
    // }, []);

    return(
        <>
            <MenuButton onClick={onClicButton}>
                <MenuIcon 
                    className={isShowPopup && 'active'} 
                    themecolor={themecolor}
                />
            </MenuButton>
            { isShowPopup && <MenuPopup /> }
        </>
    );
};

export default Menu;    


// <HelpWrap className="help">
//                         <button onClick={onClickHelp}>
//                             help
//                         </button>
                        
//                         {/* <div 
//                             className={isVisibleHelpMenu ? 'active' : ''}
//                             // 테스트를 위한 임시
//                             style={{
//                                 width: '150px',
//                                 height: '150px',
//                                 background: '#fff',
//                             }}
//                         >
//                             menu
//                         </div> */}
                        
//                         {/* 
//                             [TODO]
//                             - 헬프버튼 클릭 시 
//                             -- Welcome - 소개
//                             -- Source - 사용한 라이브러리, 이미지 출처, 등등...
//                         */}
//                     </HelpWrap>