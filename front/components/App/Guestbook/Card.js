import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// export const AvatarButton = styled(Avatar)`
//     margin-bottom: 10px;
//     cursor: pointer;
//     opacity: 0.8;
// `;

const Card = () => {
    const { userInfo } = useSelector((state) => state.user);

    useEffect(() => {
        console.log('Card', userInfo);
    }, []);

    return (
        <div>
            <Avatar 
                size={64} 
                src={userInfo.avatar ? userInfo.avatar : null}
                icon={<UserOutlined />} 
                // onClick={onClickModal(id)}
            />
        </div>
    );
};

export default Card;