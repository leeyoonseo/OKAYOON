import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import { LeftOutlined, RightOutlined, CloseOutlined } from '@ant-design/icons';

import Layout from './Layout';

const Title = styled.div`
    margin: 0 auto; 
    width: 90%;
    font-size: ${({ theme }) => theme.calcRem(35)};
    font-weight: 700;
    line-height: 1;
    color: ${({ theme }) => theme.pColors.darkRed};
`;

const Tag = styled.div`
    margin-top: ${({ theme }) => theme.calcRem(5)};
    font-size: ${({ theme }) => theme.calcRem(20)};
    color: ${({ theme }) => theme.pColors.orangeRed};

    span + span {
        margin-left: ${({ theme }) => theme.calcRem(10)};
    }
`;

const SpeechBubble = styled.div`
    position: relative;
    display: inline-block;
    padding: ${({ theme }) => theme.calcRem(10)} ${({ theme }) => theme.calcRem(25)};
    margin-top: ${({ theme }) => theme.calcRem(25)};
    border-radius: ${({ theme }) => theme.calcRem(30)};
    background: ${({ theme }) => theme.pColors.darkRed};

    &:after {
        position: absolute;
        bottom: -${({ theme }) => theme.calcRem(9)};
        left: 50%;
        display: block;
        content: '';
        width: 0px;
        height: 0px;
        border-bottom: ${({ theme }) => theme.calcRem(10)} solid none;
        border-top: ${({ theme }) => theme.calcRem(10)} solid ${({ theme }) => theme.pColors.darkRed};
        border-right: ${({ theme }) => theme.calcRem(10)} solid transparent;
        border-left: ${({ theme }) => theme.calcRem(10)} solid  transparent;
        transform: translateX(-50%);
    }

    span {
        display: block;
        font-size: ${({ theme }) => theme.calcRem(14)};
    }

    span.title {
        margin-bottom: ${({ theme }) => theme.calcRem(10)};
        color: ${({ theme }) => theme.pColors.yellow};
        font-size: ${({ theme }) => theme.calcRem(16)};
    }
`;

const Description = styled.div`
    padding: ${({ theme }) => theme.calcRem(20)};
    margin: ${({ theme }) => theme.calcRem(20)} 0;
    color: black;
    border-top: ${({ theme }) => theme.calcRem(2)} solid black;
    border-bottom: ${({ theme }) => theme.calcRem(2)} solid black;
    background: white;

    .strong {
        color: ${({ theme }) => theme.pColors.darkRed};
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
    font-size: ${({ theme }) => theme.calcRem(14)};
    color: black;

    button {
        ${initButtonStyle}
        margin-top: ${({ theme }) => theme.calcRem(5)};
        padding: 0 ${({ theme }) => theme.calcRem(5)};
        border: 1px solid black;
    }
`;

const Popup = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    padding: 5% 0;
    width: 90%;
    height: 90%;
    border: ${({ theme }) => theme.calcRem(2)} solid black;
    background: ${({ theme }) => theme.pColors.yellow};
    transform: translate(-50%, -50%);
    box-shadow: 1px 1px 5px rgb(0 0 0 / 50%);
`;

const PopupTitle = styled.div`
    margin: 0 auto;
    width: 90%;
    font-size: ${({ theme }) => theme.calcRem(25)};
    line-height: 1.25;
    font-weight: 700;
    color: ${({ theme }) => theme.pColors.darkRed};
`;

const PopupTag = styled.div`
    margin-top: ${({ theme }) => theme.calcRem(5)};
    color: ${({ theme }) => theme.pColors.orangeRed};

    span + span {
        margin-left: ${({ theme }) => theme.calcRem(10)};
    }
`;

const CloseButton = styled.button`
    ${initButtonStyle}
    position: absolute;
    top: 2%;
    right: 2%;
    font-size: ${({ theme }) => theme.calcRem(18)};
    color: ${({ theme }) => theme.pColors.darkRed};
`;

const AdjacentArea = styled.div`
    position: relative;
`;

const TooltipWrap = styled.div`
    position: absolute;
    left: 50%;
    bottom: 100%;
    min-width: ${({ theme }) => theme.calcRem(340)};
    color: white;
    transform: translateX(-50%);
`;

const Tooltip = styled.div`
    position: relative;
    display: inline-block;
    padding: 5%;
    font-size: ${({ theme }) => theme.calcRem(13)};
    text-align: center;
    word-break: keep-all;
    border-radius: ${({ theme }) => theme.calcRem(5)};
    background: rgba(0, 0, 0, 0.6);
    box-sizing: border-box;
    
    &:after {
        position: absolute;
        top: 100%;
        left: 50%;
        display: block;
        content: '';
        width: 0px;
        height: 0px;
        border-bottom: ${({ theme }) => theme.calcRem(10)} solid none;
        border-top: ${({ theme }) => theme.calcRem(10)} solid  rgba(0, 0, 0, 0.6);
        border-right: ${({ theme }) => theme.calcRem(10)} solid transparent;
        border-left: ${({ theme }) => theme.calcRem(10)} solid  transparent;
        transform: translate(-50%, 0);
    }
`;

const ArrowButtonArea = styled.div`
    position: absolute;
    width: 100%;
    bottom: 0;

    button {
        ${initButtonStyle}
        font-size: ${({ theme }) => theme.calcRem(18)};
        color: black;

        &[disabled] {
            opacity: 0.2;
            cursor: default;
        }
    }

    button + button {
        margin-left: ${({ theme }) => theme.calcRem(5)};
    }
`;

const Finish = ({ type }) => {
    const { personalityTestResult } = useSelector((state) => state.game);
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
        setData(personalityTestResult.find((v) => v.type === type));
    }, []);

    useEffect(() => {   
        if (!data) return;
        const resultData = personalityTestResult;
        const { typeIndex } = data;
        let index = '';

        if (popupFirstPage) {
            index = (typeIndex === 1) ? 9 : typeIndex - 1;

        } else {
            index = (typeIndex === 9) ? 1 : typeIndex + 1;
        }

        for (let i = 0; i < resultData.length; i++) {
            if (resultData[i].typeIndex === index){
                setPopupData(resultData[i]);
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

