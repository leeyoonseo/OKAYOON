import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import { LeftOutlined, RightOutlined, CloseOutlined } from '@ant-design/icons';

import Layout from './Layout';

const Title = styled.div`
    font-size: 35px;
    line-height: 1;
    font-weight: 700;
    color: #b0371c;
`;

const Tag = styled.div`
    font-size: 20px;
    margin-top: 5px;
    color: #bc5027;

    span + span {
        margin-left: 10px;
    }
`;

const SpeechBubble = styled.div`
    position: relative;
    display: inline-block;
    padding: 10px 25px;
    border-radius: 30px;
    background: #b0371c;
    margin-top: 25px;
    &:after {
        position: absolute;
        bottom: -9px;
        left: 50%;
        transform: translateX(-50%);
        content: '';
        display: block;
        width: 0px;
        height: 0px;
        border-bottom: 10px solid none;
        border-top: 10px solid #b0371c;
        border-right: 10px solid transparent;
        border-left: 10px solid  transparent;
    }

    span {
        display: block;
        font-size: 14px;
    }

    span.title {
        color: #F6B352;
        margin-bottom: 10px;
        font-size: 16px;
    }
`;

const Description = styled.div`
    background: #fff;
    color: #000;
    padding: 20px;
    margin: 20px 0;
    border-top: 2px solid #000;
    border-bottom: 2px solid #000;

    .strong {
        color: #b0371c;
    }
`;

const initButtonStyle = css`
    padding: 0;
    border: none;
    outline: none;
    background: none;
    cursor: pointer;

    &:hover {
        opacity: 0.5;
    }
`;

const BottomArea = styled.div`
    font-size: 14px;
    color: #000;

    button {
        ${initButtonStyle}
        margin-top: 5px;
        padding: 0 5px;
        border: 1px solid #000;
    }
`;

const Popup = styled.div`
    padding: 10% 0;
    background: #F6B352;
    top: 50%;
    left: 50%;
    width: 90%;
    height: 90%;
    position: absolute;
    transform: translate(-50%, -50%);
    border: 2px solid #000;
    box-shadow: 1px 1px 5px rgb(0 0 0 / 50%);
`;

const PopupTitle = styled.div`
    font-size: 25px;
    line-height: 1.25;
    font-weight: 700;
    color: #b0371c;
`;

const PopupTag = styled.div`
    margin-top: 5px;
    color: #bc5027;

    span + span {
        margin-left: 10px;
    }
`;

const CloseButton = styled.button`
    ${initButtonStyle}
    position: absolute;
    top: 2%;
    font-size: 18px;
    right: 2%;
    color: #b0371c;
`;

const AdjacentArea = styled.div`
    position: relative;
`;

const TooltipWrap = styled.div`
    position: absolute;
    left: 50%;
    min-width: 340px;
    transform: translateX(-50%);
    color: #fff;
    bottom: 100%;
`;

const Tooltip = styled.div`
    padding: 5%;
    box-sizing: border-box;
    font-size: 13px;
    position: relative;
    display: inline-block;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.6);
    text-align: center;
    word-break: keep-all;
    
    &:after {
        position: absolute;
        top: 100%;
        transform: translate(-50%, 0);
        left: 50%;
        content: '';
        display: block;
        width: 0px;
        height: 0px;
        border-bottom: 10px solid none;
        border-top: 10px solid  rgba(0, 0, 0, 0.6);
        border-right: 10px solid transparent;
        border-left: 10px solid  transparent;
    }
`;

const ArrowButtonArea = styled.div`
    position: absolute;
    width: 100%;
    bottom: 0;

    button {
        ${initButtonStyle}
        font-size: 18px;
        color: #000;

        &[disabled] {
            opacity: 0.2;
            cursor: default;
        }
    }

    button + button {
        margin-left: 5px;
    }
`;

