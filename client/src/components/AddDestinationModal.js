import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ItineraryService from "../api/ItineraryControllerAPI";
import Select from "react-select";


function AddDestinationModal({ show, handleClose, fetchData, itineraryItemId, destinationOptions, date }) {

  const [destinationId, setDestinationId] = useState('');

  const handleSubmit = (e) => { 
    e.preventDefault();

    const addDestination = {
      destination: {"id": destinationId},
      startDate: date,
      endDate: date
    };
  
    console.log(addDestination);
  
    ItineraryService.updateItineraryItem(itineraryItemId, addDestination)
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
            <Modal.Title>Add Destination</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>

              <div className="form-floating mb-3">
                <Select
                  required
                  className=""
                  options={destinationOptions}
                  placeholder="Destination"
                  noOptionsMessage={() => "No results"}
                  onChange={(selectedOption) => 
                    setDestinationId(selectedOption.value)}
                />
              </div>

              <button className="btn btn-primary text-white w-100" type="submit">
                Add new destination
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
export default AddDestinationModal;
