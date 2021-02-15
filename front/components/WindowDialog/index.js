import React, { useCallback, useEffect, useRef, useState } from 'react';
import useInput from '../../hooks/useInput';

import {
    Wrap, TextArea, InputWrap, 
    ButtonArea, CancelButton, ConfirmButton,
} from './style';

const WindowDialog = ({ type, text, callback }) => {
    const inputRef = useRef(null);
    const [val, onChangeVal] = useInput('');

    useEffect(() => { 
        inputRef.current && inputRef.current.focus();        
    }, []);

    const renderReqText = useCallback(() => {
        return {__html: text};
    }, [text]);

    const onClose = useCallback(({ state, text }) => () => { 
        if (!text || !text.trim()) {
            text = null;
        }

        callback({state, text});
    }, []);

    return (
        <Wrap>
            <TextArea>
                <span dangerouslySetInnerHTML={renderReqText()} ></span>
            </TextArea>

            {type === 'prompt' && (
                <InputWrap>
                    <input
                        ref={inputRef}
                        value={val}
                        onChange={onChangeVal} 
                        placeholder="입력해주세요" 
                    />
                </InputWrap>
            )}

            <ButtonArea>
                {type !== 'alert' && (
                    <CancelButton
                        onClick={onClose({
                            state:false
                        })}
                    >
                        취소
                    </CancelButton>
                )}
                
                <ConfirmButton
                    onClick={onClose({
                        state: true, 
                        text: val
                    })}
                >
                    확인
                </ConfirmButton>
            </ButtonArea>
        </Wrap>
    );
};

export default WindowDialog;

// TODO:
// alert = 경고문구, 확인
// confirm = 질문, 확인과 취소에 대한 값 리턴
// prompt = 질문, 입력받은 값 리턴해주기