import React,{FC,useState,useEffect,useRef} from 'react';
import styles from './Jobs.module.scss';
import Search from '../shared/SearchForm/SearchForm';
import SearchResultCard from '../shared/SearchResultCard/SearchResultCard';
import jobsAPIs from '../../apis/jobs';

const Jobs:FC = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading,setLoading] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState(0)
  const loader = useRef(null);

  useEffect(()=>{
    (async()=>{
      try {
        setLoading(true)
        const jobs = await jobsAPIs.getJobs(currentPage);
        setJobs(prevJobs => [...prevJobs,...jobs.slice(0,-1)])
      } catch (error) {
        
      } finally {
        setLoading(false)
      }
    })()
  },[currentPage])

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {   
      setCurrentPage((page) => page + 1)
    }
  }

  useEffect(() => {
    const options = {
       root: null,
       rootMargin: "20px",
       threshold: 1.0
    };

    const observer = new IntersectionObserver(handleObserver, options);
    if (loader.current) {
       observer.observe(loader.current)
    }

}, []);

  return (
    <div className={styles.container}>
      <Search />
      <div className={styles['search-results']}>
        <h2>All jobs</h2>
        {loading && <p>Loading ...</p>}
        <div className={styles.jobs}>
          {jobs.map(({uuid,title})=> <SearchResultCard id={uuid} title={title} />)}
        </div>
      </div>
      <div className={styles.loading} ref={loader}>
        <h2>Loading ...</h2>
      </div>
    </div>
  )
}

export default Jobs

interface IJob {
  uuid: string,
  title: string,
  // normalized_job_title: string,
  // parent_uuid: string
}
