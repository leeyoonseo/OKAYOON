import styled from 'styled-components';

export const Wrap = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 20px;
    max-width: 300px;
    max-height: 300px;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 5px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
`;

export const TextArea = styled.div`
    max-height: 200px;
    overflow-y: auto;
`;

export const InputWrap = styled.div`
    margin-top: 10px;

    input {
        padding: 5px 10px;
        font-size: 13px;
        border: 1px solid #333;
        box-sizing: border-box;
        outline: none;
    }
`;

export const ButtonArea = styled.div`
    margin-top: 15px;
    font-size: 13px;
    text-align: center;

    button + button {
        margin-left: 10px;
    }
`;

export const CancelButton = styled.button`
    padding: 2px 10px;
    border: 1px solid #666;
    background: none;
    box-sizing: border-box;
    outline: none;
    cursor: pointer;
`;

export const ConfirmButton = styled.button`
    padding: 2px 10px;
    border: 1px solid #666;
    background: none;
    box-sizing: border-box;
    outline: none;
    cursor: pointer;
`;
