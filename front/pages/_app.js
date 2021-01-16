import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';

const Okayoon = ({ Component }) => {
    return(
        <>
            <div>공통메뉴</div>
            <Component />
        </>
    );
};

Okayoon.propTypes = {
    Component: PropTypes.elementType.isRequired,
};

export default Okayoon;