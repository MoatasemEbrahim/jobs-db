import React,{FC} from 'react';
import SearchResultCard from '../SearchResultCard/SearchResultCard';
import styles from './JobsGrid.module.scss';

const JobsGrid:FC<{jobs:IJob[]}> = ({jobs}:{jobs:IJob[]}) => 
  <div className={styles.jobs}>
    {jobs.map(({job_uuid,job_title,skills}) => 
      <SearchResultCard key={job_uuid} id={job_uuid} title={job_title} skills={skills} />
    )}
  </div>

export default JobsGrid;

interface IJob {
  job_uuid: string,
  job_title: string,
  skills: {
    skill_name: string,
    skill_uuid: string
  }[]
}

