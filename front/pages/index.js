import React, { useEffect } from 'react';
import Head from 'next/head';

import Login from './login';

const userLanguage = () => {
    console.log('navigator.language', navigator.language);
    console.log('navigator.userLanguage', navigator.userLanguage);
};

const Home = () => {

    useEffect(() => {
        userLanguage();
    }, []);

    return (
        <>
            index.js
        </>
    );
};

export default Home;

// TODO
// - 언어 https://meaningless-life.tistory.com/9
