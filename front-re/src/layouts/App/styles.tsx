import styled from '@emotion/styled';

export const Wrap = styled.div`
  /* min-width: 320px;
  height: 100%;
  font-size: 16px;
  background: #64c5ba;
  overflow: hidden; */
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
  /* display: flex; */
  padding: 0 2%;
  /* align-items: center;
  justify-content: center; */
`;

export const Footer = styled.footer`
  margin-top: auto;
  padding: 0 2%;
  font-size: 16px;
  height: 60px;
  /* line-height: 1; */
  color: white;
  /* background: #566270; */
  background: rgba(114, 127, 143, 0.7);
  box-sizing: border-box;
`;