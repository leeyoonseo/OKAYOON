import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const getIconColor = (type, name, { black }) => {
    return (type === name) ? 'white' : black;
};

const Button = styled.button`
    padding: 0;
    width: ${({ theme }) => theme.calcRem(25)};
    height: ${({ theme }) => theme.calcRem(25)};
    border: 1px solid ${({ theme }) => theme.colors.black};
    line-height: 1;
    outline: none;
    background: none;
    cursor: pointer;

    &:hover { 
        background: ${({ theme }) => theme.colors.rgbaGray};
    }

    &.active {
        background: ${({ theme }) => theme.colors.rgbaGray};
    }

    span {
        vertical-align: middle;
        color: ${({ type, name }) => getIconColor(type, name, `${({ theme }) => theme.colors}`)};
    }
`;

const MenuButton = ({ type, name, onClick, Icon }) => (
    <Button
        type={type}
        name={name}
        className={type === name ? 'active' : ''}
        onClick={(() => onClick(name))}
    >
        <Icon 
            type={type} 
            name={name}
        />
        <span className="hidden">{name} 타입 버튼</span>
    </Button>
);

MenuButton.propTypes = {
    type: PropTypes.string.isRequired, 
    name: PropTypes.string.isRequired, 
    onClick: PropTypes.func.isRequired, 
    Icon: PropTypes.object.isRequired,
};

export default MenuButton;