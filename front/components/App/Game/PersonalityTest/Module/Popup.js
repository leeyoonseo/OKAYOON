import React, { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { LeftOutlined, RightOutlined, CloseOutlined } from '@ant-design/icons';

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

const Wrap = styled.div`
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

const Title = styled.div`
    margin: 0 auto;
    width: 90%;
    font-size: ${({ theme }) => theme.calcRem(25)};
    line-height: 1.25;
    font-weight: 700;
    color: ${({ theme }) => theme.pColors.darkRed};
`;

const TagArea = styled.div`
    margin-top: ${({ theme }) => theme.calcRem(5)};
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

const Popup = ({ data, onClose }) => {
    const { personalityTestResult } = useSelector(state => state.game);
    const [isFirstPage, setIsFirstPage] = useState(true);
    const [popupData, setPopupData] = useState(null);

    useEffect(() => {
        const { typeIndex } = data;
        let index = (typeIndex === 9) ? 1 : typeIndex + 1;

        if (isFirstPage) {
            index = (typeIndex === 1) ? 9 : typeIndex - 1;
        } 

        for (let i = 0; i < personalityTestResult.length; i++) {
            if (personalityTestResult[i].typeIndex === index){
                setPopupData(personalityTestResult[i]);
                break;
            }
        }
    }, [data, isFirstPage]);

    const onClickArrow = useCallback(() => setIsFirstPage(!isFirstPage), [isFirstPage]);

    const Tags = useMemo(() => {
        if (!popupData || !popupData.tag) return;
        return popupData.tag.map(o => <span key={o}>{`#${o}`}</span>);
    }, [popupData]);

    const Habit = useMemo(() => {
        if (!popupData || !popupData.habit) return;
        return popupData.habit.map(o => <span key={o}>{`'${o}'`}</span>);
    }, [popupData]);

    return (
        <Wrap>
            <CloseButton 
                onClick={onClose}
            >
                <CloseOutlined />
                <span className="hidden">팝업 닫기</span>
            </CloseButton>

            {popupData && (
                <>
                    <Title>{popupData.title}</Title>
                    <TagArea>{Tags}</TagArea>

                    <SpeechBubble>
                        <span className="title">말 버릇</span>
                        {Habit}
                    </SpeechBubble>

                    <Description 
                        dangerouslySetInnerHTML={{ __html: popupData.description }} 
                    />
                </>
            )}

            <ArrowButtonArea>
                <button
                    disabled={isFirstPage}
                    onClick={onClickArrow}
                >
                    <LeftOutlined />
                    <span className="hidden">왼쪽 인접한 유형보기</span>
                </button>
                <button
                    disabled={!isFirstPage}
                    onClick={onClickArrow}
                >
                    <RightOutlined />
                    <span className="hidden">오른쪽 인접한 유형보기</span>
                </button>
            </ArrowButtonArea>
        </Wrap>
    );
};

Popup.propTypes = {
    data: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Popup;