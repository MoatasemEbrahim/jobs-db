import React,{FC} from 'react';
import {Link} from 'react-router-dom';
import styles from './SearchResultCard.module.scss';

const SearchResultCard:FC<IProps> = ({id,title}) => {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <Link to={`/job/${id}`}>View job details</Link>
    </div>
  )
}

export default SearchResultCard

interface IProps {
  id: string,
  title: string,
  // skills : string[]
}