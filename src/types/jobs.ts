export interface IJob {
  job_uuid: string,
  job_title: string,
  skills: { skill_name: string; skill_uuid: string; }[]
}
