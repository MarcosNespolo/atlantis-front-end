import Link from 'next/link';

import styles from './styles.module.scss';

export default function Header() {
  return (
    <header className={styles.headerContainer}>
      <Link href={`/`}>
        <a><img width="40px" height="40px" src="/favicon.ico" alt="Atlantis" /><span>Atlantis</span></a>
      </Link>
      <Link href={`/listFishes`}>
        <a><p>Listar Especies</p></a>
      </Link>
      <span>Login</span>
    </header>
  );
}