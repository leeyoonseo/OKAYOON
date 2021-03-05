import styled, { css } from 'styled-components';
// TODO: 이미지로 변경?
import { 
    PictureFilled, EditFilled, TabletFilled, 
    MessageFilled, CrownFilled, ChromeFilled,
} from '@ant-design/icons';

export const Wrap = styled.div`
    display: flex;
    // width: 80%;
    // height: 60%;
    width: 650px;
    height: 90px;
    background: #eee;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
    border-radius: 5px 5px 0 0;
    align-items: center;
    justify-content: space-around;
`;

const defaultIconStyle = css`
    font-size: 32px;
    line-height: 1;
    color: #777;
`;

export const GuestbookIcon = styled(TabletFilled)`
    ${defaultIconStyle}
`;  

export const BlogIcon = styled(ChromeFilled)`
    ${defaultIconStyle}
`;

export const GalleryIcon = styled(PictureFilled)`
    ${defaultIconStyle}
`;

export const MemoIcon = styled(EditFilled)`
    ${defaultIconStyle}
`;

export const ChattingIcon = styled(MessageFilled)`
    ${defaultIconStyle}
`;

export const GameIcon = styled(CrownFilled)`
    ${defaultIconStyle}
`;

export const IconTitle = styled.span`
    margin-top: 2px;
    display: block;
    font-size: 12px;
    color: #fff;
`;

export const ItemButton = styled.button`
    width:60px;
    height:60px;
    background: #ddd;
    border: 1px solid #ccc;
    border-radius: 3px;
    outline: none;
    cursor: pointer;

    &:not(:disabled):hover,
    &:not(:disabled):focus {
        box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
    }

    &:disabled {
        position: relative;
        cursor: default;

        &:after {
            position: absolute;
            top: 0;
            left: 0;
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            opacity: 0.5;
            background: #fff;
        }
    }
`;