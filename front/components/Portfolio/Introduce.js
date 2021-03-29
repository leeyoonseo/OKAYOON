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
            저는 개발자라는 직업을 좋아합니다.<br/>

            단순히 개발 할 때도<br/>
            문제를 해결 할 때도<br/>
            새로운 것을 배워서 접목 시킬 때도,<br/>
            반복되는 업무를 자동화 시킬 때도,<br/>
            그리고 동료들과 함께 기술적인 대화를 할 때도..<br/><br/>
            
            좋아하는 일을 잘하기 위해 노력하는 개발자.<br/>
            서로의 의견을 공유할 수 있는 좋은 개발자가 되는 것이 목표입니다.<br/> 
        </Wrap>
    );
};

export default Introduce;