import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { Modal, Button  } from 'antd';


// TODO: 홀수
const sampleAvatarList = [
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

const ModalContentWrap = styled.div`
    &:after {
        display: block;
        content: '';
        clear: both;
    }
`;

const AvatarBox = styled.div`
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

const ModalContentAvatar = ({ onCloseModal }) => {

    return(
        <ModalContentWrap>
            <AvatarBox 
                onClick={onCloseModal(true, null)}
            >
                <button>기본이미지</button>
            </AvatarBox>
            {
                sampleAvatarList.map((v, i) => {
                    return (
                        <AvatarBox
                            key={`${v.title}-${i}`}
                            onClick={onCloseModal(true, v.src)}
                        >
                            <button>
                                <img alt={v.title} src={v.src} />
                            </button>
                        </AvatarBox>
                    );  
                })
            }
        </ModalContentWrap>
    );
};

ModalContentAvatar.propTypes = {
    onCloseModal: PropTypes.func.isRequired,
};

export default ModalContentAvatar;

// TODO:
// - 기본 이미지 스타일 수정
// - 이미지 s3 추가