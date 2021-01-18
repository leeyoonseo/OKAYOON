import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css';

import wrapper from '../store/configurestore';

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

export function reportWebVitals(metric){
    console.log(metric);
}

export default wrapper.withRedux(Okayoon);