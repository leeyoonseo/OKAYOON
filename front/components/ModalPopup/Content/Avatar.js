import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { CHANGE_USERINFO_REQUEST } from '../../../reducers/user';
import { DELETE_MODAL_REQUEST } from '../../../reducers/site';

// TODO: 홀수
const avatarSample = [
    {
        src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        title: '1번',
    },
    {
        src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20140127_257%2Faosjahemdd_1390820129233pOn7o_JPEG%2Fd018e984a74511e2bd6322000a1fa42a_7_large.jpg&type=sc960_832',
        title: '2번',
    },
    {
        src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        title: '3번',
    },
    {
        src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20140127_257%2Faosjahemdd_1390820129233pOn7o_JPEG%2Fd018e984a74511e2bd6322000a1fa42a_7_large.jpg&type=sc960_832',
        title: '4번',
    },{
        src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        title: '5번',
    },
    {
        src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        title: '1번',
    },
    {
        src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20140127_257%2Faosjahemdd_1390820129233pOn7o_JPEG%2Fd018e984a74511e2bd6322000a1fa42a_7_large.jpg&type=sc960_832',
        title: '2번',
    },
    {
        src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        title: '3번',
    },
    {
        src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20140127_257%2Faosjahemdd_1390820129233pOn7o_JPEG%2Fd018e984a74511e2bd6322000a1fa42a_7_large.jpg&type=sc960_832',
        title: '4번',
    },{
        src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        title: '5번',
    },
];

const Wrap = styled.div`
    &:after {
        display: block;
        content: '';
        clear: both;
    }
`;

const Items = styled.div`
    margin: 10px 10px 10px 0;
    width: calc(25% - 8px);
    height: 105px;
    box-sizing: border-box;
    float: left;

    &:nth-child(4n) {
        margin-right: 0 !important;
    }

    button{
        padding: 0;
        width:100%;
        height:100%;
        color: #777;
        border: 1px solid #aaa;
        cursor: pointer;

        &:hover,
        &:focus {
            outline: none;
            box-shadow: 1px 1px 5px rgba(0,0,0,0.5);
        }
    }

    img {
        width: 100%;
        height: 100%;
    }
`;

const SourceText = styled.span`
    display:block;
    text-align:left;
    font-size:60%;
    color:#aaa;
`;

const ModalAvatarContent = ({ onCloseModal }) => {
    return(
        <Wrap>
            <Items 
                onClick={onCloseModal(null)}
            >
                <button>기본이미지</button>
            </Items>
            {
                avatarSample.map((v, i) => {
                    return (
                        <Items
                            key={`${v.title}-${i}`}
                            onClick={onCloseModal(v.src)}
                        >
                            <button>
                                <img alt={v.title} src={v.src} />
                            </button>
                        </Items>
                    );  
                })
            }
            <SourceText>이미지출처: https://www.pngwing.com/ko/free-png-zvldq/download</SourceText>
        </Wrap>
    );
};

// ModalAvatarContent.propTypes = {
//     onCloseModal: PropTypes.func.isRequired,
// };

export default ModalAvatarContent;

export const AVATAR_MODAL_ID = 'LU_M_0';
export const AVATAR_MODAL_DATA = {
    id: AVATAR_MODAL_ID, // 페이지컴포넌트_모달_인덱스
    // location: ['50%', '50%', 1],
    visible: false,
    size: {
        w: '500px',
        h: '500px'
    },
    title: "아바타 설정",
    content: ModalAvatarContent,
    buttonDisabled : {
        Maximize: true,
        Minimization: true
    },   
};

// TODO:
// - 기본 이미지 스타일 수정
// - 이미지 s3 추가