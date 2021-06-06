import React,{FC,useState,useCallback, useEffect} from 'react';
import {parse} from 'query-string';
import debounce from 'lodash/debounce';
import {useHistory,useLocation} from 'react-router-dom';
import JobsGrid from '../shared/JobsGrid/JobsGrid';
import SearchForm from '../shared/SearchForm/SearchForm';
import jobsAPIs from '../../apis/jobs';
import skillsAPIs from '../../apis/skills';
import styles from './Search.module.scss';

const Search:FC = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading,setLoading] = useState<boolean>(true)
  const {search:queryString} = useLocation();
  const [searchText,setSearchText] = useState<string>(
    () => parse(queryString)?.jobTitle as string || '' 
  )
  const [searchOptions,setSearchOptions] = useState<string[]>([])
  const {push} = useHistory();

  const filterJobs = useCallback(debounce(async(text)=>{
    setLoading(true)
    setJobs([]);
    try {
      const options = await jobsAPIs.getJobsSearchOptions(text)
      setSearchOptions(options.map(({suggestion})=>suggestion))
      const jobSkillsRequests : [Promise<IJob>]= options.slice(0,12).map(
        async({uuid}) => jobsAPIs.getJobRelatedSkills(uuid).catch(e => console.warn(e.message))
      )
      const jobsAndSkills = await Promise.all(jobSkillsRequests)
      setJobs(jobsAndSkills.filter(Boolean))
    } catch (error) {
      console.warn(error.message)
    } finally {
      setLoading(false)
    }
  },350),[])

  useEffect(()=>{
    (()=>{
      push(`/search?jobTitle=${searchText}`);
      filterJobs(searchText);
    })()
  },[searchText,push,filterJobs])

  const handleSearch = (text) => { 
    if(text === '') return push('/');
    setSearchText(text)
  }

  return (
    <div>
      <SearchForm searchText={searchText} handleSearch={handleSearch} searchOptions={searchOptions} />
      <div className={styles['search-results']}>
        <h2>{searchText && `"${searchText}" Jobs`}</h2>
        {loading && <p>Loading ...</p>}
        <JobsGrid jobs={jobs}/>
        {!loading && searchText && jobs.length === 0 && <h4>No Jobs matching "{searchText}"</h4>}
      </div>
    </div>
  )
}

export default Search

interface IJob {
  job_uuid: string,
  job_title: string,
  skills: {
    skill_name: string,
    skill_uuid: string
  }[]
}
