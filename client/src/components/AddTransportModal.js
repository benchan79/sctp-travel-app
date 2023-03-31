import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ItineraryService from "../api/ItineraryControllerAPI";

function AddTransportModal({ show, handleClose, fetchData, handleAddTransport, itineraryItemId }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('0');

  const handleSubmit = (e) => { 
    e.preventDefault();
    const addTransport = {
        name: name,
        description: description,
        image: image,
        price: price
      };
  
      console.log(addTransport);

      ItineraryService.addTransportItem(itineraryItemId, addTransport)
      .then(response => {
        fetchData();
        handleClose();
        handleAddTransport(response.data); // Pass the newly added transport to handleAddTransport
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
                <input type="text" required className="form-control" placeholder="Name of transport" onChange={(e) => setName(e.target.value)} />
                <label>Transport Name</label>
              </div>
              <div className="form-floating mb-3">
                <input type="text" required className="form-control" placeholder="Description of Transport" onChange={(e) => setDescription(e.target.value)} />
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