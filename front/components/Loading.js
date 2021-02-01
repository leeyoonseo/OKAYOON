import React from 'react';
import styled from 'styled-components';

import { Spin } from 'antd';

const LoadingSpin = styled(Spin)`
    position: fixed;
    color: #fff;
    z-index: 99999;
    opacity: 0.5;

    i { 
        background: #fff;
    }
`;

const Loading = () => {
    return <LoadingSpin size="large"/>;
};

export default Loading;