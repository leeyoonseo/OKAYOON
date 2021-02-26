import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';

const Wrap = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: red;
`;

const Admin = () => {
    const { gameList } = useSelector((state) => state.game);

    useEffect(() => {

    }, []);

    return (
        <Wrap>
            <div>
                <div>게임선택</div>
                <div>
                    {gameList && gameList.map((v) => {
                        <span>{v.name}</span>
                    })}
                </div>
            </div>
        </Wrap>
    );
};

export default Admin;