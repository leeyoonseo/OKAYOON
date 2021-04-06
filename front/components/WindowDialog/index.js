import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useInput from '../../hooks/useInput';

import {
    Wrap, Message, InputWrap, 
    ButtonArea, CancelButton, ConfirmButton,
} from './style';

const WindowDialog = ({ 
    type, 
    text, 
    setOpened,
    callback 
}) => {
    const inputRef = useRef(null);
    const [val, onChangeVal] = useInput('');

    useEffect(() => { 
        inputRef.current && inputRef.current.focus();        
    }, []);

    const renderReqText = useCallback(() => {
        return {__html: text};
    }, [text]);

    const onSubmit = useCallback(() => { 
        const data = {};

        if (type === 'prompt') {
            if (!val || !val.trim()) {
                return alert('값을 입력해주세요');
            }

            data.value = val;
        }

        data.state = true;
        setOpened(false);
        callback(data);
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
            <Message>
                <span dangerouslySetInnerHTML={renderReqText()} ></span>
            </Message>

            {type === 'alert' && (
                <CancelButton
                    onClick={(() => setOpened(false))}
                >
                    확인
                </CancelButton>
            )}

            {type === 'prompt' && (
                <>
                    <InputWrap>
                        <input
                            ref={inputRef}
                            value={val}
                            onChange={onChangeVal} 
                            onKeyPress={onKeyPressInput}
                            placeholder="입력해주세요" 
                        />
                    </InputWrap>
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