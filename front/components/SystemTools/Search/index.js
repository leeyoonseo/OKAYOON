import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import SearchPopup from './SearchPopup';

const SearchButtonWrap = styled.button`
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    outline: none;

    &:hover,
    &:focus {
        background: none;
    }

    .active {
        opacity: 0.5;
    }
`;

const Search = ({ themecolor }) => {
    const [isShowPopup, setIsShowPopup] = useState(false);

    const onClicButton = useCallback(() => {
        setIsShowPopup(!isShowPopup);
    }, [isShowPopup]);

    return(
        <>
            <SearchButtonWrap onClick={onClicButton}>
                <SearchOutlined 
                    className={isShowPopup && 'active'} 
                    style={{ color: themecolor }}
                />
            </SearchButtonWrap>
            { isShowPopup && <SearchPopup /> }
        </>
    );
};

Search.propTypes = {
    themecolor: PropTypes.string,
};

Search.defaultProps = {
    themecolor: '#333',
};

export default Search;