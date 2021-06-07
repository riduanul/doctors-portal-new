import React from 'react';
import exceptional from '../../../images/exceptional.png';


const Exceptional = () => {
    return (
       <div className="container mt-5 mb-5 pb-5 pt-5">
        <div className="row">
           <div className="col-md-5">
                
                    <img style={{width: "450px"}}src={exceptional}alt="" />
                
            </div>
            <div  className="col-md-7">
                <h1 style={{fontWeight:"800"}}className="mt-5 mb-5">Exceptional Dental <br /> Care, On Your Terms</h1>
                <p style={{lineHeight:"40px", fontWeight:"500", fontSize:"20px"}} className="text-secondary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis perferendis nostrum vel tempora, libero cum consequuntur, accusamus autem iusto, est neque labore nihil! Animi fugiat vel velit suscipit dicta unde excepturi, officiis quaerat ab quibusdam minus corrupti impedit nesciunt enim consequuntur rerum voluptate laborum tempora quod eius ea a sequi.</p>
                <button className="btn mt-5 btn-primary">Learn more</button>
            </div> 
        </div>
       </div>
        
    );
};

export default Exceptional;