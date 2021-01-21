import React, { useCallback, useState } from 'react';
import { Modal, Button  } from 'antd';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import styled from 'styled-components';


const AvatarBox = styled.div`
    margin-bottom: 6px;
    display: inline-block;
    width: calc(50% - 6px);
    height: 150px;
    box-sizing: border-box;
    cursor: pointer;

    &:nth-child(even){
        margin-left: 3px;
    }

    &:nth-child(odd){
        margin-right: 3px;
    }

    &:hover{
        outline: 3px solid #333;
    }

    &:after{
        content:'';
        display:block;
        clear:both;
    }

    img,
    button{
        display: inline-block;
        width:100%;
        height:100%;
    }
`;

const AvatarModalContent = ({ onClosePopup }) => {
    const { sampleAvatarList } = useSelector((state) => state.user);
  
    return(
        <>
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
                            <img alt={v.title} src={v.src} />
                        </AvatarBox>
                    );  
                })
            }
        </>
    );
};

AvatarModalContent.propTypes = {
    onClosePopup: PropTypes.func.isRequired,
};

export default AvatarModalContent;