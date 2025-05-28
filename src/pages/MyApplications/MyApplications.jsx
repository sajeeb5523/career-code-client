import React, { Suspense } from 'react';
import ApplicationStats from './ApplicationStats';
import ApplicationList from './ApplicationList';
import { myApplicationsPromise } from '../../api/applicationsApi';
import useAuth from '../../hooks/useAuth';

const MyApplications = () => {

    const { user } = useAuth();
    
    return (
        <div>
            <ApplicationStats></ApplicationStats>
            <Suspense fallback={"loading your applications..."}>

                <ApplicationList myApplicationsPromise={myApplicationsPromise(user.email)}></ApplicationList>
            </Suspense>
        </div>
    );
};

export default MyApplications;