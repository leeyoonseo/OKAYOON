import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';

const Wrap = styled.div`
    &.linear {
        .progress {

        }

        .pointer {

        }
    }

    &.circle {
        .progress {

        }

        .shadow {
            
        }

        .pointer {
            
        }
    }
`;

const Inner = styled.div`

`;

// type: linear, circle
const Progress = ({ type, time }) => {

    // TODO: 일자, 동그라미
    useEffect(() => {
        

    }, []);

    const setup = useCallback(() => {

    }, []);

    const draw = useCallback(() => {

    }, [time]);

    return (
        <>
            <Wrap className={type === 'linear' ? 'linear' : 'circle'}>
                <Inner>
                    {type === 'linear' ? (
                        <span className="progress">
                            <span className="pointer"></span>
                        </span>
                    ) : (
                        <>
                            <div className="progress"></div>
                            <div className="shadow"></div>
                            <div className="pointer"><span></span></div>
                        </>
                    )}
                </Inner>
            </Wrap>
            <div>시간: {time}</div>        
        </>
    );
};

export default Progress;