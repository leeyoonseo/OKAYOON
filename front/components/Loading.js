import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Spin } from 'antd';

const LoadingSpin = styled(Spin)`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${({ theme }) => theme.colors.white};
    opacity: 0.5;
    z-index: 999999999;

    i { 
        background: ${({ bgcolor }) => bgcolor};
    }
`;

const Loading = ({
    bgcolor
}) => {
    return (
        <LoadingSpin 
            size="large"
            bgcolor={bgcolor}
        />
    )
};

Loading.propTypes = {
    bgcolor: PropTypes.string,
};

Loading.defaultProps = {
    bgcolor: '#fff',
};

export default Loading;