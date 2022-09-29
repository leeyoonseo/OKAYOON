import React, { useEffect, useState, useCallback, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import { Wrap, Header, HeaderInner, Main, Footer, FooterInner } from './styles';
import SystemTools from '../../components/SystemTools';

const Default = ({ bgcolor, main, footer }) => {
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

Default.propTypes = {
  bgcolor: PropTypes.string,
  main: PropTypes.element.isRequired, 
  footer: PropTypes.element.isRequired,
};

Default.defaultProps = {
  bgcolor: '#566270'
};


export default Default;