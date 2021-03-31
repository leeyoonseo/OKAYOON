import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { bucketUrl } from '../../../../config/config';

import Layout from './Layout';

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

const StarText = styled.div`
    margin-top: ${({ theme }) => theme.calcRem(20)};
    font-size: ${({ theme }) => theme.calcRem(60)};
    color: ${({ theme }) => theme.cColors.orange};
`;

const ScoreArea = styled.div`
    font-size: ${({ theme }) => theme.calcRem(40)};
    color: ${({ theme }) => theme.cColors.green};
`;

const Finish = ({ 
    score, 
    MAX_ROUND, 
}) => {
    const [starText, setStarText] = useState(null);
    const [starNum, setStarNum] = useState(null);
    
    useEffect(() => {
        const ratio = (score / MAX_ROUND) * 100;
        let starText = '';
        let starNum = null;

        if (ratio >= 95) { 
            starText = 'PERFECT';
            starNum = 5;
        
        } else if (ratio >= 75) { 
            starText = 'EXCELLENT';
            starNum = 4;
        
        } else if (ratio >= 50) {
            starText = 'GREAT';
            starNum = 3;

        } else if (ratio >= 25) { 
            starText = 'GOOD';
            starNum = 2;

        } else if (ratio >= 10) {
            starText = 'SO SO';
            starNum = 1;
        } else {
            starText = 'BAD';
            starNum = 0;
        }

        setStarText(starText);
        setStarNum(starNum);
    }, [score]);

    return (
        <Layout>
            <Inner>
                <StarArea>
                    {starNum >= 1 && Array(starNum).fill().map((_, i) => {
                        return(
                            <StarImageWrap key={`score_star_${i}`}>
                                <img src={`${bucketUrl}/game/catchmind/icon_star.png`} alt="점수에 대한 별" />
                            </StarImageWrap>
                        )
                    })}

                    <StarText>{starText && starText}</StarText>
                </StarArea>

                <ScoreArea>
                    {score}개 정답
                </ScoreArea>
            </Inner>
        </Layout>
    );
};

export default Finish;      