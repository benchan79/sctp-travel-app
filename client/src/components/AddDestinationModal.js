import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import ItineraryService from "../api/ItineraryControllerAPI";

function AddDestinationModal({ show, handleClose, fetchData }) {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDestination = {
      name: name,
      city: city,
      country: country,
      description: description,
      image: image
    };

    console.log(newDestination);


  }

  return (
    <>
      <div className="row mx-auto">
        <Modal centered show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Destination</Modal.Title>
          </Modal.Header>
            <form onSubmit={handleSubmit}>

              <div className="form-floating mb-3">
                <input type="text" required className="form-control" placeholder="Name of destination" onChange={(e) => setName(e.target.value)} />
                <label>Name of destination</label>
              </div>


            </form>
          <Modal.Body>

          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default AddDestinationModal;