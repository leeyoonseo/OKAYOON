import React, { useCallback } from 'react';
import { STORE } from '../../../reducers/site';

const NonsenseQuiz = ({
    setComponent,
}) => {
    const onClick = useCallback((compName) => () => {
        setComponent(compName);
    }, []);

    return (
        <div>
            <button onClick={onClick(STORE)}>홈으로</button>
            NonsenseQuiz
        </div>
    );
};

export default NonsenseQuiz;