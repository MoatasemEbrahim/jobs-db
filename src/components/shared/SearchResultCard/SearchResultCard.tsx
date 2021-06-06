import React,{FC} from 'react';
import {Link} from 'react-router-dom';
import Tag from '../Tag/Tag';
import styles from './SearchResultCard.module.scss';

const SearchResultCard:FC<IProps> = ({id,title,skills}) => 
  <div className={styles.card}>
    <h3>{title}</h3>
    <h4>Related skills</h4>
    <div className={styles.skills}>
      {skills.slice(0,6).map(({skill_name,skill_uuid})=>
        <Link className={styles.link} key={skill_uuid} to={`/skills/${skill_uuid}`} ><Tag title={skill_name} /></Link>
      )}
    </div>
    <Link to={`/jobs/${id}`}>View job details</Link>
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