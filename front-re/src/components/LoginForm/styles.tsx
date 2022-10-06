import styled from '@emotion/styled';

export const Wrap = styled.div`
  width: 300px;
  margin: 0;
  text-align: center;

  .entry__input {
    display: inline-block;
    width: 80%;
    height: 38px;

    input {
      border-radius: 5px;
      color: #fff;
      border: 1px solid #fff;
      padding: 0 10px;
      width: 100%;
      height: 100%;
      background: none;

      &::placeholder {
        color: #fff;
        font-size: 14px;
      }
    }
  }

  .entry__button {
    &-submit {
      margin-top: 15px;
      margin-left: 3%;
      width: 17%;
      height: 38px;
      font-size: 18px;
      border-radius: 5px;
      color: #fff;
      background: inherit;
      border: 1px solid;
      cursor: pointer;

      &:hover {
        color: #fff;
        opacity: 0.8;
      }
    }
    
    &-sleep {
      font-size: 13px;
      padding: 2px 5px;
      letter-spacing: 1.2;
      text-decoration: none;
      margin-top: 20px;
      display: inline-block;
      border: none;
      background: none;
      color: #fff;
      cursor: pointer;

      &:hover {
        background: inherit;
        border-radius: 5px;
      }
    }
  }
`;