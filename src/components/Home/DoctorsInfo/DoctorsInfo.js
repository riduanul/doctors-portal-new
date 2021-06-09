import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const DoctorsInfo = ({doctor}) => {
    return (
        <div className='col-md-4' >
            
            <img style={{height:"300px"}}src={doctor.pic} alt="doctor" />
            <h5 style={{fontWeight:"bold", lineHeight:"40px"}}>{doctor.name}</h5>
            <div className='d-flex justify-content-center'>
                 <FontAwesomeIcon icon={doctor.icon}style={{color:"#12D0D9"}} ></FontAwesomeIcon>
                <p className='text-secondary'>{doctor.mobile}</p>
            </div>
        </div>
    );
};

export default DoctorsInfo;