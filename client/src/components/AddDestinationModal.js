import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import ItineraryService from "../api/ItineraryControllerAPI";
import Select from "react-select";

function AddDestinationModal({ show, handleClose, fetchData, itineraryId, date }) {

  const [itineraryItemName, setItineraryItemName] = useState('');
  const [itineraryItemDescription, setItineraryItemDescription] = useState('');
  const [itineraryItemNotes, setItineraryItemNotes] = useState('');
  const [destinationId, setDestinationId] = useState('');

  const [destinations, setDestinations] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newItineraryItem = {
      name: itineraryItemName,
      description: itineraryItemDescription,
      destination: {"id": destinationId},
      startDate: date,
      endDate: date,
      notes: itineraryItemNotes
    }

    console.log(newItineraryItem);
    ItineraryService.addItineraryItem(itineraryId, newItineraryItem)
      .then(() => {
        fetchData();
        handleClose();
      })
      .catch(error => {
        console.log(error)
      })
    handleClose();
  }

  useEffect(() => {
    const fetchDestinationList = async () => {
      const destinations = await ItineraryService.getAllDestinations();
      setDestinations(destinations);
      console.log(destinations);
    }
    fetchDestinationList();
  }, [])


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
                <input type="text" required className="form-control" placeholder="Name of itinerary" onChange={(e) => setItineraryItemName(e.target.value)} />
                <label>Name of Itinerary</label>
              </div>

              <div className="form-floating mb-3">
                <input type="text" required className="form-control" placeholder="Description of Itinerary" onChange={(e) => setItineraryItemDescription(e.target.value)} />
                <label>Description of Itinerary</label>
              </div>

              <div className="form-floating mb-3">
                <Select
                  required
                  className=""
                  options={destinations}
                  placeholder="Destination"
                  noOptionsMessage={() => "No results"}
                  onChange={(selectedOption) => 
                    setDestinationId(selectedOption.value)}
                />
              </div>
              
              <div className="form-floating mb-3">
                <input type="text" required className="form-control" placeholder="Additional notes" onChange={(e) => setItineraryItemNotes(e.target.value)} />
                <label>Additional notes</label>
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