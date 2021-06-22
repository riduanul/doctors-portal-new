import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <div style={{marginLeft:'150px', paddingTop:'100px',  }}className="footer-img w-75">
            <div className="de-flex justify-content-center">
            <div className="row ">
                <div className="col-md-3">
                        <h4></h4>
                        <br /><br />
                        <p>Emergency Dental Care</p>
                        <p>Check Up</p>
                        <p>Treatment Of Personal Diseases</p>
                        <p>Tooth Extraction</p>
                        <p>Check Up</p>
                    
                </div>
                <div className="col-md-3">
                        <h4 style={{color:'#12D0D9',fontWeight:'bold'}}>Service</h4>
                        <br />
                        <p>Emergency Dental Care</p>
                        <p>Check Up</p>
                        <p>Treatment Of Personal Diseases</p>
                        <p>Tooth Extraction</p>
                        <p>Check Up</p>
                        <p>Check Up</p>
                </div>
                <div className="col-md-3">
              
                         <h4 style={{color:'#12D0D9',fontWeight:'bold'}}> Oral Health</h4>
                         <br />
                        <p>Emergency Dental Care</p>
                        <p>Check Up</p>
                        <p>Treatment Of Personal Diseases</p>
                        <p>Tooth Extraction</p>
                        <p>Check Up</p>
                        <p>Check Up</p>
                        
                </div>
                <div className="col-md-3">
                        <h4 style={{color:'#12D0D9',fontWeight:'bold'}}>Our Address</h4>
                        <br />
                        <p>New York-101010 Hudson</p>
                        <p>Yards</p>
                        <br /><br /><br />
                        
                        <p>Call Now</p>
                        <button className="btn btn-brand ">+2025550295</button>
                </div>
               
            </div>
            
            </div>
            <br /><br />
           <footer className='text-center'>
           <small  >Copyright 2021 All Rights Reserved</small>
           </footer>
        </div>
    );
};

export default Footer;