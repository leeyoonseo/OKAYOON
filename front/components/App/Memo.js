import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import useInput from '../../hooks/useInput';

import styled  from 'styled-components';

const Textarea = styled.textarea`
    width: 100%;
    padding: 5%;
    height: 98%;
    background: none;
    border: none;
    outline: none;
    box-sizing: border-box;
`;

const Memo = () => {
    const textareaRef = useRef(null);
    const [val, changeVal, setVal] = useInput('');

    useEffect(() => {
        textareaRef.current.focus();
    }, []);

    return (
        <Textarea 
            value={val}
            onChange={changeVal}
            ref={textareaRef}
        />
    );
};

export default Memo;



// TODO:
// DB 연결
// - 핀 아이콘 넣어서 고정하게 만들기