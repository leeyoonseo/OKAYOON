import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { createGlobalStyle } from 'styled-components';

import 'antd/dist/antd.css';
import './app.css';
import wrapper from '../store/configurestore';

const Okayoon = ({ Component }) => {

    const Global = createGlobalStyle`
        body {
            font-size: 16px;

            & > div {
                height: 100%;
            }
        }

        .hidden {
            padding: 0; 
            margin: -1px;
            position: absolute; 
            width: 1px; 
            height: 1px; 
            clip: rect(0 0 0 0); 
            overflow: hidden; 
            border: 0; 
        }

        .slick-slide {
            display: inline-block;
        }

        .ant-avatar-image {
            overflow: unset;
        }
    `;

    return(
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>OKAYOON</title>
            </Head>
            <Global />
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