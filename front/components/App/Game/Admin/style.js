import styled from 'styled-components';


export const Wrap = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 16px;
    background: #333;

    > div + div {
        margin-top: 40px;
    }
`;

export const BackButton = styled.button`
    padding: 0;
    line-height: 0;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
`;

export const SelectArea = styled.div`
    text-align: center;
`;

export const Title = styled.div`
    display: inline-block;
    font-size: 20px;
    border-bottom: 1px solid #fff;
`;

export const Select = styled.div`
    margin-top: 15px;
`;

export const OptionItems = styled.div`
    display: inline-block;
    
    label {
        opacity: 0.3;
        cursor: pointer;
    }

    input[type='radio'],
    input[type='radio']:checked {
        appearance: none;
        background: none;
        outline: none;
        cursor: pointer;
    }

    input[type='radio']:checked + label {
        opacity: 1;
    }

    label[disabled],
    input[disabled] {
        display: none;
    }

    & + div {
        margin-left: 10px;
    }
`;

export const NotifyMessage = styled.div`
    display: flex;
    margin: 0 !important;
    height: calc(100% - 110px);
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
`;