import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrap = styled.div`
    width: 100%;
`;

const Inner = styled.div`
    display: inline-block;

    &:after {
        display: block;
        content: '';
        clear: both;
    }
`;

const Items = styled.div`
    width: 18%;
    height: 5rem;
    box-sizing: border-box;
    float: left;

    & + div {
        margin-left: 2%;
        margin-top: 10%;
    }

    &:nth-child(-n + 5) {
        margin-top: 0;
    }
`;

const Button = styled.button`
    padding: 0;
    width:100%;
    height:100%;
    font-size: 1rem;
    color: #777;
    border: none;
    border-radius: 50%;
    outline: none;
    background: none;
    cursor: pointer;

    &.default {
        border: 2px solid #566270;
        font-weight: 700;
    }

    img {
        width: 100%;
        height: 100%;
    }
`;

const ModalAvatar = ({ id, onCloseModal }) => {
    const { avatarList } = useSelector((state) => state.user);

    return(
        <Wrap>
            <Inner>
                <Items>
                    <Button
                        className="default" 
                        onClick={onCloseModal(id, 'nickname')}
                    >
                        Nickname
                    </Button>
                </Items>
                {
                    avatarList.map((v, i) => {
                        return (
                            <Items key={`${v.title}-${i}`}>
                                <Button onClick={onCloseModal(id, v.title)}>
                                    <img alt={v.title} src={v.src} />
                                </Button>
                            </Items>
                        );  
                    })
                }
            </Inner>
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