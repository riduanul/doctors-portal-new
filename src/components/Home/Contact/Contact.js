import React from 'react';
import "./contact.css";

const Contact = () => {
    return (
        <div  className="contact text-center pt-5 mt-5"  >
            <div className="contact-style">
            <h4>Contact Us</h4>
            <h1>Always Contact With Us</h1>

            <form action="">
                <input type="text" placeholder="Email*" size='98'/><br /><br />
                <input type="text" placeholder="Subject*" size='98'/><br /><br />
                <textarea name="Message" id="" cols="100" rows="8" placeholder='Message*'></textarea> <br /> <br />
                <button className="btn btn-brand">Submit</button>
            </form>
            </div>
        </div>
    );
};

export default Contact;