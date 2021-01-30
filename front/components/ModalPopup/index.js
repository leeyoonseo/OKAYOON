import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classNames';

import { 
    Wrap, Header, Title,
    Content, 
    Controls, ControlButton, 
    CloseIcon, MinimizationIcon, MaximizeIcon, 
    MiniWrap,
} from './styles';
import { useDispatch } from 'react-redux';

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
    const dispatch = useDispatch();
    const {
        onCloseModal,
        visible,
        location, 
        size, 
        title, 
        children,
        buttonDisabled, 
    } = props;

    const maximizeSize = '90%';
    const [maxStatus, setMaxStatus] = useState(false);
    const [minStatus, setMinStatus] = useState(false);

    const classes = classNames({
        'active': visible,
        'min': minStatus,
    });

    const onMinimization = useCallback(() => setMinStatus(!minStatus), [minStatus]);
    const onMaximize = useCallback(() => setMaxStatus(!maxStatus), [maxStatus]);

    return (
        <Wrap
            className={classes}
            // x={location.x ? location.x : '50%' }
            // y={location.y ? location.y : '50%'}
            // z={location.z ? location.z : 1}
            w={maxStatus ? maximizeSize : size.w}
            h={maxStatus ? maximizeSize : size.h}
        >   
            <Header>
                <Controls>
                    <ControlButton 
                        bgcolor="#ff6059" 
                        onClick={onCloseModal(false)}
                    >
                        <CloseIcon />
                    </ControlButton>

                    {!buttonDisabled.Minimization && (
                        <ControlButton 
                            bgcolor="#ffbc28"
                            onClick={onMinimization}
                        >
                            <MinimizationIcon />
                        </ControlButton>
                    )}
                    
                    {!buttonDisabled.Maximize && (
                        <ControlButton 
                            bgcolor="#26ca3f"
                            onClick={onMaximize}
                        >
                            <MaximizeIcon />
                        </ControlButton>
                    )}
                </Controls>

                {title && <Title>{title}</Title>}
            </Header>

            <Content>
                {children}
            </Content>

            { minStatus && (
                <button onClick={onMinimization}>
                    <span className="hidden">
                        최소화 해제버튼
                    </span>
                </button>
            )}
        </Wrap>
        
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