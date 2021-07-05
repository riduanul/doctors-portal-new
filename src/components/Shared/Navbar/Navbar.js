import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-light text-white" >
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto ">
              
              <Link to='/' class="nav-item">
                <a class="nav-link m-4 active" aria-current="page" href="#home">Home</a>
              </Link>
            
              
              <li class="nav-item">
                <a class="nav-link m-4" href="#about">About</a>
              </li>
              <li class="nav-item">
                <a class="nav-link m-4" href="#dental">Dental Services</a>
              </li>
              <li class="nav-item">
                <a class="nav-link m-4 text-white" href="#reviews">Reviews</a>
              </li>
              <li class="nav-item">
                <a class="nav-link m-4 text-white" href="#blog">Blog</a>
              </li>
              <li class="nav-item">
                <a class="nav-link m-4 text-white" href="#contact">Contact Us</a>
              </li>
            
              
            </ul>
           
          </div>
        </div>
      </nav>
    );
};

export default Navbar;