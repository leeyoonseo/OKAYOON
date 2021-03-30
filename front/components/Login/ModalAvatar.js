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
    height: ${({ theme }) => theme.calcRem(80)};
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
    font-size: ${({ theme }) => theme.calcRem(16)};
    color: ${({ theme }) => theme.colors.black};
    border: none;
    border-radius: 50%;
    outline: none;
    background: none;
    cursor: pointer;

    &.default {
        border: ${({ theme }) => theme.calcRem(2)} solid ${({ theme }) => theme.colors.black};
        font-weight: 700;
        background: ${({ theme }) => theme.colors.ivory};
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
                {avatarList.map(({ title, src }, i) => (
                    <Items key={`${title}_${i}`}>
                        <Button onClick={onCloseModal(id, title)}>
                            <img 
                                src={src} 
                                alt={title}
                            />
                        </Button>
                    </Items>
                ))}
            </Inner>
        </Wrap>
    );
};

ModalAvatar.propTypes = {
    id: PropTypes.string.isRequired,
    onCloseModal: PropTypes.func.isRequired,
}

export default ModalAvatar;