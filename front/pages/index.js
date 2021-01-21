import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Router from 'next/router';
import Head from 'next/head';

import Login from './login';

// const userLanguage = () => {
//     console.log('navigator.language', navigator.language);
//     console.log('navigator.userLanguage', navigator.userLanguage);
// };

const Home = () => {
    const { userInfo } = useSelector((state) => state.user);
    const { nickname } = userInfo;

    
    useEffect(() => {
        if(!nickname){
            Router.push('/login');
        }
    }, [nickname]);

    // useEffect(() => {
    //     userLanguage();
    // }, []);

    return (
        <>
            index.js
        </>
    );
};

export default Home;

// TODO
// - 언어 https://meaningless-life.tistory.com/9
