import { faClock, faMapMarker, faPhone } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import InfoCard from '../InfoCard/InfoCard';

const infoData = [
    {
        title:'Opening Hours',
        description: 'we are open 24/7 hours',
        icon:faClock,
        background: 'primary'
    },
    {
        title:'Visit our location',
        description: 'Brooklyn, NY 10003 USA',
        icon: faMapMarker,
        background: 'dark'
    },
    {
        title:'Call us now',
        description: '+15972331943',
        icon: faPhone,
        background: 'primary'
    }
]

const BusinessInfo = () => {
    return (
        <section className='d-flex justify-content-center'>
           <div className="w-75 row info-card-top">
                {
                    infoData.map(info => <InfoCard info={info}></InfoCard> )
                }
           </div>
        </section>
    );
};

export default BusinessInfo;