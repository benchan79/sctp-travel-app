import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ItineraryService from "../api/ItineraryControllerAPI";

function AddAccommodationModal({ show, handleClose, fetchData, handleAddAccommodation, itineraryItemId }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('0');

  const handleSubmit = (e) => { 
    e.preventDefault();
    const addAccommodation = {
        name: name,
        description: description,
        image: image,
        price: price
      };
  
      console.log(addAccommodation);

      ItineraryService.addAccommodationItem(itineraryItemId, addAccommodation)
      .then(response => {
        fetchData();
        handleClose();
        handleAddAccommodation(response.data); // Pass the newly added destination to handleAddDestination
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
                <input type="text" required className="form-control" placeholder="Name of trip" onChange={(e) => setName(e.target.value)} />
                <label>Accommodation Name</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" required className="form-control" placeholder="Description of Accommodation" onChange={(e) => setDescription(e.target.value)} />
                <label>Description</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" required className="form-control" placeholder="Image URL" onChange={(e) => setImage(e.target.value)} />
                <label>Image URL</label>
              </div>
              <div className="form-floating mb-3">
                <input type="number" required className="form-control" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
                <label>Price</label>
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