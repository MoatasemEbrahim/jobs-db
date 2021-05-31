
import React,{FC} from 'react';
import {Link} from 'react-router-dom';
import styles from './Header.module.scss';
import Nav from './Nav/Nav';

const Header:FC = () => (
  <div className={styles.header}>
    <div className={styles.logo}>
      <h3><Link to="/" >Jobs now</Link></h3>
    </div>
    <div>
      <Nav/>
    </div>
  </div>
);

export default Header;