const Finish = ({ type }) => {
    const { personalityType } = useSelector((state) => state.game);
    const [data, setData] = useState(null);
    const [openedPopup, setOpenedPopup] = useState(false);
    const [popupFirstPage, setPopupFirstPage] = useState(true);
    const [popupData, setPopupData] = useState(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipText = `
        ※주의※<br />
        각 유형의 인접한 두 개의 유형에 영향을 받을 수 있습니다.<br />
        화살표를 통해 인접한 유형을 확인해보세요.<br /> 
    `;

    useEffect(() => {
        setData(personalityType.find((v) => v.type === type));
    }, []);

    useEffect(() => {   
        if (!data) return;
        const { typeIndex } = data;
        let index = '';

        if (popupFirstPage) {
            index = (typeIndex === 1) ? 9 : typeIndex - 1;

        } else {
            index = (typeIndex === 9) ? 1 : typeIndex + 1;
        }

        for (let i = 0; i < personalityType.length; i++) {
            if (personalityType[i].typeIndex === index){
                setPopupData(personalityType[i]);
                break;
            }
        }
    }, [data, popupFirstPage]);

    const onShowTooltip = useCallback((state) => () => setShowTooltip(state), []);

    const onClickArrow = useCallback(() => {
        setPopupFirstPage(!popupFirstPage);
    }, [popupFirstPage]);

    const onClickPopup = useCallback(() => {
        setOpenedPopup(!openedPopup);
    }, [openedPopup]);

    return (
        <Layout>
            {data && (
                <>
                    <Title>{data.title}</Title>

                    <Tag>
                        {data.tag.map((o) => {
                            return (
                                <span key={o}>
                                    {`#${o}`}
                                </span>
                            );
                        })}
                    </Tag>
                    
                    <SpeechBubble>
                        <span className="title">
                            말 버릇
                        </span>

                        {data.habit.map((o) => {
                            return (
                                <span key={o}>
                                    {`'${o}'`}
                                </span>
                            );
                        })}
                    </SpeechBubble>

                    <Description 
                        dangerouslySetInnerHTML={{ __html: data.description }} 
                    />
                </>
            )}

            <BottomArea>
                <div>
                    ※ 주의: 인접한 유형에 영향을 받을 수 있습니다. 
                </div>

                <AdjacentArea>
                        <button
                            onMouseEnter={onShowTooltip(true)}
                            onMouseLeave={onShowTooltip(false)}
                            onClick={onClickPopup}
                        >
                            인접한 유형 확인하기
                        </button>

                        {showTooltip && (
                            <TooltipWrap>
                                <Tooltip
                                    dangerouslySetInnerHTML={{__html: tooltipText}}
                                />
                            </TooltipWrap>
                        )}
                </AdjacentArea>  
            </BottomArea>

            {openedPopup && (
                <Popup>
                    <CloseButton 
                        onClick={onClickPopup}
                    >
                        <CloseOutlined />
                        <span className="hidden">팝업 닫기</span>
                    </CloseButton>

                    {popupData && (
                        <>
                            <PopupTitle>
                                {popupData.title}
                            </PopupTitle>

                            <PopupTag>
                                {popupData.tag.map((o) => {
                                    return (
                                        <span key={o}>
                                            {`#${o}`}
                                        </span>
                                    );
                                })}
                            </PopupTag>

                            <SpeechBubble>
                                <span className="title">
                                    말 버릇
                                </span>

                                {popupData.habit.map((o) => {
                                    return (
                                        <span key={o}>
                                            {`'${o}'`}
                                        </span>
                                    );
                                })}
                            </SpeechBubble>

                            <Description 
                                dangerouslySetInnerHTML={{ __html: popupData.description }} 
                            />
                        </>
                    )}

                    <ArrowButtonArea>
                        <button
                            disabled={popupFirstPage}
                            onClick={onClickArrow}
                        >
                            <LeftOutlined />
                            <span className="hidden">왼쪽 인접한 유형보기</span>
                        </button>
                        <button
                            disabled={!popupFirstPage}
                            onClick={onClickArrow}
                        >
                            <RightOutlined />
                            <span className="hidden">오른쪽 인접한 유형보기</span>
                        </button>
                    </ArrowButtonArea>
                </Popup>
            )}
        </Layout>
    );
};

export default Finish;

