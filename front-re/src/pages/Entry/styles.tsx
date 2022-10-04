import styled from '@emotion/styled';

export const Wrap = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  padding: 30px;
  width: 300px;
  height: 180px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 30px;
  margin: 0;
  text-align: center;

  .entry__input-nickname {
    padding: 0 10px;
    width: 100%;
    height: 38px;
    font-size: 1rem;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 5px;
    background: none;
    box-sizing: border-box;

    &::placeholder {
      color: #fff;
      font-size: 14px;
    }
  }

  .entry__button {
    &-submit {
      font-size: 14px;
      border-radius: 5px;
      color: #fff;
      background: inherit;
      border: 1px solid;
      width: 100%;
      height: 38px;
      margin-top: 10px;
      cursor: pointer;

      &:hover {
        color: #fff;
        opacity: 0.8;
      }
    }
    
    &-sleep {
      padding: 2px 5px;
      letter-spacing: 1.2;
      text-decoration: none;
      margin-top: 15px;
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