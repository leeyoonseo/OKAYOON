import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useInput from '../../hooks/useInput';

import {
    Wrap, Message, InputWrap, 
    ButtonArea, CancelButton, ConfirmButton,
} from './style';
import { useSelector } from 'react-redux';

const WindowDialog = ({ type, text, setOpened, callback }) => {
    const { admin } = useSelector(state => state.user);
    const inputRef = useRef(null);
    const [val, onChangeVal] = useInput('');

    useEffect(() => { 
        inputRef.current && inputRef.current.focus();        
    }, []);

    const getValidationResult = useCallback(() => {
        if (!val || !val.trim()) {
            return false;
        }

        return true;
    }, [type, val]);

    const onSubmit = useCallback(() => { 
        let value = '';

        if (type === 'prompt') {
            let isValidationPass = getValidationResult();

            if (!admin.userId && !isValidationPass) {
                return alert('값을 입력해주세요');
            }

            value = val;
        }

        setOpened(false);
        callback({
            state: true,
            value: value || null,
        });
    }, [val]);
    
    const onClickCancel = useCallback(() => {
        setOpened(false);
        callback({ state: false });
    }, []);

    const onKeyPressInput = useCallback(({ code }) => {
        if (code === 'Enter') {
            onSubmit();
        }
    }, [val]);

    return (
        <Wrap>
            {text && (
                <Message>
                    <span dangerouslySetInnerHTML={{ __html: text }} ></span>
                </Message>
            )}

            {type === 'alert' && (
                <CancelButton
                    onClick={(() => setOpened(false))}
                >
                    확인
                </CancelButton>
            )}

            {type === 'prompt' && (
                <>
                    {!admin.userId && (
                        <InputWrap>
                            <input
                                ref={inputRef}
                                value={val}
                                onChange={onChangeVal} 
                                onKeyPress={onKeyPressInput}
                                placeholder="입력해주세요" 
                            />
                        </InputWrap>
                    )}
                    
                    <ButtonArea>
                        <CancelButton
                            onClick={(() => setOpened(false))}
                        >
                            취소
                        </CancelButton>
                        
                        <ConfirmButton
                            onClick={onSubmit}
                        >
                            확인
                        </ConfirmButton>
                    </ButtonArea>
                </>
            )}

            {type === 'confirm' && (
                <ButtonArea>
                    <CancelButton
                        onClick={onClickCancel}
                    >
                        취소
                    </CancelButton>
                    
                    <ConfirmButton
                        onClick={onSubmit}
                    >
                        확인
                    </ConfirmButton>
                </ButtonArea>
            )}
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