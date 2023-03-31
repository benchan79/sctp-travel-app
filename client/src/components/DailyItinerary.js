import { Card, Button, CardGroup } from "react-bootstrap";
import { useState } from "react";
import ItemCard from "./ItemCard";
import AddDestinationModal from "./AddDestinationModal";
import AddAccommodationModal from "./AddAccommodationModal";
import AddTransportModal from "./AddTransportModal";

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

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showAdd, setShowAdd] = useState(false);

  const [showDestinationModal, setShowDestinationModal] = useState(false);
  const [showAccommodationModal, setShowAccommodationModal] = useState(false);
  const [showTransportModal, setShowTransportModal] = useState(false);

  const handleShowDestinationModal = () => setShowDestinationModal(true);
  const handleCloseDestinationModal = () => {
    fetchData();
    setShowDestinationModal(false)
  };

  const handleCloseAccommodationModal = () => setShowAccommodationModal(false);
  const handleShowAccommodationModal = () => setShowAccommodationModal(true);

  const handleCloseTransportModal = () => setShowTransportModal(false);
  const handleShowTransportModal = () => setShowTransportModal(true);


  return (
    <Card className="mb-3 border rounded">
      <Card.Header> Day {dayNumber}  </Card.Header>
      <Card.Header> ({name} - {description}) </Card.Header>
      <Card.Body>
        <div className="d-flex" style={{ height: "18rem" }}>
          <div className="w-50 h-100 ">
            <ItemCard 
              item={destination} 
              altText="Add destination" 
              itemType="destination" 
              itineraryItemId={id}
              itineraryId={itineraryId}
              date={date}
              fetchData={fetchData}
              index={dayNumber}
              handleAdd={handleShowDestinationModal} // set show modal to true
            />
            <AddDestinationModal
              show={showDestinationModal} // show = true or false
              handleClose={handleCloseDestinationModal} 
              handleShow={handleShowDestinationModal} 
              fetchData={fetchData}
              itineraryItemId={id}
              destinationOptions={destinationOptions}
            />
          </div>
          <div className="w-50">
            <CardGroup className="h-100">
              <ItemCard 
                item={accommodation} 
                altText="Add accommodation" 
                itemType="accommodation" 
                itineraryItemId={id}
                itineraryId={itineraryId}
                date={date}
                fetchData={fetchData}

              />
              <ItemCard 
                item={transport} 
                altText="Add transport" 
                itemType="transport" 
                itineraryItemId={id}
                itineraryId={itineraryId}
                date={date}
                fetchData={fetchData}
              />
            </CardGroup>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
export default DailyItinerary;
