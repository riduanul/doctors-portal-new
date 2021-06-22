import React from 'react';
import chair from "../../../images/Chair.png";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const AppointmentHeader = ({handleDateChange}) => {
    
    return (
        <main style={{height:'600px'}} className="row d-flex align-items-center justify-content-center">
        <div className="col-md-4 offset-col-1">
          <h1 style={{color:"#203047", fontWeight:"700"}}> Appointment</h1> <br/>
          
              <Calendar
              onChange={handleDateChange}
              value={new Date()}
              
              />
          
          
        </div>  
        <div className="col-md-6">
            <img src={chair} alt="chair" className="img-fluid" />
        </div>
      </main>
    );
};

export default AppointmentHeader;