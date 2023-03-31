import { Card, Button, CardGroup } from "react-bootstrap";
import { useState } from "react";
import ItemCard from "./ItemCard";
import AddDestinationModal from "./AddDestinationModal";
import AddAccommodationModal from "./AddAccommodationModal";
import AddTransportModal from "./AddTransportModal";
import AddItineraryItemModal from "./AddItineraryItemModal";

function DailyItinerary({
  id,
  dayNumber,
  name,
  description,
  destination,
  accommodation,
  transport,
  date,
  itineraryId,
  fetchData,
  destinationOptions,
  accommodationOptions,
  transportOptions
}) {
  console.log(destination);
  let destItem;
  if (destination != undefined) {
    destItem = {
      id: destination?.id,
      name: destination?.name,
      description: destination?.description,
      image: destination?.image,
      price: accommodation?.price + transport?.price,
    };
  }

  const [showItineraryItemModal, setShowItineraryItemModal] = useState(false);
  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [showAccommodationModal, setShowAccommodationModal] = useState(false);
  const [showTransportModal, setShowTransportModal] = useState(false);

  const handleShowItineraryItemModal = () => setShowItineraryItemModal(true);
  const handleCloseItineraryItemModal = () => {setShowItineraryItemModal(false)};

  const handleShowDestinationModal = () => setShowDestinationModal(true);
  const handleCloseDestinationModal = () => {setShowDestinationModal(false)};

  const handleCloseAccommodationModal = () => setShowAccommodationModal(false);
  const handleShowAccommodationModal = () => setShowAccommodationModal(true);

  const handleCloseTransportModal = () => setShowTransportModal(false);
  const handleShowTransportModal = () => setShowTransportModal(true);

  console.log(`date::: ${date} ${typeof date}`)
  const formattedDate = new Date(date).toLocaleDateString("en-UK", {
    day: "2-digit",
    month: "short",
  });

  return (
    <Card className="mb-3 border rounded">
      <Card.Header>Day {dayNumber}  ({formattedDate})</Card.Header>
      <Card.Header> 
        {id ? `${name} - ${description}` :
        <Button onClick={() => handleShowItineraryItemModal()}>
          <i className="bi bi-plus-lg"></i>
        </Button>
        }
        <AddItineraryItemModal
          show={showItineraryItemModal}
          handleClose={handleCloseItineraryItemModal} 
          handleShow={handleShowItineraryItemModal} 
          fetchData={fetchData}
          itineraryId={itineraryId}
          destinationOptions={destinationOptions}
          accommodationOptions={accommodationOptions}
          transportOptions={transportOptions}
          date={date}
        />
      </Card.Header>

      <Card.Body>
        <div className="d-flex" style={{ height: "18rem" }}>
          <div className="w-50 h-100 ">
            <ItemCard item={destination} altText="Add destination" itemType="destination" itineraryItemId={id} handleAdd={handleShowDestinationModal}/>
            <AddDestinationModal
              show={showDestinationModal}
              handleClose={handleCloseDestinationModal} 
              handleShow={handleShowDestinationModal} 
              fetchData={fetchData}
              itineraryItemId={id}
              destinationOptions={destinationOptions}
              date={date}
            /> 
          </div>
          <div className="w-50">
            <CardGroup className="h-100">
              <ItemCard item={accommodation} altText="Add accommodation" itemType="accommodation" itineraryItemId={id} handleAdd={handleShowAccommodationModal}/>
              <AddAccommodationModal
                show={showAccommodationModal}
                handleClose={handleCloseAccommodationModal} 
                handleShow={handleShowAccommodationModal} 
                fetchData={fetchData}
                itineraryItemId={id}
                accommodationOptions={accommodationOptions}
                date={date}
              />
              <ItemCard item={transport} altText="Add transport" itemType="transport" itineraryItemId={id} handleAdd={handleShowTransportModal}/>
              <AddTransportModal
                show={showTransportModal}
                handleClose={handleCloseTransportModal} 
                handleShow={handleShowTransportModal} 
                fetchData={fetchData}
                itineraryItemId={id}
                transportOptions={transportOptions}
                date={date}
              />
            </CardGroup>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
export default DailyItinerary;
