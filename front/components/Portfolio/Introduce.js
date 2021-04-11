import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
    padding: ${({ theme }) => theme.calcRem(30)};
    margin: 0 auto;
    max-width: ${({ theme }) => theme.calcRem(700)};
    border-radius: ${({ theme }) => theme.calcRem(10)};
    background: white;
`;

const Introduce = () => {
    return (
        <Wrap>
            '성취란 네가 열심히 공부하고 일했으며 네가 가진 최선을 다했다는 인식이다.<br/>
            성공은 남들에게 추앙받는 것이며,
            이것이 멋진 일이긴 하나 그렇게 중요하거나 만족을 주는 것은 아니다.
            - 헬렌 헤이스 (Helen Hayes)
        </Wrap>
    );
};

export default Introduce;