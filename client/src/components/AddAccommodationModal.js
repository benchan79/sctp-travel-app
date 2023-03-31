import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ItineraryService from "../api/ItineraryControllerAPI";
import Select from "react-select";

function AddAccommodationModal({ show, handleClose, fetchData, handleAddAccommodation, itineraryItemId, accommodationOptions, date }) {

  const [accommodationId, setAccommodationId] = useState('');

  const handleSubmit = (e) => { 
    e.preventDefault();

    const addAccommodation = {
      accommodation: {"id": accommodationId},
      startDate: date,
      endDate: date
    };
  
    console.log(addAccommodation);

    ItineraryService.updateItineraryItem(itineraryItemId, addAccommodation)
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
            <Modal.Title>Add Accommodation</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form onSubmit={handleSubmit}>

              <div className="form-floating mb-3">
                <Select
                  required
                  className=""
                  options={accommodationOptions}
                  placeholder="Accommodation"
                  noOptionsMessage={() => "No results"}
                  onChange={(selectedOption) => 
                    setAccommodationId(selectedOption.value)}
                />
              </div>

              <button className="btn btn-primary text-white w-100" type="submit">
                Add new accommodation
              </button>
            </form>
        </Modal.Body>
      </Modal>
     </div>
   </>
  );
}
export default AddAccommodationModal;