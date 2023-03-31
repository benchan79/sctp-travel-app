import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ItineraryService from "../api/ItineraryControllerAPI";
import Select from "react-select";

function AddItineraryItemModal({
  show,
  handleClose,
  fetchData,
  itineraryItemId,
  itineraryId,
  destinationOptions,
  accommodationOptions,
  transportOptions,
  date,
}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [destinationId, setDestinationId] = useState("");
  const [accommodationId, setAccommodatioId] = useState("");
  const [transportId, setTransportId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const addItineraryItem = {
      name: name,
      description: description,
      transport: { id: transportId },
      accommodation: { id: accommodationId },
      destination: { id: destinationId },
      startDate: date,
      endDate: date,
      notes: "test"
    };

    console.log(addItineraryItem);

    ItineraryService.addItineraryItem(itineraryId, addItineraryItem)
      .then(() => {
        fetchData();
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
    handleClose();
  };

  return (
    <>
      <div className="row mx-auto">
        <Modal centered show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Itinerary Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>

              <div className="form-floating mb-3">
                <input type="text" required className="form-control" placeholder="Name of itinerary" onChange={(e) => setName(e.target.value)} />
                <label>Name of Itinerary</label>
              </div>

              <div className="form-floating mb-3">
                <input type="text" required className="form-control" placeholder="Description of Itinerary" onChange={(e) => setDescription(e.target.value)} />
                <label>Description of Itinerary</label>
              </div>

              <div className="form-floating mb-3">
                <Select
                  required
                  className=""
                  options={destinationOptions}
                  placeholder="Destination"
                  noOptionsMessage={() => "No results"}
                  onChange={(selectedOption) =>
                    setDestinationId(selectedOption.value)
                  }
                />
              </div>

              <div className="form-floating mb-3">
                <Select
                  required
                  className=""
                  options={accommodationOptions}
                  placeholder="Accommodation"
                  noOptionsMessage={() => "No results"}
                  onChange={(selectedOption) =>
                    setAccommodatioId(selectedOption.value)
                  }
                />
              </div>

              <div className="form-floating mb-3">
                <Select
                  required
                  className=""
                  options={transportOptions}
                  placeholder="Transport"
                  noOptionsMessage={() => "No results"}
                  onChange={(selectedOption) =>
                    setTransportId(selectedOption.value)
                  }
                />
              </div>

              <button
                className="btn btn-primary text-white w-100"
                type="submit"
              >
                Add new Itinerary Item
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
export default AddItineraryItemModal;
