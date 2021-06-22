import React from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';

const customStyles = {
    content: {
        width: '500px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const AppointmentForm = ({ modalIsOpen, closeModal, appointmentOn, date }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
    
    const onSubmit = (data) => {
        console.log(data);
        closeModal();
    }
    

    return ( 
      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 className='text-center text-brand'>{appointmentOn}</h2>
            <p className=" text-center text-secondary"><small >On {date.toDateString()} </small></p>
       
           <form className="p-3" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group p-2">
                        <input type="text" {...register('name',{ required: true })} placeholder="Your Name" className="form-control" />
                        {errors.name && <span className="text-danger">This field is required</span>}

                    </div>
                    <div className="form-group p-2">
                        <input type="text" {...register('phone',{ required: true })}placeholder="Phone Number" className="form-control" />
                        {errors.phone && <span className="text-danger">This field is required</span>}
                    </div>
                    <div className="form-group p-2">
                        <input type="text" {...register('email',{ required: true })} placeholder="Email" className="form-control" />
                        {errors.email && <span className="text-danger">This field is required</span>}
                    </div>
                    <div className="form-group row p-2">
                        <div className="col-4">

                            <select className="form-control" {...register('gender',{ required: true })} >
                                <option disabled={true} value="Not set">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Not set">Other</option>
                            </select>
                            {errors.gender && <span className="text-danger">This field is required</span>}

                        </div>
                        <div className="col-4">
                            <input {...register('age',{ required: true })} className="form-control" placeholder="Your Age" type="number" />
                            {errors.age && <span className="text-danger">This field is required</span>}
                        </div>
                        <div className="col-4">
                            <input {...register('weight',{ required: true })} className="form-control" placeholder="Weight" type="number" />
                            {errors.weight && <span className="text-danger">This field is required</span>}
                        </div>
                    </div>

                    <div className="form-group p-2 pt-3 text-right d-flex justify-content-end">
                        <button type="submit" className="btn btn-brand">Send</button>
                    </div>
                </form>

      </Modal>
       
      </div>      
    );
};




export default AppointmentForm;