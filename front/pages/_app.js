import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { theme } from '../theme/styles';

import 'antd/dist/antd.css';
import './app.css';
import wrapper from '../store/configurestore';
import { bucketUrl } from '../config/config';

const Global = createGlobalStyle`
        body {
            font-size: 16px;

            @media only screen and ${({ theme }) => theme.device.mobileS} {
                font-size: 14px;
            }

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

const Okayoon = ({ Component }) => {
    return(
        <ThemeProvider theme={theme} >
            <Head>
                <meta charSet="utf-8" />
                <meta http-euqiv="x-UA-Compatible" content="ie=edge"/>
                <meta name="Robot"content="all"/>
                <meta name="author" content="Okayoon.lee" />
                <meta name="description" content="Front-end Web Developer Portfolio Site: react, redux" />
                <link rel="shortcut icon" href={`${bucketUrl}/favicon.ico`} type="image/x-icon" />
                <meta property="og:image" content="../public/icon_logo.png" />
                <meta property="og:description" content="Front-end Web Developer Portfolio Site: react, redux" />
                <meta property="og:title" content="Okayoon" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
                <title>OKAYOON</title>
            </Head>
            <Global />
            <Component />
        </ThemeProvider>
    );
};

Okayoon.propTypes = {
    Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(Okayoon);