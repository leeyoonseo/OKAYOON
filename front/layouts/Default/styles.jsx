
import styled from 'styled-components';
import { Layout } from 'antd';

export const Wrap = styled(Layout)`
  min-width:  ${({ theme }) => theme.calcRem(320)};
  height: 100%;
  font-size: ${({ theme }) => theme.calcRem(16)};
  background: ${({ bgcolor }) => bgcolor};
  overflow: hidden;
`;

export const Header = styled(Layout.Header)` 
  padding: 0;
  height: auto;
  color: white;
  background: none;
`;

export const HeaderInner = styled.div`
  padding: 0 2%;
  display: flex;
  width: 100%;
  height: 100%;
  min-height: ${({ theme }) => theme.calcRem(30)};
  align-items: center;
  justify-content: flex-end;
`;

export const Main = styled(Layout.Content)`
  display: flex;
  padding: 0 2%;
  height: ${({ h }) => h}px;
  align-items: center;
  justify-content: center;
`;

export const Footer = styled(Layout.Footer)`
  padding: 0;
  font-size: ${({ theme }) => theme.calcRem(16)};
  line-height: 1;
  color: white;
  background: ${({ theme }) => theme.colors.black};
  box-sizing: border-box;
`;

export const FooterInner = styled.div`
  position: relative;
  padding: ${({ theme }) => theme.calcRem(10)} 2%;
  display: flex;
  min-height: ${({ theme }) => theme.calcRem(30)};
  align-items: center;
  justify-content: center;
`;
