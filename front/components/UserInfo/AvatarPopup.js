import React, { useCallback, useState } from 'react';
import { Modal, Button  } from 'antd';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import styled from 'styled-components';

const SourceText = styled.span`
    display:block;
    margin-bottom:7px;
    text-align:left;
    font-size:60%;
    color:#aaa;
`;

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

    &:hover,
    &:active,
    &.active{
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

const AvatarPopup = ({ visible, onClosePopup }) => {
    const { sampleAvatarList } = useSelector((state) => state.user);
    const [chosenIndex, setChosenIndex] = useState(null);
    
    const onClickImg = useCallback((i) => () => {
        setChosenIndex(i);
    }, []);

    return(
        <Modal 
            title="Select Avatar" 
            width={500}
            visible={visible} 
            style={{ top: 20 }}
            onCancel={onClosePopup(false)}

            footer={[
                <SourceText key="source">
                    이미지출처: https://www.pngwing.com/ko/free-png-zvldq/download
                </SourceText>,
                <Button key="back" onClick={onClosePopup(false)}>
                    닫기
                </Button>,
                <Button key="submit" type="primary" onClick={onClosePopup(true, chosenIndex)}>
                    저장
                </Button>,
            ]}
        >
            <AvatarBox 
                className={chosenIndex === null && 'active'}
                onClick={onClickImg(null)}
            >

                {/* [TODO] 기본이미지 텍스트 수정, 스타일 수정 */}
                <button>기본이미지</button>
            </AvatarBox>
            {
                sampleAvatarList.map((v, i) => {
                    return (
                        <AvatarBox
                            className={chosenIndex === i && 'active'}
                            key={`${v.title}-${i}`}
                            onClick={onClickImg(i)}
                        >
                            <img alt={v.title} src={v.src} />
                        </AvatarBox>
                    );  
                })
            }
        </Modal>
    );
};

AvatarPopup.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClosePopup: PropTypes.func.isRequired,
};

export default AvatarPopup;