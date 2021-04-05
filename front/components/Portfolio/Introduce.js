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
            <strong>'개발자'</strong>라는 직업을 좋아합니다.<br/><br/>

            어려움 속에서 문제를 해결했을때,<br/>
            새로운 것을 배워서 접목 시켰을때,<br/>
            반복 작업을 자동화 시켰을때,<br/> 
            동료들과 기술적인 대화를 할 때.<br/>
            저는 이러한 과정들 속에서 재미를 느낍니다.<br/><br/>

            재미있다는 것이 곧, 잘한다는 것이 아니듯.<br/>
            개발자는 실력이 뒤따라야하는 것을 알고있습니다.<br/>
            그래서 저는 노력하며 더 나은 개발자로 성장하는 것이 목표입니다.
        </Wrap>
    );
};

export default Introduce;