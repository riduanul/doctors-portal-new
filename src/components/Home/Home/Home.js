import React from 'react';
import Blogs from '../Blogs/Blogs';
import BusinessInfo from '../BusinessInfo/BusinessInfo';
import Contact from '../Contact/Contact';
import Doctors from '../Doctors/Doctors';
import Exceptional from '../Exceptional/Exceptional';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import MakeAppointment from '../MakeAppointment/MakeAppointment';
import Services from '../Services/Services';
import Testimonial from '../Testimonial/Testimonial';
import TestimonialCard from '../TestimonialCard/TestimonialCard';

const Home = () => {
    return (
        <div>
            <Header></Header>
            <BusinessInfo></BusinessInfo>
            <Services></Services>
            <Exceptional></Exceptional>
            <MakeAppointment></MakeAppointment>
            <Testimonial></Testimonial>
            <TestimonialCard></TestimonialCard>
            <Blogs></Blogs>
            <Doctors></Doctors>
            <Contact></Contact>
            <Footer></Footer>
        </div>
    );
};

export default Home;