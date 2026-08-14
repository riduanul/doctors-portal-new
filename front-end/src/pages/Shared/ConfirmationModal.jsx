import React from 'react'

const ConfirmationModal = ({title, message, closeModal, modalData, successAction, successButtonName}) => {
    return (
    <> 
        <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
        <div className="modal">
          <div className="premium-modal">
              <h3 className="premium-modal-title text-red-500">{title}</h3>
              <p className="premium-modal-message">{message}</p>
              <div className="premium-modal-actions">
                <button onClick={closeModal} className='btn-action btn-action-outline'>Cancel</button>
                <label onClick={()=>successAction(modalData)} htmlFor="confirmation-modal" className="btn-action btn-action-danger cursor-pointer">{successButtonName}</label>
              </div>
          </div>
        </div>
    </>
  )
}

export default ConfirmationModal