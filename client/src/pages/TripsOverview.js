import React, { useState, useEffect } from "react";
import CreateTripModal from "../components/CreateTripModal";
import TripList from "../components/TripList";
import adminLayout from "../hoc/adminLayout";
import Button from "react-bootstrap/esm/Button";
import DeleteTripModal from "../components/DeleteTripModal";
import EditTripModal from "../components/EditTripModal";
import ItineraryService from "../api/ItineraryControllerAPI";

function TripsOverview() {
  const [tripList, setTripList] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [tripToEdit, setTripToEdit] = useState(null);
  const [tripToDelete, setTripToDelete] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const fetchData = async () => {
    const itineraries = await ItineraryService.getAllItineraries();
    const trips = itineraries.map((itinerary) => ({
      name: itinerary.name,
      country: itinerary.description,
      budget: itinerary.budget,
      startDate: itinerary.startDate,
      endDate: itinerary.endDate,
      id: itinerary.id,
    }));
    setTripList(trips);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (index) => {
    setTripToEdit(tripList[index]);
    setShowEdit(true);
  };

  const handleDelete = (index) => {
    setTripToDelete(tripList[index]);

    setShowDelete(true);
  };

  const handleEditClose = (updatedItinerary) => {
    if (updatedItinerary) {
      console.log(updatedItinerary);
      ItineraryService.updateItinerary(updatedItinerary.id, updatedItinerary)
        .then(() => {
          fetchData();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setShowEdit(false);
    setTripToEdit(null);
  };

  const handleDeleteClose = (deleteConfirmed) => {
    if (deleteConfirmed) {
      ItineraryService.deleteItinerary(tripToDelete.id)
        .then(() => {
          fetchData();
        })
        .catch((error) => {
          console.log(error);
        });
    }
    setShowDelete(false);
    setTripToDelete(null);
  };

  const handleClose = (update) => {
    if (update) {
      fetchData();
    }
    setShowCreate(false);
  };

  const handleShow = () => setShowCreate(true);

  return (
    <>
      <div className="container">
        <div className="row text-center p-5">
          <h1>My Trips</h1>
        </div>
        <div className="row">
          {tripList.length == 0 ? (
            <h3 className="text-center mb-3">
              You have no trips planned, create one below!
            </h3>
          ) : (
            tripList.map((trip, index) => (
              <TripList
                key={index}
                itinerary={trip}
                index={index}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
              />
            ))
          )}
          {}
        </div>
        <div className="row mx-auto">
          <Button
            className="d-flex and justify-content-center text-white"
            variant="primary"
            size="lg"
            onClick={handleShow}
          >
            Create a new trip +
          </Button>
        </div>
        <CreateTripModal
          show={showCreate}
          handleClose={handleClose}
          handleShow={handleShow}
          fetchData={fetchData}
        />
        {tripToDelete && (
          <DeleteTripModal
            show={showDelete}
            handleDeleteClose={handleDeleteClose}
            trip={tripToDelete}
          />
        )}
        {tripToEdit && (
          <EditTripModal
            show={showEdit}
            handleEditClose={handleEditClose}
            itinerary={tripToEdit}
          />
        )}
      </div>
    </>
  );
}

export default adminLayout(TripsOverview);