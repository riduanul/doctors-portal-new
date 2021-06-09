import React from 'react';

const Contact = () => {
    return (
        <section className="make-appointment text-center pt-5 mt-5"  style={{height: '550px'}}>
            <h4>Contact Us</h4>
            <h1>Always Contact With Us</h1>

            <form action="">
                <input type="text" placeholder="Email*" size='98'/><br /><br />
                <input type="text" placeholder="Subject*" size='98'/><br /><br />
                <textarea name="Message" id="" cols="100" rows="8" placeholder='Message*'></textarea> <br /> <br />
                <button className="btn btn-primary">Submit</button>
            </form>
        </section>
    );
};

export default Contact;