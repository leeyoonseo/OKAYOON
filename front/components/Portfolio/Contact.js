import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import styled from 'styled-components';
import { SEND_MAIL_REQUEST } from '../../reducers/portfolio';
import { bucketUrl } from '../../config/config';

const Wrap = styled.div`
    max-width: ${({ theme }) => theme.calcRem(700)};
    margin: 0 auto;
    padding: ${({ theme }) => theme.calcRem(30)};

    &:after { 
        content: '';
        display: block;
        clear: both;
    }

    & > div + div {
        margin-top: ${({ theme }) => theme.calcRem(20)};
    }
`;

const Info = styled.div`
    display: block;
    font-size: ${({ theme }) => theme.calcRem(14)};

    & > div + div{
        margin-top: ${({ theme }) => theme.calcRem(5)};
    }
`;

const ImageWrap = styled.div`
    width: ${({ theme }) => theme.calcRem(100)};
    height: ${({ theme }) => theme.calcRem(100)};
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto ${({ theme }) => theme.calcRem(15)};

    img {
        max-width: 100%;
    }
`;

const FormWrap = styled.div`
    display: block;
    width: 100%
    box-sizing: border-box;
`;

const Form = styled.form`
    input,
    textarea {
        min-height: ${({ theme }) => theme.calcRem(35)};
        width: 100%;
        border: 1px solid ${({ theme }) => theme.colors.black};
        font-size: ${({ theme }) => theme.calcRem(14)};
        padding: ${({ theme }) => theme.calcRem(5)} ${({ theme }) => theme.calcRem(10)};
        box-sizing: border-box;
        outline: none;
        resize: none;
        IME-MODE: auto;
    }

    button { 
        line-height: 1;
        border: 1px solid ${({ theme }) => theme.colors.black};
        outline: none;
        background: white;
        padding: ${({ theme }) => theme.calcRem(10)} ${({ theme }) => theme.calcRem(20)};
        margin: ${({ theme }) => theme.calcRem(20)};
        cursor: pointer;
        font-size: ${({ theme }) => theme.calcRem(15)};
    }

    & > div + div {
        margin-top: ${({ theme }) => theme.calcRem(20)};
    }
`;

const RefMessage = styled.div`
    max-width: ${({ theme }) => theme.calcRem(700)};
    font-size: ${({ theme }) => theme.calcRem(13)};

    a {
        font-size: ${({ theme }) => theme.calcRem(13)};
        border-bottom: 1px solid ${({ theme }) => theme.colors.black};
    }
`;

const Contact = () => {
    const dispatch = useDispatch();
    const { sendMailDone, sendMailLoading } = useSelector(state => state.portfolio);
    const [name, onChangeName, setName] = useInput('');
    const [email, onChangeEmail, setEmail] = useInput('');
    const [phone, onChangePhone, setPhone] = useInput('');
    const [message, onChangeMessage, setMessage] = useInput('');
    const formRef = useRef(null);

    useEffect(() => {
        if (sendMailDone) {
            reset();
        }
    }, [sendMailDone]);

    const reset = useCallback(() => {
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
    }, []);

    const getValidationResult = useCallback(target => {
        const inputNum = target.childElementCount - 1; // [D] 버튼한개 제외
        const data = new FormData(target);
        const entries = data.entries();
        let failCount = 0;
        let next = '';
        let key = '';
        let value = '';

        for (let i = 0; i < inputNum; i++) {
            next = entries.next();
            key = next.value[0];
            value = next.value[1];

            if (!value) {
                if (key !== 'phone') {
                    failCount++;
                    alert(`${key} 비어있습니다.`);
                    break;
                }
            }
        }

        return !failCount ? true : false;
    }, []);
    
    const onSubmit = useCallback(e => {
        e.preventDefault();
        const { target } = e;
        const isValidationPass = getValidationResult(Resultet);

        if (isValidationPass) {
            dispatch({
                type: SEND_MAIL_REQUEST,
                data: target
            });
        }
    }, []);

    return (
        <Wrap>
            <Info>
                <ImageWrap>
                    <img 
                        src={`${bucketUrl}/portfolio/img_cat.jpg`} 
                        title="고양이 사진"
                    />
                </ImageWrap>
                <div>
                    <span>이윤서 / 1992.04.23</span>
                </div>
                <div>
                    <span>okayoon.lee@gmail.com</span>
                </div>
            </Info>

            <FormWrap>
                <Form 
                    ref={formRef}
                    onSubmit={onSubmit}
                >
                    <div>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="성함을 입력해주세요"
                            value={name}
                            onChange={onChangeName}
                        />
                    </div>

                    <div>
                        <input 
                            type="text" 
                            name="email" 
                            placeholder="메일 주소를 입력해주세요" 
                            value={email}
                            onChange={onChangeEmail}
                        />
                    </div>
                    <div>
                        <input 
                            type="text" 
                            name="phone" 
                            placeholder="연락처를 입력해주세요 (생략 가능)" 
                            value={phone}
                            onChange={onChangePhone}
                        />
                    </div>
                    <div>
                        <textarea 
                            name="message" 
                            rows="5" 
                            placeholder="내용을 입력해주세요" 
                            value={message}
                            onChange={onChangeMessage}
                        />
                        <RefMessage>
                            파일이 있는 메세지는&nbsp;
                            <a href="mailto:okayoon.lee@gmail.com">okayoon.lee@gmail.com</a>로 발송해주세요.
                        </RefMessage>
                    </div>
                    <button 
                        type="submit"
                        disabled={sendMailLoading}
                    >
                        보내기
                    </button>
                </Form>
            </FormWrap>
        </Wrap>   
    );
};

export default Contact;