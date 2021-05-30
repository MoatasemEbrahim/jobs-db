
import React from 'react';
import styles from './Header.module.scss';
import Nav from '../Nav/Nav';

const Header = () => (
  <div className={styles.header}>
    <div className={styles.logo}>
      <h3>Jobs now</h3>
    </div>
    <div>
      <Nav/>
    </div>
  </div>
);

export default Header;