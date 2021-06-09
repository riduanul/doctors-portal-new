import { faPhone } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import dr from '../../../images/doctor.png';
import DoctorsInfo from '../DoctorsInfo/DoctorsInfo';



const doctors = [
    {
        name : 'Dr. Harry',
        mobile: '+61 452 200 126',
        icon: faPhone,
        pic:dr
    },

    {
        name : 'Dr. Potter',
        mobile: '+61 452 200 126',
        icon: faPhone,
        pic:dr
    },

    {
        name : 'Dr. Henry',
        mobile: '+61 452 200 126',
        icon: faPhone,
        pic:dr
    }
]

const Doctors = () => {

    return (
       <div className="container  mt-5 pt-5">
            <div>
            <h5 style={{color:'#12D0D9', fontWeight:'bold'}} className='text-center mb-5'>OUR DOCTORS</h5>
            </div>
        <div className='d-flex justify-content-center'>
            
          <div className="row text-center ">
                {
                    doctors.map(doctor => <DoctorsInfo doctor={doctor}></DoctorsInfo>)
                }
          </div>
        </div>  
       </div>
    );
};

export default Doctors;