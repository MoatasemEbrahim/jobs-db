import React,{FC,useState,useEffect,useCallback} from 'react';
import {useParams,Link} from 'react-router-dom';
import styles from './Entity.module.scss';
import jobsAPIs from '../../apis/jobs';
import skillsAPIs from '../../apis/skills';

// Job or Skill
const Entity:FC<IProps> = ({entity}:IProps) => {
  const [entityData,setEntityData] = useState<IData>();
  const [loading, setLoading] = useState<boolean>(true);
  const {id} = useParams();

  const getOtherEntityData:(data) => IEntity = useCallback((data)=>{
    if(entity === 'jobs') return { uuid: data.skill_uuid, title: data.skill_name } as IEntity
    return { uuid: data.job_uuid, title: data.job_title } as IEntity
  },[entity])

  
  useEffect(()=>{
    const fetchingJobs = entity === 'jobs';
    (async()=>{
      setLoading(true);
      try {
        const data = fetchingJobs ? await jobsAPIs.getOneJob(id) : await skillsAPIs.getOneSkill(id);
        const relatedEntities = fetchingJobs ? await jobsAPIs.getRelatedJobs(id) : await skillsAPIs.getRelatedSkills(id);
        const otherItems = fetchingJobs ? await jobsAPIs.getJobRelatedSkills(id) : await skillsAPIs.getSkillRelatedJobs(id);
        const collectedData = {
          title: data[fetchingJobs ? 'title' : 'skill_name'] as string,
          relatedEntities: relatedEntities
            ?.[fetchingJobs ? 'related_job_titles' : 'skills']
            ?.map(({uuid,title,skill_name}) =>({uuid,title: fetchingJobs ? title : skill_name})) as IEntity[] || []
            .filter(({uuid}) => uuid !== id),
          otherEntities: otherItems
            ?.[fetchingJobs ? 'skills' : 'jobs']
            ?.map((data) => getOtherEntityData(data)) as IEntity[] || []
        }
        setEntityData(collectedData);
      } catch (error) {
        console.warn(error.message)
      } finally {
        setLoading(false);
      }
    })()
  },[id,entity,getOtherEntityData])

  if(loading) return <h3>Loading ...</h3>

  const isFetchingJobs = entity === 'jobs';

  return (
    <div className={styles.container}>
      <h2>{entityData?.title}</h2>
      <div className={styles.body}>
        <div className={styles['other-entities']}>
          <h4>{isFetchingJobs ? 'Related Skills:' : 'Related Jobs:'}</h4>
          {entityData?.otherEntities?.map(({uuid,title})=>
            <Link
              key={uuid}
             className={styles['other-entity-link']}
             to={`/${isFetchingJobs ? 'skills' : 'jobs'}/${uuid}`}
            >
              {title}
            </Link>
          )}
        </div>
        <div className={styles['related-entities']}>
          <h4>{isFetchingJobs ? 'Related Jobs:' : 'Related Skills:'}</h4>
          <ul>
            {entityData?.relatedEntities?.map(({uuid,title})=>
              <li key={uuid}>
                <Link
                  key={uuid}
                  className={styles['related-entity-link']}
                  to={`/${isFetchingJobs ? 'jobs' : 'skills'}/${uuid}`}
                >
                  {title}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Entity;

interface IProps {
  entity: string,
}

type IEntity = {uuid:string,title:string}

interface IData {
  title: string,
  relatedEntities: IEntity[],
  otherEntities: IEntity[],
}
