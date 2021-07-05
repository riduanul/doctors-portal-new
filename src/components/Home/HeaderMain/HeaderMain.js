import React from 'react';
import chair from "../../../images/Chair.png";
import {Link} from 'react-router-dom';

const HeaderMain = () => {
    return (
        <main style={{height:'600px'}} className="row d-flex align-items-center justify-content-center">
          <div className="col-md-4 offset-col-1">
            <h1 style={{color:"#203047", fontWeight:"700"}}> Your New Smile <br /> Starts Here</h1>
            <p className='text-muted'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolore officiis eum id consequuntur vero.</p>
            <Link to='/appointment'> 
            <button className="btn btn-brand">GET APPOINTMENT</button>
            </Link>
           
          </div>  
          <div className="col-md-6">
              <img src={chair} alt="chair" className="img-fluid" />
          </div>
        </main>
    );
};

export default HeaderMain;