import React, { useEffect } from 'react';

const Modal = (props) => {
    const { visible } = props;

    useEffect(() => {
        console.log('modal props', props);
    }, []);

    return (   
        <div
            style={{
                display: visible ? 'block' : 'none',
                width: '300px',
                height: '300px',
                background: 'red'
            }}
        >
            <button 
                // onClick={props.onClick}
            >
                닫기
            </button>
            modal
            <button 
                // onClick={}
            >
                1번
            </button>
        </div>
    );
};

export default Modal;