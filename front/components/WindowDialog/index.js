import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useInput from '../../hooks/useInput';

import {
    Wrap, Text, InputWrap, 
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
            return alert('값을 입력해주세요');
        }

        callback({state, text});
    }, []);

    return (
        <Wrap>
            <Text>
                <span dangerouslySetInnerHTML={renderReqText()} ></span>
            </Text>

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

WindowDialog.propTypes = {
    type: PropTypes.string,
    text: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
};

WindowDialog.defaultProps = {
    type: 'alert',
};

export default WindowDialog;