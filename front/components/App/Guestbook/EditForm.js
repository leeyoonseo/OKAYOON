import React, { useCallback, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import useInput from '../../../hooks/useInput';
import { UPDATE_GUESTBOOK_REQUEST } from '../../../reducers/guestbook';

const Wrap = styled.div`
    margin-bottom: ${({ theme }) => theme.calcRem(20)};
`;

const Textarea = styled.textarea`
    padding: 3%;
    width: 100%;
    height: ${({ theme }) => theme.calcRem(130)};
    border: none;
    outline: none;
    resize: none;
    IME-MODE: auto;
`; 

const BottomWrap = styled.div`
    margin-top: ${({ theme }) => theme.calcRem(10)};
    position: relative;
    text-align: right;
`;

const LetterCheck = styled.span`
    position: absolute;
    top: 0;
    left: 0;

    &.max {
        color: ${({ theme }) => theme.colors.darkPink};
    }
`;

const BottomInner = styled.div`
    display: inline-block;
`;

const Button = styled.button`
    margin-left: ${({ theme }) => theme.calcRem(10)};
    padding: 0;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
`;

const EditForm = ({
    MAX_TEXTAREA_LENGTH,
    id,
    content,
    nickname,
    avatar
}) => {
    const dispatch = useDispatch();
    const [text, onChangetext, setText] = useInput('');
    const textareaRef = useRef(null);

    useEffect(() => {
        textareaRef.current.focus();
        setText(content);
    }, []);

    const onSubmit = useCallback(() => {
        if (!text || !text.trim()) {
            return alert('내용을 입력해주세요.');
        }

        dispatch({
            type: UPDATE_GUESTBOOK_REQUEST,
            data: {
                id: id,
                nickname: nickname,
                avatar: avatar,
                content: text,
            }
        });   
    }, [text]);

    return (
        <Wrap>
            <Textarea
                maxLength={MAX_TEXTAREA_LENGTH}
                onChange={onChangetext}
                value={text}
                ref={textareaRef}
                placeholder="수정할 글을 작성해주세요."
            />

            <BottomWrap>
                <LetterCheck className={text.length >= MAX_TEXTAREA_LENGTH ? 'max' : ''}>
                    {text.length}/{MAX_TEXTAREA_LENGTH}
                </LetterCheck>

                <BottomInner>
                    <Button type="button" onClick={onSubmit}>
                        수정완료
                    </Button>
                </BottomInner>
            </BottomWrap>
        </Wrap>
    );
};

EditForm.propTypes = {
    MAX_TEXTAREA_LENGTH: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    nickname: PropTypes.string,
    avatar: PropTypes.string,
};

export default EditForm;