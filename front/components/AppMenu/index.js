import React from 'react';
import styled from 'styled-components';

import Guestbook from './Guestbook';

const AppMenuWrap = styled.div`
display: flex;

    width: 100%;
    height: 50%;
    background: #eee;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
    border-radius: 5px 5px 0 0;
    align-items: center;
    justify-content: space-around;
`;

const AppItems = styled.div`
    width:50px;
    height:50px;
    background: red;
`;

const index = () => {
    return (
        <AppMenuWrap>

            <AppItems>
                {/* 방명록 */}
                <Guestbook />
            </AppItems>

            <AppItems>
                블로그
            </AppItems>

            <AppItems>
                갤러리
            </AppItems>

            <AppItems>
                메모
            </AppItems>

            <AppItems>
                채팅
            </AppItems>

            <AppItems>
                게임
            </AppItems>

            <AppItems>
                휴지통
            </AppItems>
        </AppMenuWrap>
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