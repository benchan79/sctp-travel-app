import { Button, Card } from "react-bootstrap";
import { useState } from "react";
import itineraryService from "../api/ItineraryControllerAPI";

import AddDestinationModal from "./AddDestinationModal";

function ItemCard({ item, altText, itemType, itineraryItemId, itineraryId, date, fetchData }) {

  const [showButtons, setShowButtons] = useState(false);
  const [type, setType] = useState(itemType);

  const [showCreate, setShowCreate] = useState(false);

  function handleMouseEnter() {
    setShowButtons(true);
  }

  function handleMouseLeave() {
    setShowButtons(false);
  }
  

  const deleteItineraryItem = async () => {
    try {
      switch (itemType) {
        case "destination":
          await itineraryService.deleteDestinationItem(itineraryItemId);
          break;
        case "accommodation":
          await itineraryService.deleteAccommodationItem(itineraryItemId);
          break;
        case "transport":
          await itineraryService.deleteTransportItem(itineraryItemId);
          break;
        default:
          break;
      }
      setType(undefined);
      console.log(itineraryItemId);
    } catch (error) {
      console.log(error);
    }
  };
  
  function editItineraryItem() {
    console.log("edit");
  }

  const handleClose = (update) => {
    if (update) {
      fetchData();
    }
    setShowCreate(false);
  };

  const handleShow = () => setShowCreate(true);

  return (
    <Card className="shadow border h-100 m-1">
      {item == null || typeof item === 'undefined' || typeof type === 'undefined' ? (
        <div className="h-100" >
          <div className="h-100 container d-flex rounded justify-content-center align-items-center border border-primary" onClick={handleShow}>
            <div className="align-items-center text-center ">
              {altText}
              <h2 className="bi bi-plus-lg"></h2>
            </div>
          </div>
          {itemType === "destination" && (
            <AddDestinationModal 
              show={showCreate}
              handleClose={handleClose}
              handleShow={handleShow}
              itineraryId={itineraryId}
              date={date}
              fetchData={fetchData}
            />
          )}  
        </div>

      ) : (
        <div
          className="w-100 h-100"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Card.Img
            src={item?.image}
            alt="Card image"
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
          />
          <Card.ImgOverlay className="h-25 bg-light opacity-75 m-2">
            <div className="d-flex justify-content-between align-items-start">
              <em className="fw-semibold col">{item?.name}</em>
              <small className="fw-light">${item?.price}</small>
            </div>
            <p>
              <small>{item?.description}</small>
            </p>
          </Card.ImgOverlay>
          {showButtons && (
            <div className="position-absolute bottom-0 end-0 m-2 d-flex justify-content-end align-items-center w-100">
              <button 
                className="btn-primary rounded-circle bi-pencil-fill"
                style={{ height: "3rem", width: "3rem" }}
                onClick={editItineraryItem}
              />
              <button 
                className="btn-danger rounded-circle bi-trash3-fill"
                style={{ height: "3rem", width: "3rem" }}
                onClick={() => deleteItineraryItem(type)}
              />
            </div>
          )}
        </div>
      )}
    </Card>
  );
}


export default ItemCard;