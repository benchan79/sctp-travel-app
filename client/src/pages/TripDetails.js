import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import adminLayout from "../hoc/adminLayout";
import DailyItinerary from "../components/DailyItinerary";
import ItineraryService from "../api/ItineraryControllerAPI";

function TripDetails() {
  const { index } = useParams();
  const [itineraryItemList, setDestinationList] = useState([]);
  const [itinerary, setItinerary] = useState({});
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [accommodationOptions, setAccommodationOptions] = useState([]);
  const [transportOptions, setTransportOptions] = useState([]);

  const onAddDestination = (dayNumber, destinations) => {};

  const fetchData = async () => {
    const destinations = await ItineraryService.getItineraryItems(index);
    const itinerary = await ItineraryService.getItinerary(index);
    setItinerary(itinerary);
    setDestinationList(destinations);

    const destinationOptions = await ItineraryService.getAllDestinations();
    setDestinationOptions(destinationOptions);

    const accommodationOptions = await ItineraryService.getAllAccommodations();
    setAccommodationOptions(accommodationOptions);

    const transportOptions = await ItineraryService.getAllTransports();
    setTransportOptions(transportOptions);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = async () => {
    const destinations = await ItineraryService.getItineraryItems(index);
    fetchData();
  };

  const days = [];
  const start = new Date(itinerary.startDate);
  const end = new Date(itinerary.endDate);

  const formattedStartDate = new Date(start).toLocaleDateString("en-UK", {
    day: "2-digit",
    month: "short",
  });
  const formattedEndDate = new Date(end).toLocaleDateString("en-UK", {
    day: "2-digit",
    month: "short",
  });
  const dayCount = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  for (let i = 1; i <= dayCount; i++) {
    days.push({
      dayNumber: i,
      itineraryItem: itineraryItemList[i - 1],
      date: addDays(start, i - 1),
      itineraryId: index
    });
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-">
            <div className="row align-items-center">
              <div className="col-sm">
                <h1 className="font-weight-bold">{itinerary.name}</h1>
              </div>
              <div className="col-sm text-right">
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={handleClick}
                >
                  <h1>
                    <i className="bi bi-pencil-square"></i>
                  </h1>
                </button>
              </div>
            </div>
            <p>{itinerary.description}</p>
            <p>
              {formattedStartDate} to {formattedEndDate}
            </p>
            <div>
              {days.map((day) => (
                <DailyItinerary
                  dayNumber={day?.dayNumber}
                  key={day?.dayNumber}
                  {...day?.itineraryItem}
                  date={day?.date}
                  itineraryId={day?.itineraryId}
                  fetchData={fetchData}
                  destinationOptions={destinationOptions}
                  accommodationOptions={accommodationOptions}
                  transportOptions={transportOptions}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default adminLayout(TripDetails);
