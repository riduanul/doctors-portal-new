import React from 'react'

const ConfirmationModal = ({title, message, closeModal, modalData, successAction, successButtonName}) => {
 console.log(modalData)
    return (
    <div> 
        <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
        <div className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg text-red-400">{title}</h3>
            <p className="py-4">{message}</p>
            <div className="modal-action">
            <label onClick={()=>successAction(modalData)} htmlFor="confirmation-modal" className="btn btn-outline btn-error">{successButtonName}</label>
            <button onClick={closeModal} className='btn btn-outline btn-success'>Cencel</button>
            </div>
        </div>
        </div>
    </div>
  )
}

export default ConfirmationModal