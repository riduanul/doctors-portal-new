import React from 'react';
import cavity from '../../../images/cavity.png';
import fluoride from '../../../images/fluoride.png';
import whitening from '../../../images/whitening.png';
import ServiceDetail from '../ServiceDetail/ServiceDetail';


const serviceData = [
    {
        name: 'Fluoride Treatment',
        img: fluoride,
    },
    {
        name: 'Cavity Filling',
        img: cavity,
    },
    {
        name: 'Teeth whitening',
        img: whitening,
    },
]

const Services = () => {
    return (
        <section className="mt-5 " >
           <div className="text-center mb-5">
                 <h5 style={{color:"#12D0D9",fontWeight:"bold"}} className="m-3">Our Services`</h5>
                <h1 style={{fontWeight:"bold"}}>Services We Provide</h1>
           </div>
           <div className=' d-flex justify-content-center'>
           <div className="row mt-5 pt-5 w-75" >
               {
                     serviceData.map(service => <ServiceDetail service={service}></ServiceDetail>)
                }
           </div>
           </div>
        </section>
    );
};

export default Services;