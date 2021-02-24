import React, { useEffect, useCallback } from 'react';

import { STEP_GAME, STEP_GUIDE } from './index';

const main = ({
    onChangeStep
}) => {
    

    return (
        <div>
            <div>
                <span>넌센스 퀴즈</span>
                <span>당신의 센스를 알아보아요.</span>
            </div>

            <div>
                <button onClick={onChangeStep(STEP_GAME)}>시작하기</button>
                <button onClick={onChangeStep(STEP_GUIDE)}>게임방법</button>
            </div>
        </div>
    );
};



export default main;