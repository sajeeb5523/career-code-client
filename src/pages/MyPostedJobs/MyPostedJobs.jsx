import React, { Suspense } from 'react';
import useAuth from '../../hooks/useAuth';
import JobLists from './JobLists';
import { jobsCreateByPromise } from '../../api/jobsApi';

const MyPostedJobs = () => {

    const { user } = useAuth();

    return (
        <div>
            <h2>My posted Jobs </h2>
            <Suspense fallback={<div>Loading...</div>}>
                <JobLists
                    jobsCreateByPromise={jobsCreateByPromise(user?.email)}
                ></JobLists>
            </Suspense>
        </div>
    );
};

export default MyPostedJobs;