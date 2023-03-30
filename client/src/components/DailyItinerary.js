import { Card, Button, CardGroup } from "react-bootstrap";
import { useState } from "react";
import ItemCard from "./ItemCard";

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
  fetchData
}) {
  console.log(destination);
  console.log(`date: ${date}`);
  console.log(`itineraryId: ${itineraryId}`);
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
  return (
    <Card className="mb-3 border rounded">
      <Card.Header>Day {dayNumber} </Card.Header>
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
            />
          </div>
          <div className="w-50">
            <CardGroup className="h-100">
              <ItemCard item={accommodation} altText="Add accommodation" itemType="accommodation" itineraryItemId={id}/>
              <ItemCard item={transport} altText="Add transport" itemType="transport" itineraryItemId={id}/>
            </CardGroup>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
export default DailyItinerary;
