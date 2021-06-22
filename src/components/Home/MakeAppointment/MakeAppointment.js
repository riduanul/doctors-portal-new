import React from 'react';
import doctor from "../../../images/doctor.png";
import "./MakeAppointment.css";

const MakeAppointment = () => {
    return (
      <div className="make-appointment img-fluid  mt-5 ">
           <div className="container">
                <div className=' row'>
                    <div className="col-md-6 img-fluid">
                            <img src={doctor} alt="" />
                    </div>
                    <div style={{zIndex:"1"}} className="col-md-6">
                       <div >
                       <h5 style={{color:"#12D0D9",paddingTop:"20px"}}>APPOINTMENT</h5>
                        <h1 className="mt-5 mb-5 text-white ">Make Appointment   Today </h1>
                        <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quisquam corrupti modi, sapiente non aspernatur natus veniam ut.</p>
                        <button className="btn btn-brand mt-5">Learn more</button>
                       </div>
                    </div> 
                </div>
            </div>
      </div>
    );
};

export default MakeAppointment;