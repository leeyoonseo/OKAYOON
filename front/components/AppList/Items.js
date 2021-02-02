import React from 'react';
import PropTypes from 'prop-types';

import { ItemButton } from './style';
import { Tooltip } from 'antd';

const Items = ({ disabled, icon, title, onClick }) => {
    return (
        <Tooltip 
            placement="top" 
            color="#777" 
            title={title}
        >
            <ItemButton
                disabled={disabled}
                onClick={onClick}
            >
                {icon}
            </ItemButton>
        </Tooltip>
    );
};

Items.propTypes = {
    disabled: PropTypes.bool, 
    icon: PropTypes.object.isRequired, 
    title: PropTypes.any, 
    onClick: PropTypes.func.isRequired, 
};

Items.defaultProps = {
    disabled: false,
    title: 'title',
};

export default Items;