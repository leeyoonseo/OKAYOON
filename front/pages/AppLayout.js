import React, { useEffect, useState, useCallback, useRef, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Layout } from 'antd';
import SystemTools from '../components/SystemTools';
import PropTypes from 'prop-types';

const Wrap = styled(Layout)`
    min-width:  ${({ theme }) => theme.calcRem(320)};
    height: 100%;
    font-size: ${({ theme }) => theme.calcRem(16)};
    background: ${({ bgcolor }) => bgcolor};
    overflow: hidden;
`;

const Header = styled(Layout.Header)` 
    padding: 0;
    height: auto;
    color: white;
    background: none;
`;

const HeaderInner = styled.div`
    padding: 0 2%;
    display: flex;
    width: 100%;
    height: 100%;
    min-height: ${({ theme }) => theme.calcRem(30)};
    align-items: center;
    justify-content: flex-end;
`;

const Main = styled(Layout.Content)`
    display: flex;
    padding: 0 2%;
    height: ${({ h }) => h}px;
    align-items: center;
    justify-content: center;
`;

const Footer = styled(Layout.Footer)`
    padding: 0;
    font-size: ${({ theme }) => theme.calcRem(16)};
    line-height: 1;
    color: white;
    background: ${({ theme }) => theme.colors.black};
    box-sizing: border-box;
`;

const FooterInner = styled.div`
    position: relative;
    padding: ${({ theme }) => theme.calcRem(10)} 2%;
    display: flex;
    min-height: ${({ theme }) => theme.calcRem(30)};
    align-items: center;
    justify-content: center;
`;

const AppLayout = ({ bgcolor, main, footer }) => {
    const themeContext = useContext(ThemeContext);
    const headerRef = useRef(null);
    const footerRef = useRef(null);
    const [windowHeight, setWindowHeight] = useState(null);
    const [mainHeight, setMainHeight] = useState(null);
    const [headerHeight, setHeaderHeight] = useState(null);
    const [footerHeight, setFooterHeight] = useState(null);

    useEffect(() => {
        window.addEventListener('resize', onResize);
        
        return () => { 
            window.removeEventListener('resize', onResize);
        }
    }, [windowHeight]);

    useEffect(() => {
        if (!headerHeight || !footerHeight) return;
        
        onResize();
    }, [windowHeight, headerHeight, footerHeight]);

    useEffect(() => {
        if (!headerRef.current) return;
        setHeaderHeight(headerRef.current.clientHeight);
    }, [headerRef])

    useEffect(() => {
        if (!footerRef.current) return;
        setFooterHeight(footerRef.current.clientHeight);
    }, [footerRef]);

    const onResize = useCallback(() => {
        const windowH = window.innerHeight;
        if (windowH === windowHeight) return;

        setWindowHeight(window.innerHeight);
        setMainHeight(windowH - headerHeight - footerHeight);
    }, [windowHeight, headerHeight, footerHeight]); 

    return (
        <Wrap 
            bgcolor={bgcolor}
            color={themeContext.colors.black}
        >
            <Header>
                <HeaderInner ref={headerRef}>
                    <SystemTools themecolor={themeContext.colors.ivory} />    
                </HeaderInner>
            </Header>

            <Main h={mainHeight}>
                {main}
            </Main>

            <Footer>
                <FooterInner ref={footerRef}>
                    {footer}
                </FooterInner>
            </Footer>
        </Wrap>
    );
};

AppLayout.propTypes = {
    bgcolor: PropTypes.string,
    main: PropTypes.element.isRequired, 
    footer: PropTypes.element.isRequired,
};

AppLayout.defaultProps = {
    bgcolor: '#566270'
};

export default AppLayout;