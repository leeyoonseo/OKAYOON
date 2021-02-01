import React, { useCallback } from 'react';
import Modal from '../components/ModalPopup/index2';

const data = [{
    id: 'TEST_MODAL', 
    // location: ['50%', '50%', 1],
    visible: false,
    size: {
        w: '500px',
        h: '500px'
    },
    title: "아바타 설정",
    content: <div>모달컨텐츠</div>,
    buttonDisabled : {
        Maximize: true,
        Minimization: true
    },
    onClick: function(){
        console.log('onClick1', this.visible);
        this.visible = !this.visible;
        console.log('onClick2', this.visible);
    }   
}];

const test = () => {
    const onClickModal = useCallback((id) => (e) => {
        console.log('onClickModal', id, e.target);

        const modal = data.find((v) => v.id === id);
        console.log('modal', modal.onClick());

    }, []);

    return (
        <div>
            <button 
                onClick={onClickModal('TEST_MODAL')}
            >
                트리거
            </button>

            {data.map((v, i) => {
                return(
                    <Modal 
                        key={i}
                        {...v} 
                    />
                )  
            })}
        </div>
    );
};

export default test;