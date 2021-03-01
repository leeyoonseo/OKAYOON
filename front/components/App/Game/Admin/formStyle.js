import styled from 'styled-components';

export const Form = styled.form`
    position: relative;
    padding: 20px;
    width: 100%;
`;

export const Item = styled.div`
    text-align: center;    

    & + div {
        margin-top: 15px;
    }
`;

export const Input = styled.input`
    padding: 3px 10px;
    width: 50%;
    color: #333;
    border: none;
    outline: none;
`;

// TODO: 모든 버튼에 기본 스타일 넣어주기..
// cursor랑 outline만
export const ButtonArea = styled.div`
    text-align: center;    

    button {
        padding: 3px 10px;
        border: 1px solid #fff;
        
        outline: none; 
        background: none;
        cursor: pointer;
    }

    button + button {
        margin-left: 15px;
    }
`;