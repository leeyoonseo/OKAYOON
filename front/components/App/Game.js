import React from 'react';

const Game = () => {
    return (
        <div>
            Game
        </div>
    );
};

export default Game;

export const GAME_MODAL_ID = 'MG_M_1'; // 페이지컴포넌트_모달_인덱스
export const GAME_MODAL_DATA = {
    id: GAME_MODAL_ID,
    location: {
        x: '50%',
        y: '50%'
    },
    visible: false,
    size: {
        w: '200px',
        h: '300px'
    },
    title: "게임",
    content: Game,
    buttonDisabled : {
        Maximize: true,
        Minimization: true
    },   
};

// TODO:
// DB 연결