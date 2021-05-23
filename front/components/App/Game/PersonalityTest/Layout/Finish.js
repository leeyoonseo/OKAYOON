import React, { useCallback, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { LeftOutlined, RightOutlined, CloseOutlined } from '@ant-design/icons';
import Frame from '../Module/Frame';
import Tooltip from '../Module/Tooltip';
import Popup from '../Module/Popup';

const Title = styled.div`
    margin: 0 auto; 
    width: 90%;
    font-size: ${({ theme }) => theme.calcRem(35)};
    font-weight: 700;
    line-height: 1;
    color: ${({ theme }) => theme.pColors.darkRed};
`;

const TagArea = styled.div`
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

const BottomArea = styled.div`
    font-size: ${({ theme }) => theme.calcRem(14)};
    color: black;

    button {
        margin-top: ${({ theme }) => theme.calcRem(5)};
        padding: 0 ${({ theme }) => theme.calcRem(5)};
        border: 1px solid black;
        background: none;
        outline: none;
        cursor: pointer;

        &:hover {   
            opacity: 0.5;
        }
    }
`;

const AdjacentArea = styled.div`
    position: relative;
`;

const Finish = ({ type }) => {
    const { personalityTestResult } = useSelector(state => state.game);
    const [data, setData] = useState(null);
    const [openedPopup, setOpenedPopup] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        setData(personalityTestResult.find(({ type: resultType }) => resultType === type));
    }, []);

    const onShowTooltip = useCallback(state => setShowTooltip(state), []);
    const onTogglePopup = useCallback(() => setOpenedPopup(!openedPopup), [openedPopup]);

    const Tags = useMemo(() => {
        if (!data || !data.tag) return;
        return data.tag.map(o => <span key={o}>{`#${o}`}</span>);
    }, [data]);

    const Habit = useMemo(() => {
        if (!data || !data.habit) return;
        return data.habit.map(o => <span key={o}>{`'${o}'`}</span>);
    }, [data]);

    return (
        <Frame>
            {data && (
                <>
                    <Title>{data.title}</Title>
                    <TagArea>{Tags}</TagArea>
                    
                    <SpeechBubble>
                        <span className="title">말 버릇</span>
                        {Habit}
                    </SpeechBubble>

                    <Description 
                        dangerouslySetInnerHTML={{ __html: data.description }} 
                    />
                </>
            )}

            <BottomArea>
                <div>※ 주의: 인접한 유형에 영향을 받을 수 있습니다.</div>

                <AdjacentArea>
                        <button
                            onMouseEnter={(() => onShowTooltip(true))}
                            onMouseLeave={(() => onShowTooltip(false))}
                            onClick={onTogglePopup}
                        >
                            인접한 유형 확인하기
                        </button>

                        {showTooltip && (
                            <Tooltip 
                                message={`
                                    ※주의※<br />
                                    각 유형의 인접한 두 개의 유형에 영향을 받을 수 있습니다.<br />
                                    화살표를 통해 인접한 유형을 확인해보세요.<br /> 
                                `}
                            />
                        )}
                </AdjacentArea>  
            </BottomArea>

            {openedPopup && ( 
                <Popup 
                    onClose={onTogglePopup}
                    data={data}
                />
            )}
        </Frame>
    );
};

Finish.propTypes = {
    type: PropTypes.string.isRequired, 
};

export default Finish;

