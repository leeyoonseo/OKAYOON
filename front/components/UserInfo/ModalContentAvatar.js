import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// TODO: 홀수
const sampleList = [
    {
        src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        title: '1번',
    },
    {
        src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20140127_257%2Faosjahemdd_1390820129233pOn7o_JPEG%2Fd018e984a74511e2bd6322000a1fa42a_7_large.jpg&type=sc960_832',
        title: '2번',
    },
    {
        src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        title: '3번',
    },
    {
        src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20140127_257%2Faosjahemdd_1390820129233pOn7o_JPEG%2Fd018e984a74511e2bd6322000a1fa42a_7_large.jpg&type=sc960_832',
        title: '4번',
    },{
        src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        title: '5번',
    },
    {
        src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        title: '1번',
    },
    {
        src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20140127_257%2Faosjahemdd_1390820129233pOn7o_JPEG%2Fd018e984a74511e2bd6322000a1fa42a_7_large.jpg&type=sc960_832',
        title: '2번',
    },
    {
        src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        title: '3번',
    },
    {
        src: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20140127_257%2Faosjahemdd_1390820129233pOn7o_JPEG%2Fd018e984a74511e2bd6322000a1fa42a_7_large.jpg&type=sc960_832',
        title: '4번',
    },{
        src: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
        title: '5번',
    },
];

const Wrap = styled.div`
    &:after {
        display: block;
        content: '';
        clear: both;
    }
`;

const Items = styled.div`
    margin: 10px 10px 10px 0;
    width: calc(25% - 8px);
    height: 105px;
    box-sizing: border-box;
    float: left;

    &:nth-child(4n) {
        margin-right: 0 !important;
    }

    button{
        padding: 0;
        width:100%;
        height:100%;
        color: #777;
        border: 1px solid #aaa;
        cursor: pointer;

        &:hover,
        &:focus {
            outline: none;
            box-shadow: 1px 1px 5px rgba(0,0,0,0.5);
        }
    }

    img {
        width: 100%;
        height: 100%;
    }
`;

const SourceText = styled.span`
    display:block;
    text-align:left;
    font-size:60%;
    color:#aaa;
`;

const ModalAvatarContent = ({ onClick, callback }) => {

    const onClikcItem = useCallback((status, src = null) => {
        onClick(status);
        src && callback(src);
    }, []);

    return(
        <Wrap>
            <Items 
                onClick={onClikcItem(true, null)}
            >
                <button>기본이미지</button>
            </Items>
            {
                sampleList.map((v, i) => {
                    return (
                        <Items
                            key={`${v.title}-${i}`}
                            onClick={onClikcItem(true, v.src)}
                        >
                            <button>
                                <img alt={v.title} src={v.src} />
                            </button>
                        </Items>
                    );  
                })
            }
            <SourceText>이미지출처: https://www.pngwing.com/ko/free-png-zvldq/download</SourceText>
        </Wrap>
    );
};

ModalAvatarContent.propTypes = {
    onCloseModal: PropTypes.func.isRequired,
};

export default ModalAvatarContent;

// TODO:
// - 기본 이미지 스타일 수정
// - 이미지 s3 추가