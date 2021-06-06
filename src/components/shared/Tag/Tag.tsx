import React,{FC} from 'react';
import styles from './Tag.module.scss';

const Tag:FC<{title:string}> = ({title}:{title:string}) => <span className={styles.tag}>{title}</span>;

export default Tag
