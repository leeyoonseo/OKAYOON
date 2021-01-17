import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';

import Head from 'next/head';

const Okayoon = ({ Component }) => {
    return(
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>OKAYOON</title>
            </Head>
            <Component />
        </>
    );
};

Okayoon.propTypes = {
    Component: PropTypes.elementType.isRequired,
};

export default Okayoon;