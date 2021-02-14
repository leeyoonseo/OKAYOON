import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import { CHANGE_MEMO_REQUEST } from '../../reducers/site';

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
    const dispatch = useDispatch();
    const { memo } = useSelector((state) => state.site);
    const textareaRef = useRef(null);
    const [val, onChangeVal, setVal] = useInput(memo);

    useEffect(() => {
        // TODO: focus 방법 생각하기
        textareaRef.current.focus();

        if(memo) {
            setVal(memo);
        }
    }, []);
    
    const onSave = useCallback((e) => {
        const memo = e.target.value;
        console.log('onSave', memo);

        setVal(memo);
        
        dispatch({
            type: CHANGE_MEMO_REQUEST,
            data: memo
        })
    }, []); 

    return (
        <Textarea 
            value={val}
            placeholder={`메모를 입력해주세요.\n포커스아웃 시 저장됩니다.`}
            onChange={onChangeVal}
            onBlur={onSave}
            ref={textareaRef}
        />
    );
};

export default Memo;



// TODO:
// DB 연결
// - 핀 아이콘 넣어서 고정하게 만들기