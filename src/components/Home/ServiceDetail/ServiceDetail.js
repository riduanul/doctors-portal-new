import React from 'react';

const ServiceDetail = ({service}) => {
    return (
        <div className="col-md-4 text-center">
            <img className="mb-4" src={service.img} alt="" />
            <h5 className="mb-4">{service.name}</h5>
            <p className="text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam odit illum accusamus itaque. Eius, doloribus?</p>
        </div>
    );
};

export default ServiceDetail;