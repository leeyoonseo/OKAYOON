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

// const SubTitle = styled.div`
//     font-size: 25px;
//     color: #000;
// `;

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
    padding: 5% 0;
    background: #F6B352;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
`;

const CloseButton = styled.button`
    ${initButtonStyle}
    position: absolute;
    top: 2%;
    right: 2%;
    color: #000;
`;

const PopupContent = styled.div`
    border-top: 2px solid #000;
    border-bottom: 2px solid #000;
`;

const ArrowButtonArea = styled.div`
    button {
        ${initButtonStyle}
        color: #000;
    }
`;

const Finish = ({ 
    type,
    onChangeStep,
}) => {
    const [openedPopup, setOpenedPopup] = useState(false);
    // const [popupViewPage, setPopupViewPage] = useState(0);
    const { personalityType } = useSelector((state) => state.game);
    const [data, setData] = useState(null);
    const [prevTypeData, setPrevTypeData] = useState(null);
    const [nextTypeData, setNextTypeData] = useState(null);

    useEffect(() => {
        const type = '1a';
        setData(personalityType.find((v) => v.type === type));
    }, []);

    useEffect(() => {
        if (!data) return;
        const typeIndex = data.typeIndex;
        let prevIndex = (typeIndex === 1) ? 9 : typeIndex - 1;
        let nextIndex = (typeIndex === 9) ? 1 : typeIndex + 1;

        setPrevTypeData(personalityType((v) => v.typeIndex === prevIndex));
        setNextTypeData(personalityType((v) => v.typeIndex === nextIndex));
    }, [data]);



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
                        
                <button
                    onClick={onClickPopup}
                >
                    인접한 유형 확인하기
                </button>
            </BottomArea>

            {!openedPopup && (
                <Popup>
                    <CloseButton 
                        onClick={onClickPopup}
                    >
                        <CloseOutlined />
                        <span className="hidden">팝업 닫기</span>
                    </CloseButton>
                    {/* <button>예시보기</button> */}

                    <PopupContent>
                        {/* <Title>
                            {data.title}
                        </Title>

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
                        /> */}
                    </PopupContent>

                    <ArrowButtonArea>
                        <button>
                            <LeftOutlined />
                            <span className="hidden">왼쪽 인접한 유형보기</span>
                        </button>
                        <button>
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

// 주의
// 각 유형의 양쪽에 인접한 두 개의 유형에 영향을 받을 수 있습니다.
// 예시 4번 독창형의 사람
// - 3번 성취형의 요소가 강하면
// 경쟁의식이 강해져 자신의 위치나 실력을 향상하려는 경향이 있습니다.
// 5번 탐구형의 요소가 강하면 
// - 독창성이 한층 강해져 자신이 상상한 세계에 빠져 버리는 경향이 있습니다.
