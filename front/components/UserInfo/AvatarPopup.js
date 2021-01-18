import React, { useCallback, useEffect, useState } from 'react';
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
    width:50%;
    height:200px;
    box-sizing:border-box;

    &:hover,
    &:active{
        border:3px solid #333;
    }
`;

const AvatarPopup = ({ visible, onClosePopup }) => {
    const [imgSrc, setImgSrc] = useState(null);
    const { avatarImgs } = useSelector((state) => state.user);

    const onClickImg = useCallback(({ target }) => {
        console.log('onClickImg', target);


    }, []);

    useEffect(() => {
        console.log('avatarImgs', avatarImgs);
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
                    onClick={onClosePopup(true)}>
                    저장
                </Button>,
            ]}
        >
            {
                avatarImgs.map((v, i) => {
                    return (
                        <AvatarImg 
                            key={`${v.title}-${i}`} 
                            alt={v.title} 
                            src={v.src} 
                            onClick={onClickImg}
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