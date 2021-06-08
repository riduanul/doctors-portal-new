import React from 'react';
import q from '../../../images/quote.png';

const Testimonial = () => {
    return (
        <div className='container mt-5 pt-5'>
            <div className="row ">
                <div className="d-flex justify-content-between">
                    <div className="cl-md-4 ">
                        <h5 style={{color:"#12D0D9", fontWeight:"bold", marginTop:'10px'}}>TESTIMONIAL</h5> <br />
                        <h1 style={{fontWeight:"bold", marginTop:'10px'}}>What's Our Patients  <br /> Says</h1>
                    </div>
                    <div className="cl-md-8">
                        <img src={q} alt="" />
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Testimonial;