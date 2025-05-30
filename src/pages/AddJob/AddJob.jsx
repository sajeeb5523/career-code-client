import React from 'react';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddJob = () => {
    const { user } = useAuth();

    const handleAddAJob = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // process salary range data
        const { min, max, currency, ...newJob } = data;
        newJob.salaryRange = { min, max, currency }

        // process requirements
        const requirementsString = newJob.requirements;
        const requirementsDirty = requirementsString.split(',');
        const requirementsClean = requirementsDirty.map(req => req.trim());
        console.log(requirementsDirty, requirementsClean);
        newJob.requirements = requirementsClean;

        // process requirements (shortcut process)
        // newJob.requirements = newJob.requirements.split(',').map(res => res.trim());

        // process responsibilities
        newJob.responsibilities = newJob.responsibilities.split(',').map(res => res.trim());

        newJob.status = "active";

        console.log(newJob);

        // save job to the database 
        axios.post('http://localhost:3000/jobs', newJob)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "This new job has been saved and published.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                console.log(res);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='my-8 md:px-120'>
            <h2 className='mb-3 md:text-center'>Please add a job</h2>
            <form onSubmit={handleAddAJob}>
                {/* Basic info */}
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <legend className="fieldset-legend">Basic Info</legend>

                    <label className="label">Job title</label>
                    <input type="text" name='title' className="input" placeholder="Job title" />

                    <label className="label">Company</label>
                    <input type="text" name='company' className="input" placeholder="Company Name" />

                    <label className="label">Location</label>
                    <input type="text" name='location' className="input" placeholder="Company Location" />

                    <label className="label">Company logo</label>
                    <input type="text" name='company_logo' className="input" placeholder="Company logo url" />
                </fieldset>

                {/* Job type */}
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <legend className="fieldset-legend">Job Type</legend>
                    <div className="filter">
                        <input className="btn filter-reset" type="radio" name="jobType" aria-label="All" />
                        <input className="btn" type="radio" name="jobType" aria-label="On-site" value='On-site' />
                        <input className="btn" type="radio" name="jobType" aria-label="Remote" value='Remote' />
                        <input className="btn" type="radio" name="jobType" aria-label="Hybrid" value='Hybrid' />
                    </div>
                </fieldset>

                {/* Job category */}
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <legend className="fieldset-legend">Job Category</legend>
                    <select defaultValue="Job Category" name='category' className="select">
                        <option disabled={true}>Job Category</option>
                        <option>Engineering</option>
                        <option>Marketing</option>
                        <option>Finance</option>
                    </select>
                </fieldset>

                {/* Application deadline */}
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <legend className="fieldset-legend">Application Deadline</legend>
                    <input type="date" name="deadline" className='input' />
                </fieldset>

                {/* Salary range */}
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <legend className="fieldset-legend">Salary Range</legend>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                        <div>
                            <label className="label">Minium Salary</label>
                            <input type="text" name='min' className="input" placeholder="Minium Salary" />
                        </div>

                        <div>
                            <label className="label">Maximum Salary</label>
                            <input type="text" name='max' className="input" placeholder="Maximum Salary" />
                        </div>

                        <div>
                            <label className="label">Currency</label>
                            <select defaultValue="Select a Currency" name='currency' className="select">
                                <option disabled={true}>Select a Currency</option>
                                <option>BDT</option>
                                <option>USD</option>
                                <option>EU</option>
                            </select>
                        </div>

                    </div>
                </fieldset>

                {/* Job description */}
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <legend className="fieldset-legend">Job Description</legend>
                    <textarea className="textarea" name='description' placeholder="Job description"></textarea>
                </fieldset>

                {/* Job requirements */}
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <legend className="fieldset-legend">Job Requirements</legend>
                    <textarea className="textarea" name='requirements' placeholder="Job requirements (separate by comma)"></textarea>
                </fieldset>

                {/* Job responsibilities */}
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <legend className="fieldset-legend">Job Responsibilities</legend>
                    <textarea className="textarea" name='responsibilities' placeholder="Job responsibilities (separate by comma)"></textarea>
                </fieldset>

                {/* hr related info */}
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <legend className="fieldset-legend">HR Related Info</legend>

                    <label className="label">HR name</label>
                    <input type="text" name='hr_name' className="input" placeholder="HR Name" />

                    <label className="label">HR email</label>
                    <input type="email" name='hr_email' defaultValue={user.email} readOnly className="input" placeholder="HR Email" />
                </fieldset>

                <input type="submit" className='btn mt-2' value="Add Job" />

            </form>
        </div>
    );
};

export default AddJob;