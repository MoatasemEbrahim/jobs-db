import React,{FC,useState,useEffect,useRef, useCallback} from 'react';
import {useHistory} from 'react-router-dom';
import debounce from 'lodash/debounce';
import { useSelector, useDispatch } from 'react-redux';
import {setJobs,setJobsPage,setSkills,setJobsFirstLoad} from '../../Redux/actions';
import {RootState} from '../../Redux/reducers';
import SearchForm from '../shared/SearchForm/SearchForm';
import styles from './Jobs.module.scss';
import JobsGrid from '../shared/JobsGrid/JobsGrid';
import jobsAPIs from '../../apis/jobs';

const Jobs:FC = () => {
  const [loading,setLoading] = useState<boolean>(false)
  const [searchText,setSearchText] = useState<string>('')
  const {jobs,jobsPage,jobsFirstLoad} = useSelector((state:RootState) => state.jobsData);
  const [currentPage, setCurrentPage] = useState<number>(jobsPage);
  const dispatch = useDispatch()
  const {push} = useHistory();
  const loader = useRef(null);

  useEffect(()=>{
    dispatch(setJobsPage(currentPage))
  },[currentPage,dispatch])


  useEffect(()=>{
    (async()=>{
      try {
        if(jobsFirstLoad) return;
        setLoading(true)
        const jobs = await jobsAPIs.getJobs(jobsPage);
        const jobSkillsRequests : [Promise<IJobData>]= jobs.slice(0,-1).map(
          ({uuid}) => jobsAPIs.getJobRelatedSkills(uuid).catch(e => console.warn(e.message))
        )
        const jobsAndSkills = await Promise.all(jobSkillsRequests)
        const normalizedSkills = jobsAndSkills.reduce((acc,job)=> ([...acc,...job.skills]),[])
        .reduce((acc,skill)=> ({...acc,[skill.skill_uuid]:skill}),{})

        const normalizedJobs = jobsAndSkills.reduce(
          (acc,job) => ({...acc,[job.job_uuid]:job})
        ,{})
        dispatch(setSkills(normalizedSkills))
        dispatch(setJobs(normalizedJobs))
      } catch (error) {
        console.warn(error.message);
      } finally {
        setLoading(false);
      }
    })()
  },[jobsPage,dispatch])

  
  useEffect(() => {
    const options = {
       root: null,
       rootMargin: "20px",
       threshold: 1.0
    };

    const handleObserver = (entities) => {
      const target = entities[0];
      if (target.isIntersecting) {   
        setCurrentPage(prevPage => prevPage + 1)
      }
    }

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
       observer.observe(loader.current)
    }

    dispatch(setJobsFirstLoad(false))
    
    return () => {
      dispatch(setJobsFirstLoad(true))
    }

  }, [dispatch]);

  const navigateToSearchPage = useCallback(debounce((text)=>{
    push(`/search?jobTitle=${text}`);
  },500),[push])

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
        <JobsGrid jobs={Object.values(jobs)}/>
      </div>
      {!searchText && <div className={styles.loading} ref={loader}>
        <h2>Loading ...</h2>
      </div>}
    </div>
  )
}

export default Jobs;

interface IJobData {
  job_uuid: string,
  job_title: string,
  skills: {
    skill_name: string,
    skill_uuid: string
  }[]
}