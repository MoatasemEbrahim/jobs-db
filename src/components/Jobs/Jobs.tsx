import React,{FC,useState,useEffect,useRef, useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import debounce from 'lodash/debounce';
import SearchForm from '../shared/SearchForm/SearchForm';
import styles from './Jobs.module.scss';
import JobsGrid from '../shared/JobsGrid/JobsGrid';
import jobsAPIs from '../../apis/jobs';
import skillsAPIs from '../../apis/skills';

const Jobs:FC = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading,setLoading] = useState<boolean>(false)
  const [searchText,setSearchText] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(0);
  const {push} = useHistory();
  const loader = useRef(null);

  useEffect(()=>{
    (async()=>{
      try {
        setLoading(true)
        const jobs = await jobsAPIs.getJobs(currentPage);
        const jobSkillsRequests : [Promise<IJob>]= jobs.slice(0,-1).map(
          async({uuid}) => skillsAPIs.getJobRelatedSkills(uuid).catch(e => console.warn(e.message))
        )
        const jobsAndSkills = await Promise.all(jobSkillsRequests)
        setJobs(prevJobs => [...prevJobs,...jobsAndSkills.filter(Boolean)])
      } catch (error) {
        console.warn(error.message);
      } finally {
        setLoading(false);
      }
    })()
  },[currentPage])

  useEffect(() => {
    const options = {
       root: null,
       rootMargin: "20px",
       threshold: 1.0
    };

    const handleObserver = (entities) => {
      const target = entities[0];
      if (target.isIntersecting) {   
        setCurrentPage((page) => page + 1)
      }
    }

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
       observer.observe(loader.current)
    }
  }, []);

  const navigateToSearchPage = useCallback(debounce((text)=>{
    push(`/search?jobTitle=${text}`);
  },400),[push])

  const handleSearch = (text) => {
    setSearchText(text);
    if(text.length > 2) navigateToSearchPage(text);
  }

  return (
    <div>
      <SearchForm searchText={searchText} handleSearch={handleSearch} />
      <div className={styles['search-results']}>
        <h2>All jobs</h2>
        {loading && <p>Loading ...</p>}
        <JobsGrid jobs={jobs}/>
      </div>
      {!searchText && <div className={styles.loading} ref={loader}>
        <h2>Loading ...</h2>
      </div>}
    </div>
  )
}

export default Jobs;

interface IJob {
  job_uuid: string,
  job_title: string,
  skills: {
    skill_name: string,
    skill_uuid: string
  }[]
}
