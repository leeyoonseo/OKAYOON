import React, { useContext } from 'react';
import Head from 'next/head';
import { ThemeContext } from 'styled-components';
import DefaultLayout from '../layouts/Default/index.jsx';
import Footer from '../components/Portfolio/Footer';

const Error = () => {
  const themeContext = useContext(ThemeContext);

  return (
    <>
      <Head>
          <title>OKAYOON | 404 Error</title>
      </Head>
      
      <DefaultLayout
        bgcolor={themeContext.colors.mint}
        main={
          <div>
            <h1>404 - Page Not Found</h1>
          </div>
        }

        footer={<Footer />}
      />
    </>
  );
};

export default Error;