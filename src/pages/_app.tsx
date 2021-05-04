import '../styles/global.scss';

import React from 'react';

import Header from '../components/Header';
import Filter from '../components/Filter';

import styles from '../styles/app.module.scss';

function MyApp({ Component, pageProps }) {
  return (<div className={styles.wrapper}>
    <main>
      <Header />
      <Component {...pageProps} />
    </main>
    <Filter />
  </div>
  )
}

export default MyApp
