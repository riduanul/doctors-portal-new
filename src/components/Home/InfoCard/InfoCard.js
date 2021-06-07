import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './InfoCard.css';

const InfoCard = ({info}) => {
    return (
        <div className="col-md-4  info-card">
            <div className={`d-flex justify-content-center align-items-center info-container info-${info.background}`}>
                <div className='info-icon me-3 '>
                    <FontAwesomeIcon icon={info.icon}></FontAwesomeIcon>
                </div>
                <div className='text-white '>
                    <h6> {info.title}</h6>
                    <small>{info.description}</small>
                </div> 
            </div>
        </div>
    );
};

export default InfoCard;