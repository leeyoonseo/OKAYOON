import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../../hooks/useInput';
import styled from 'styled-components';
import { SEND_MAIL_REQUEST } from '../../reducers/portfolio';

const Wrap = styled.div`
    max-width:700px;
    margin: 0 auto;
    padding: 30px;

    &:after { 
        content: '';
        display: block;
        clear: both;
    }

    & > div + div {
        margin-top: 20px;
    }
`;

const Info = styled.div`
    display: block;
    font-size: 14px;

    & > div + div{
        margin-top: 5px;
    }
`;

const ImageWrap = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto 15px;

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
        min-height: 35px;
        width: 100%;
        border: 1px solid #666;
        font-size: 14px;
        padding: 5px 10px;
        box-sizing: border-box;
        outline: none;
        resize: none;
        IME-MODE: auto;
    }

    button { 
        line-height: 1;
        border: 1px solid #666;
        outline: none;
        background: none;
        padding: 10px 20px;
        margin: 20px;
        cursor: pointer;
        font-size: 14px;
    }

    & > div + div {
        margin-top: 20px;
    }
`;

const RefMessage = styled.div`
    max-width: 700px;
    font-size: 13px;

    a {
        font-size: 13px;
        border-bottom: 1px solid #666;
    }
`;

const Contact = () => {
    const dispatch = useDispatch();
    const { sendMailDone } = useSelector((state) => state.portfolio);
    const [name, onChangeName, setName] = useInput('');
    const [email, onChangeEmail, setEmail] = useInput('');
    const [phone, onChangePhone, setPhone] = useInput('');
    const [message, onChangeMessage, setMessage] = useInput('');
    const formRef = useRef(null);

    useEffect(() => {
        if (sendMailDone) {
            setName('');
            setEmail('');
            setPhone('');
            setMessage('');
        }
    }, [sendMailDone]);

    const validation = useCallback((target) => {
        const inputNum = target.childElementCount - 1; // [D] 버튼한개 제외
        const data = new FormData(target);
        const entries = data.entries();
        let failNum = 0;
        let next = '';
        let key = '';
        let value = '';

        for (let i = 0; i < inputNum; i++) {
            next = entries.next();
            key = next.value[0];
            value = next.value[1];

            if (!value) {
                if (key !== 'phone') {
                    failNum++;
                    alert(`${key} 비어있습니다.`);
                    break;
                }
            }
        }

        return !failNum ? true : false;
    }, []);
    
    const onSubmit = useCallback((e) => {
        e.preventDefault();
        const { target } = e;
        const isChecked = validation(target);

        if (isChecked) {
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
                    <img src="../../portfolio/img_cat.jpg" title="고양이 사진"/>
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

                    <button type="submit">
                        보내기
                    </button>
                </Form>
            </FormWrap>
        </Wrap>   
    );
};

export default Contact;