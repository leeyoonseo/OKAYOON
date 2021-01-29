import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classNames';

import { 
    ModalPopupWrap, ModelHeader, ModalTitle,
    ModalContent, ModalFoter,
    ModalControls, ModalControlButton, 
    CloseIcon, MinimizationIcon, MaximizeIcon, 
    MiniWrap,
} from './styles';

/** 
 * @example 
 * <ModalPopup 
    visible={isVisible}
    button_disabled={{
        Maximize: true,
        Minimization: true
    }}
    modal_width="500px"
    modal_height="500px"
    title="아바타 설정"
    onClose={onCloseModal} 
>
    <Guestbook />
</ModalPopup>
*/

/**
 * @param {object} button_disabled: 버튼 비활성화
 * @param {boolean} button_disabled.Maximize: 최대화 버튼 비활성화 여부
 * @param {boolean} button_disabled.Minimization: 최소화 버튼 비활성화 여부
 * @param {string} modal_width: 모달 너비
 * @param {string} modal_height: 모달 높이
 * @param {boolean} visible: 모달 노출 여부
 * @param {string} title: 타이틀 텍스트
 * @param {any} children: 모달 컨텐츠
 * @param {function} onClick: 모달 여닫기 이벤트
 */
const ModalPopup = (props) => {
    console.log('props',props);
    
    // location: [{
    //     x: '50%'
    // },{
    //     y: '50%'
    // },{
    //     z: 1
    // }],
    // visible: false,
    // css: {
    //     width: '500px',
    //     height: '500px',
    // },
    // title: "아바타 설정",
    // content: ModalContentAvatar,
    // buttonDisabled : {
    //     Maximize: true,
    //     Minimization: true
    // },
    // onClick: function(status) {
    //     console.log('onTogglePopup!!', status);
    //     console.log('this.visible', this);
    // },

    // TODO: 기본에 포함되서 렉걸림 네이밍 다시하기
    // const { visible, x, y, width, height, zIndex } = css;

    // const [maxStatus, setMaxStatus] = useState(false);
    // const [minStatus, setMinStatus] = useState(false);

    // // const maximizeSize = '90%';
    // const modalClasses = classNames({
    //     'active': visible,
    //     'min': minStatus,
    // });

    // const onMinimization = useCallback(() => setMinStatus(!minStatus), [minStatus]);
    // const onMaximize = useCallback(() => setMaxStatus(!maxStatus), [maxStatus]);
    
    return (
        <>
        ModalPopupWrap
        </>
        // <ModalPopupWrap 
        //     className={modalClasses}
        //     w={maxStatus ? maximizeSize : modalWidth}
        //     h={maxStatus ? maximizeSize : modalHeight}
        // >
        //     <ModelHeader>
        //         <ModalControls>
        //             <ModalControlButton 
        //                 bgcolor="#ff6059" 
        //                 // #ff5f56
        //                 onClick={onClick(false)}
        //             >
        //                 <CloseIcon />
        //             </ModalControlButton>

        //             {!buttonDisabled.Minimization && (
        //                 <ModalControlButton 
        //                     bgcolor="#ffbc28"
        //                     onClick={onMinimization}
        //                 >
        //                     {/* #ffbd2e */}
        //                     <MinimizationIcon />
        //                 </ModalControlButton>
        //             )}
                    
        //             {!buttonDisabled.Maximize && (
        //                 <ModalControlButton 
        //                     bgcolor="#26ca3f"
        //                     onClick={onMaximize}
        //                 >
        //                     {/* #27c93f */}
        //                     <MaximizeIcon />
        //                 </ModalControlButton>
        //             )}
        //         </ModalControls>

        //         {title && <ModalTitle>{title}</ModalTitle>}
        //     </ModelHeader>

        //     <ModalContent>
        //         {children}
        //     </ModalContent>

        //     { minStatus && (
        //         <button onClick={onMinimization}>
        //             <span className="hidden">
        //                 최소화 해제버튼
        //             </span>
        //         </button>
        //     )}
        // </ModalPopupWrap>
    );
};

// ModalPopup.propTypes = {
//     button_disabled: PropTypes.objectOf(PropTypes.bool),
//     modal_width: PropTypes.string,
//     modal_height: PropTypes.string,
//     visible: PropTypes.bool.isRequired,
//     title: PropTypes.string,
//     children: PropTypes.any.isRequired,
//     onClick: PropTypes.func,
// };

// ModalPopup.defaultProps = {
//     button_disabled: {
//         Maximize: false,
//         Minimization: false,
//     },
//     children: '컨텐츠 영역',
//     modal_width: '300px',
//     modal_height: '300px',
// };

export default ModalPopup;

// TODO:
// - 위치 이동 
// - 여러개 최소화 시킬 경우 위치 재 정렬. 어떻게 할 지?`