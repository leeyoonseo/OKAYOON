import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { bucketUrl } from '../../../../../config/config';
import Frame from '../Module/Frame';

const Inner = styled.div`
    display: inline-block;
    line-height: 1;

    & > div + div {
        margin-top: ${({ theme }) => theme.calcRem(20)};
    }
`;

const StarArea = styled.div`
    & > span + span {
        margin-left: ${({ theme }) => theme.calcRem(10)};
    }
`;

const StarImageWrap = styled.span`
    display: inline-block;
    width: ${({ theme }) => theme.calcRem(50)};
    height: ${({ theme }) => theme.calcRem(50)};

    img {
        max-width: 100%;
        max-height: 100%;
    }
`;

const ResultMessage = styled.div`
    margin-top: ${({ theme }) => theme.calcRem(20)};
    font-size: ${({ theme }) => theme.calcRem(60)};
    color: ${({ theme }) => theme.cColors.orange};
`;

const ScoreArea = styled.div`
    font-size: ${({ theme }) => theme.calcRem(40)};
    color: ${({ theme }) => theme.cColors.green};
`;

const getRatio = (score, MAX_ROUND) => {
    return (score / MAX_ROUND) * 100;
};

const getResultData = ratio => {
    let data = {};

    if (ratio >= 95) { 
        data.text = 'PERFECT';
        data.star = 5;
    
    } else if (ratio >= 75) { 
        data.text = 'EXCELLENT';
        data.star = 4;
    
    } else if (ratio >= 50) {
        data.text = 'GREAT';
        data.star = 3;

    } else if (ratio >= 25) { 
        data.text = 'GOOD';
        data.star = 2;

    } else if (ratio >= 10) {
        data.text = 'SO SO';
        data.star = 1;
    } else {
        data.text = 'BAD';
        data.star = 0;
    }
    
    return data;
};

const Finish = ({ score, MAX_ROUND }) => {
    const [text, setText] = useState(null);
    const [star, setStar] = useState(null);
    
    useEffect(() => {
        const ratio = getRatio(score, MAX_ROUND);
        const result = getResultData(ratio);

        setText(result.text);
        setStar(result.star);
    }, [score]);

    return (
        <Frame>
            <Inner>
                <StarArea>
                    {star >= 1 && Array(star).fill().map((_, i) => (
                        <StarImageWrap key={`score_star_${i}`}>
                            <img 
                                src={`${bucketUrl}/game/catchmind/icon_star.png`} 
                                alt="점수 별 이미지" 
                            />
                        </StarImageWrap>
                    ))}

                    <ResultMessage>
                        {text && text}
                    </ResultMessage>
                </StarArea>

                <ScoreArea>
                    {score}개 정답
                </ScoreArea>
            </Inner>
        </Frame>
    );
};

Finish.propTypes = {
    score: PropTypes.number.isRequired, 
    MAX_ROUND: PropTypes.number.isRequired,   
};

export default Finish;      