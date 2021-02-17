import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

const ModalAvatar = ({ id, onCloseModal }) => {
    const { avatarList } = useSelector((state) => state.user);

    return(
        <Wrap>
            <Items 
                onClick={onCloseModal(id, 'default')}
            >
                <button>기본이미지</button>
            </Items>
            {
                avatarList.map((v, i) => {
                    return (
                        <Items
                            key={`${v.title}-${i}`}
                            onClick={onCloseModal(id, v.src)}
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

ModalAvatar.propTypes = {
    id: PropTypes.string.isRequired,
    onCloseModal: PropTypes.func.isRequired,
};

export default ModalAvatar;


// TODO:
// - 기본 이미지 스타일 수정
// - 이미지 s3 추가