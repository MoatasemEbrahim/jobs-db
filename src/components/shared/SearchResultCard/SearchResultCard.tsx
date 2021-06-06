import React,{FC} from 'react';
import {Link} from 'react-router-dom';
import Tag from '../Tag/Tag';
import styles from './SearchResultCard.module.scss';

const SearchResultCard:FC<IProps> = ({id,title,skills}) => 
  <div className={styles.card}>
    <h3>{title}</h3>
    <h4>Related skills</h4>
    <div className={styles.skills}>
      {skills.slice(0,6).map(({skill_name,skill_uuid})=> <Tag key={skill_uuid} title={skill_name} />)}
    </div>
    <Link to={`/job/${id}`}>View job details</Link>
  </div>

export default SearchResultCard;

interface IProps {
  id: string,
  title: string,
  skills: {
    skill_name: string,
    skill_uuid: string
  }[]
}