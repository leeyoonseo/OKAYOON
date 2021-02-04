import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Wrap = styled.div`
    

    
`;

const Card = () => {

    // TODO: 유저가 내가 아니라 포스트 등록한 유저여야함
    const { me } = useSelector((state) => state.user);

    useEffect(() => {
        console.log('Card', me);
    }, []);

    return (
        <Wrap className="card">
            <Avatar 
                size={64} 
                src={me.avatar ? me.avatar : null}
                icon={<UserOutlined />} 
            />
        </Wrap>
    );
};

export default Card;