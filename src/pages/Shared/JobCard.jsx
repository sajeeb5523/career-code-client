import React from 'react';
import { IoLocationOutline } from "react-icons/io5";
import { Link } from 'react-router';


const JobCard = ({ job }) => {
    const {_id, title, location, jobType, category, applicationDeadline, description, company, status, hr_email, hr_name, company_logo, salaryRange, requirements, responsibilities } = job;
    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <div className='flex gap-2'>
                <figure>
                    <img
                        src={company_logo}
                        className='w-16'
                        alt="Shoes" />
                </figure>
                <div>
                    <h3 className="text-4xl">{company}</h3>
                    <div className='flex items-center gap-1'>

                        <IoLocationOutline />
                        <p>{location}</p>
                    </div>

                </div>
            </div>
            <div className="card-body">
                <h2 className="card-title">
                    {title}
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <p>Salery: {salaryRange.min} - {salaryRange.max} {salaryRange.currency}</p>
                <p>{description}</p>
                <div className="card-actions">
                    {
                        requirements.map((skill, index) => <div key={index} className="badge badge-outline">{skill}</div>)
                    }
                </div>
                <div className="card-actions justify-end">
                    <Link to={`/jobs/${_id}`}>
                        <button className="btn btn-primary">Show Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default JobCard;