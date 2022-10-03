import styled from '@emotion/styled';

export const Wrap = styled.div`
  color: white;

  span {
    display: inline-block;
    font-size: 64px;
  }

  span + span {
    margin-left: 1px;

    &:before {
      padding: 0 20px;
      display: inline-block;
      content: ':';
    }
  }
`;