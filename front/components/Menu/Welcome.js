import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

const Inner = styled.div`
    position: relative;
    display: inline-block;
    text-align: center;
`;

const IconWrap = styled.span`
    margin: 0 auto ${({ theme }) => theme.calcRem(20)};
    display: block;
    width: ${({ theme }) => theme.calcRem(50)};
    height: ${({ theme }) => theme.calcRem(50)};

    img {
        max-width: 100%;
        max-height: 100%;
    }
`;
const Welcome = () => {
    return (
        <Wrap>
            <Inner>
                <IconWrap>
                    <img src="./icon_smile.png" alt="스마일 아이콘" />
                </IconWrap>
                안녕하세요?<br />
                OKAYOON에 방문해주셔서 감사합니다!<br />
                OKAYOON은 React 공부 목적으로 제작된 사이트입니다.<br />
                제작기간은 디자인 포함 2달정도입니다.<br /><br />

                제로초님 강의를 통해 평소 해본적 없던<br />
                Backend 작업까지 진행할 수 있었습니다.<br />
                부족함이 많으니 문제가 보인다면..<br />
                방명록에 적어주시면 감사하겠습니다.<br /><br />

                발전하기 위해 더 노력하는 사람이 되겠습니다.<br />
                다시한 번 방문해주셔서 감사합니다^^.<br />
            </Inner>
        </Wrap>
    );
};

export default Welcome;
