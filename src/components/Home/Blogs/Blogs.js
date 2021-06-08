import React from 'react';
import ellipse1 from '../../../images/Ellipse 1.png';
import ellipse2 from '../../../images/Ellipse 2.png';
import ellipse3 from '../../../images/Ellipse 3.png';

const Blogs = () => {
    return (
        <div>
            <div className="mt-5 pt-5">
                <h5 style={{textAlign:'center', color:'#12D0D9'}}>OUR BLOG</h5>
                <h1 style={{textAlign:'center'}}>From Our Blog News</h1>
            </div>
            <div className="mt-5 pt-5">
            <div className="container d-flex justify-content-between">
            <div class="row row-cols-1 row-cols-md-3 g-4 ">
    <div class="col">
        <div class="card h-100">
        <div className="mt-3 d-flex justify-content-evenly align-items-center">
                <img src={ellipse2} alt="" />
               <div>
               <h4 style={{fontWeight:"bold"}}> Dr. Winson Herry</h4>
                <p className='text-secondary'>23 April 2019</p>
               </div>
            </div>
            <div class="card-body">
            <h5 className='mt-3'>Two times of brush in a day can healthy your teeth</h5>
        <p className="card-title text-secondary">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis ipsam asperiores rerum! Dicta, aperiam cum?</p>          
        </div>
        
        </div>
    </div>
  <div class="col">
  <div class="card h-100">
        <div class="card-body">
        <div className="mt-3 d-flex justify-content-evenly align-items-center">
                <img src={ellipse3} alt="" />
               <div>
               <h4 style={{fontWeight:"bold"}}> Dr. Herry</h4>
                <p className='text-secondary'>23 April 2019</p>
               </div>
            </div>
            <h5 className='mt-3'>Two times of brush in a day can healthy your teeth</h5>
        <p className="card-title text-secondary">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis ipsam asperiores rerum! Dicta, aperiam cum?</p>
           
      </div>
      
    </div>
  </div>
  <div class="col">
  <div class="card h-100">
        <div class="card-body">
        <div className="mt-3 d-flex justify-content-evenly align-items-center">
                <img src={ellipse1} alt="" />
               <div>
               <h4 style={{fontWeight:"bold"}}> Dr. Winson</h4>
                <p className='text-secondary'>29 April 2019</p>
               </div>
            </div>
            <h5 className='mt-3'>The tooth cancer is taking a challenge</h5>
        <p  className="card-title text-secondary">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis ipsam asperiores rerum! Dicta, aperiam cum?</p>
            
      </div>
      
    </div>
  </div>
</div>

        </div>
            </div>
        </div>
    );
};

export default Blogs;