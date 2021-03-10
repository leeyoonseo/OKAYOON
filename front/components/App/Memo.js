import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import { CHANGE_MEMO_REQUEST } from '../../reducers/site';
import styled  from 'styled-components';

const Textarea = styled.textarea`
    padding: 2%;
    width: 100%;
    height: 100%;
    min-height: ${({ theme }) => theme.calcRem(120)};
    font-size: ${({ theme }) => theme.calcRem(16)};
    vertical-align: top;
    background: none;
    border: none;
    outline: none;
    box-sizing: border-box;
`;

const Memo = () => {
    const dispatch = useDispatch();
    const { memo } = useSelector((state) => state.site);
    const [val, onChangeVal, setVal] = useInput(memo);

    useEffect(() => {
        memo && setVal(memo);
    }, [memo]);
    
    const onSave = useCallback((e) => {
        const { value } = e.target;

        if (value === memo) return;

        dispatch({
            type: CHANGE_MEMO_REQUEST,
            data: value
        })
    }, [memo]); 

    return (
        <Textarea 
            value={val}
            placeholder={`메모를 입력해주세요.\n포커스아웃 시 저장됩니다.\n세로로 늘려서 사용할 수 있어요.`}
            onChange={onChangeVal}
            onBlur={onSave}
        />
    );
};

export default Memo;



// TODO:
// DB 연결
// - 핀 아이콘 넣어서 고정하게 만들기