import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ItineraryService from "../api/ItineraryControllerAPI";
import Select from "react-select";

function AddTransportModal({ show, handleClose, fetchData, handleAddTransport, itineraryItemId, transportOptions, date }) {

  const [transportId, setTransportId] = useState('');

  const handleSubmit = (e) => { 
    e.preventDefault();

    const addTransport = {
      transport: {"id": transportId},
      startDate: date,
      endDate: date
      };
  
      console.log(addTransport);

      ItineraryService.updateItineraryItem(itineraryItemId, addTransport)
      .then(() => {
        fetchData();
        handleClose();
      })
      .catch(error => {
        console.log(error);
      })
    handleClose();    
  };

  return (
    <>
      <div className="row mx-auto">

        <Modal centered show={show} onHide={handleClose}>
          
          <Modal.Header closeButton>
            <Modal.Title>Add Transport</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form onSubmit={handleSubmit}>

              <div className="form-floating mb-3">
                  <Select
                    required
                    className=""
                    options={transportOptions}
                    placeholder="Transport"
                    noOptionsMessage={() => "No results"}
                    onChange={(selectedOption) => 
                      setTransportId(selectedOption.value)}
                  />
                </div>
 
              <button className="btn btn-primary text-white w-100" type="submit">
                Add new transport
              </button>

            </form>
        </Modal.Body>
      </Modal>
     </div>
   </>
  );
}
export default AddTransportModal;  