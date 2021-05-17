import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const getIconColor = (activeType, name, { black }) => {
    return (activeType === name) ? 'white' : black;
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
        color: ${({ activeType, name }) => getIconColor(activeType, name, `${({ theme }) => theme.colors}`)};
    }
`;

const MenuButton = ({ activeType, name, onClick, Icon }) => {
    return (
        <Button
            activeType={activeType}
            name={name}
            className={activeType === name ? 'active' : ''}
            onClick={(() => onClick(name))}
        >
            <Icon 
                type={activeType} 
                name={name}
            />

            <span className="hidden">{name} 타입 버튼</span>
        </Button>
    );
};

MenuButton.propTypes = {
    activeType: PropTypes.string.isRequired, 
    name: PropTypes.string.isRequired, 
    onClick: PropTypes.func.isRequired, 
    Icon: PropTypes.object.isRequired,
};

export default MenuButton;

// TODO: 정적 컴포넌트