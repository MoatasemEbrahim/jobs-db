import React from 'react';
import {Link} from 'react-router-dom';
import styles from './Nav.module.scss';
import {useLocation} from 'react-router-dom';

const links = [
  { route:'/', label:'Home', },
  { route:'/search', label:'Search', },
  { route:'/history', label:'History', },
]

const Nav = () => {
  const {pathname} = useLocation()

  return (
    <div>
      {links.map(({route,label})=>
        <Link
          to={route}
          className={`${styles.link} ${route === pathname ? styles['active-link'] : ''}`} 
          key={route}
        >
          {label}
        </Link>
      )}
    </div>
  )
}

export default Nav
