import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import SearchPopup from './SearchPopup';

const SearchButtonWrapper = styled(Button)`
    padding: 0;
    width: auto;
    height: auto;
    background: none;
    border: none;

    &:hover,
    &:focus {
        background: none;
    }

    .active {
        opacity: 0.5;
    }
`;

const Search = ({ themecolor }) => {
    const [isPopupShow, setIsPopupShow] = useState(false);

    const onClickSearchButton = useCallback(() => {
        setIsPopupShow(!isPopupShow);
    }, [isPopupShow]);

    return(
        <>
            <SearchButtonWrapper onClick={onClickSearchButton}>
                <SearchOutlined 
                    className={isPopupShow && 'active'} 
                    style={{ color: themecolor }}
                />
            </SearchButtonWrapper>
            { isPopupShow && <SearchPopup /> }
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