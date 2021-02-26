import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { STEP_MAIN } from './index';

const Wrap = styled.div`
    width: 100%;
    height: calc(100% - 31px);
    font-size: 36px;
`;
const Inner = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Score = styled.span`
    margin-left: 10px;
    color: #26ca3f;
`;

const Percent = styled.span`
    margin-left: 10px;
    color: #ff6059;
`;

const Finish = ({
    score,
    percent,
}) => {
    const { me } = useSelector((state) => state.user);
    const [nickname] = useState(me.nickname ? me.nickname : 'Guest');

    return (
        <Wrap>
            <Inner>
                {nickname}님은 <Score>00점</Score>이며 <Percent>00</Percent>위 입니다.     
            </Inner>

            {/* 랭킹 5명만 보여줄까? */}
        </Wrap>
    );
};

export default Finish;      