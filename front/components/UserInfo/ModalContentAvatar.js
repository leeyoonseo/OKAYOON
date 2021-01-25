import React, { useCallback, useState } from 'react';
import { Modal, Button  } from 'antd';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import styled from 'styled-components';

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
            border-color: #333;
            outline: none;
        }
    }

    img {
        width: 100%;
        height: 100%;
    }
`;

const ModalContentAvatar = ({ onClosePopup }) => {
    const { sampleAvatarList } = useSelector((state) => state.user);

    return(
        <ModalContentWrap>
            <AvatarBox 
                onClick={onClosePopup(true, null)}
            >

                {/* [TODO] 기본이미지 텍스트 수정, 스타일 수정 */}
                <button>기본이미지</button>
            </AvatarBox>
            {
                sampleAvatarList.map((v, i) => {
                    return (
                        <AvatarBox
                            key={`${v.title}-${i}`}
                            onClick={onClosePopup(true, i)}
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
    onClosePopup: PropTypes.func.isRequired,
};

export default ModalContentAvatar;