import React from 'react';
import ellipse1 from '../../../images/Ellipse 1.png';
import ellipse2 from '../../../images/Ellipse 2.png';
import ellipse3 from '../../../images/Ellipse 3.png';

const TestimonialCard = () => {
    return (
        <div className="container d-flex justify-content-between">
            <div class="row row-cols-1 row-cols-md-3 g-4 ">
    <div class="col">
        <div class="card h-100">
            <div class="card-body">
            <h5 style={{ lineHeight:'40px'}} className="card-title">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem nesciunt, repellendus ad doloribus deserunt rem quasi quidem pariatur libero fugiat asperiores laboriosam mollitia quia aliquid?</h5>
            <div className="mt-3 d-flex justify-content-evenly align-items-center">
                <img src={ellipse1} alt="" />
               <div>
               <h4 style={{color:"#12D0D9", fontWeight:"bold"}}> Winson Herry</h4>
                <p className='text-secondary'>California</p>
               </div>
            </div>
        </div>
        
        </div>
    </div>
  <div class="col">
  <div class="card h-100">
        <div class="card-body">
        <h5 style={{ lineHeight:'40px'}} className="card-title">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem nesciunt, repellendus ad doloribus deserunt rem quasi quidem pariatur libero fugiat asperiores laboriosam mollitia quia aliquid?</h5>
            <div className="mt-3 d-flex justify-content-evenly align-items-center">
                <img src={ellipse2} alt="" />
               <div>
               <h4 style={{color:"#12D0D9", fontWeight:"bold"}}> Winson Herry</h4>
                <p className='text-secondary'>California</p>
               </div>
            </div>
      </div>
      
    </div>
  </div>
  <div class="col">
  <div class="card h-100">
        <div class="card-body">
        <h5 style={{ lineHeight:'40px'}} className="card-title">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem nesciunt, repellendus ad doloribus deserunt rem quasi quidem pariatur libero fugiat asperiores laboriosam mollitia quia aliquid?</h5>
            <div className="mt-3 d-flex justify-content-evenly align-items-center">
                <img src={ellipse3} alt="" />
               <div>
               <h4 style={{color:"#12D0D9", fontWeight:"bold"}}> Winson Herry</h4>
                <p className='text-secondary'>California</p>
               </div>
            </div>
      </div>
      
    </div>
  </div>
</div>

        </div>
    );
};

export default TestimonialCard;