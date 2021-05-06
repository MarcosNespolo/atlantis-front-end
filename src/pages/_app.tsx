import '../styles/global.scss';

import React from 'react';

import Header from '../components/Header';
import Filter from '../components/Filter';

import styles from '../styles/app.module.scss';
import { FilterContextProvider } from '../components/contexts/FilterContext';

function MyApp({ Component, pageProps }) {
  return (
    <FilterContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Filter />
      </div>
    </FilterContextProvider>
  )
}

export default MyApp
