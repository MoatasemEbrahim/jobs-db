import React from 'react';

const Jobs = React.lazy(() => import('../pages/Jobs'));
const Job = React.lazy(() => import('../pages/Job'));
const Skill = React.lazy(() => import('../pages/Skill'));
const Search = React.lazy(() => import('../pages/Search'));

// every object will be a route and there are no nested objects, just nested paths
const Routes = [
  {
    path: '/',
    key: 'ROOT',
    exact: true,
    component: Jobs,
  },
  {
    path: '/jobs/:id',
    key: 'JOB',
    exact: true,
    component: Job,
  },
  {
    path: '/skills/:id',
    key: 'SKILL',
    exact: true,
    component: Skill,
  },
  {
    path: '/search',
    key: 'SEARCH',
    exact: true,
    component: Search,
  },
];

export default Routes;