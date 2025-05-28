import React, { Suspense } from 'react';
import Banner from './Banner';
import HotJobs from './HotJobs';

const jobsPromise = fetch('http://localhost:3000/jobs').then(res => res.json())

const Home = () => {

    return (
        <div>
            <Banner></Banner>
            <Suspense fallback={<div>Loading...</div>}>
                <HotJobs jobsPromise={jobsPromise}></HotJobs>
            </Suspense>
        </div>
    );
};

export default Home;