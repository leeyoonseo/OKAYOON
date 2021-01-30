import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';

// TODO: 이미지로 변경?
import { 
    PictureFilled, EditFilled, TabletFilled, 
    MessageFilled, CrownFilled, DeleteFilled,
    ChromeFilled,
    DeleteTwoTone,
} from '@ant-design/icons';

import Items from './Items';
import ModalPopup from '../ModalPopup/index';
import Guestbook from '../App/Guestbook';

const Wrap = styled.div`
    display: flex;
    width: 80%;
    height: 60%;
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

const GuestbookIcon = styled(TabletFilled)`
    ${defaultIconStyle}
`;  

const BlogIcon = styled(ChromeFilled)`
    ${defaultIconStyle}
`;

const GalleryIcon = styled(PictureFilled)`
    ${defaultIconStyle}
`;

const MemoIcon = styled(EditFilled)`
    ${defaultIconStyle}
`;

const ChattingIcon = styled(MessageFilled)`
    ${defaultIconStyle}
`;

const GameIcon = styled(CrownFilled)`
    ${defaultIconStyle}
`;

const DeleteIcon = styled(DeleteFilled)`
    ${defaultIconStyle}
`;

const IconTitle = styled.span`
    margin-top: 2px;
    display: block;
    font-size: 12px;
    color: #fff;
`;

const index = () => {
    const [isVisibleGuestbook,  setIsVisibleGuestbook] = useState(false);
    const onToggleGuestbook = useCallback((status) => () => {
        setIsVisibleGuestbook(status);
    }, []);

    return (
        <Wrap>
            <Items
                title={<IconTitle>방명록</IconTitle>}
                icon={<GuestbookIcon />}
                onClick={onToggleGuestbook(true)}
            >
                {/* <ModalPopup 
                    visible={isVisibleGuestbook} 
                    modal_width="500px"
                    modal_height="500px"
                    title="방명록"
                    onClose={onToggleGuestbook(false)} 
                /> */}
            </Items>
                

            {/* <Items>
                <TriggerButton>
                    <Tooltip placement="top" color="#777" title={<IconTitle>블로그</IconTitle>}>
                        <BlogIcon />
                    </Tooltip>
                </TriggerButton>
            </AppItems>

            <AppItems>
                <TriggerButton>
                    <Tooltip placement="top" color="#777" title={<IconTitle>갤러리</IconTitle>}>
                        <GalleryIcon />
                    </Tooltip>
                </TriggerButton>
            </AppItems>

            <AppItems>
                <TriggerButton>
                    <Tooltip placement="top" color="#777" title={<IconTitle>메모</IconTitle>}>
                        <MemoIcon />
                    </Tooltip>
                </TriggerButton>
            </AppItems>

            <AppItems>
                <TriggerButton>
                    <Tooltip placement="top" color="#777" title={<IconTitle>채팅</IconTitle>}>
                        <ChattingIcon />
                    </Tooltip>
                </TriggerButton>
            </AppItems>

            <AppItems>
                <TriggerButton>
                    <Tooltip placement="top" color="#777" title={<IconTitle>게임</IconTitle>}>
                        <GameIcon />
                    </Tooltip>
                </TriggerButton>
            </AppItems>

            <AppItems>
                <TriggerButton>
                    <Tooltip placement="top" color="#777" title={<IconTitle>휴지통</IconTitle>}>
                        <DeleteIcon />
                    </Tooltip>
                </TriggerButton>
            </AppItems> */}
        </Wrap>
        );
}

export default index;

// TODO:
// - 방명록
// - 블로그 연결(iframe?)
// - 갤러리
// - 메모
// - 채팅, 챗봇?
// - 게임 (콘솔->게임? or 단일게임)
// - 휴지통 (UI 삭제가능하도록?)