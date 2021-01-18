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

const AvatarImg = styled.img`
    margin-bottom: 6px;
    width: calc(50% - 6px);
    height: 200px;
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
            visible={visible} 
            onCancel={onClosePopup(false)}

            footer={[
                <SourceText key="source">
                    이미지출처: https://www.pngwing.com/ko/free-png-zvldq/download
                </SourceText>,
                <Button key="back" onClick={onClosePopup(false)}>
                    닫기
                </Button>,
                <Button key="submit" type="primary" 
                    //loading={loading}
                    onClick={onClosePopup(true, chosenIndex)}>
                    저장
                </Button>,
            ]}
        >
            {
                sampleAvatarList.map((v, i) => {
                    return (
                        <AvatarImg 
                            className={chosenIndex === i && 'active'}
                            key={`${v.title}-${i}`}
                            alt={v.title} 
                            src={v.src} 
                            onClick={onClickImg(i)}
                        />
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