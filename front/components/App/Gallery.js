import React from 'react';

const Gallery = () => {
    return (
        <div>
            Gallery
        </div>
    );
};

export default Gallery;

export const GALLERY_MODAL_ID = 'MG_M_0'; // 페이지컴포넌트_모달_인덱스
export const GALLERY_MODAL_DATA = {
    id: GALLERY_MODAL_ID,
    visible: false,
    size: {
        w: '200px',
        h: '300px'
    },
    title: "사진첩",
    content: Gallery,
};

// TODO:
// DB 연결