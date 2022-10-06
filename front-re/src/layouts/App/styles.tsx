import styled from '@emotion/styled';

export const Wrap = styled.div`
  min-width: 320px;
  height: 100vh;
  font-size: 16px;
  display: flex;
  background: #64c5ba;
  overflow: hidden;
  flex-direction: column;
`;

export const Header = styled.header`
  padding: 0 2%;
  height: 40px;
  color: white;
  background: none;

  .header__inner {
    /* display: flex;
    width: 100%;
    height: 100%;
    min-height: 30px;
    align-items: center;
    justify-content: flex-end; */
  }
`;

export const Container = styled.div`
  height: 100%;
  padding: 0 2%;
`;

export const Footer = styled.footer`
  margin-top: auto;
  padding: 0 2%;
  font-size: 16px;
  height: 60px;
  color: white;
  background: rgba(114, 127, 143, 0.7);
  box-sizing: border-box;

  .footer__inner {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  .footer__host {
    position: absolute;
    right: 0;
  }

  .footer__avatar {
    border-radius: 50%;
    opacity: 0.9;
    width: 32px;
    height: 32px;
    overflow: hidden;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  .footer__menu {
    position: relative;

    &-list {
      position: absolute;
      width: 300px;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.5);
      padding: 0;
      margin: 0 0 15px;
      list-style: none;
    }
  }
`;