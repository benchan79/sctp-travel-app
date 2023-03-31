import axios from "axios";

const itineraryApi = axios.create({
  baseURL: "http://localhost:8080",
});

const itineraryService = {
  async getAllItineraries() {
    const response = await itineraryApi.get("/itineraries");
    return response.data;
  },
  async getUserItinerary(userId) {
    const response = await itineraryApi.get(`/itineraries/users/${userId}`);
    return response.data;
  },
  async getItineraryItems(itineraryId) {
    const response = await itineraryApi.get(
      `/itineraries/${itineraryId}/items`
    );
    return response.data;
  },
  async getItinerary(itineraryId) {
    const response = await itineraryApi.get(`/itineraries/${itineraryId}`);
    return response.data;
  },
  async getItineraryItems(itineraryId) {
    const response = await itineraryApi.get(`/itineraries/${itineraryId}/items`);
    return response.data;
  },
  async getItineraryItem(itineraryId, itineraryItemId) {
    const response = await itineraryApi.get(`/itineraries/${itineraryId}/items/${itineraryItemId}`);
    return response.data;
  },
  async addItinerary(itinerary) {
    const response = await itineraryApi.post('/itineraries', itinerary);
    return response.data;
  },
  async addItineraryItem(itineraryId, itineraryItem) {
    const response = await itineraryApi.post(
      `/itineraries/${itineraryId}`,
      itineraryItem
    );
    return response.data;
  },
  async updateItinerary(itineraryId, itinerary) {
    const response = await itineraryApi.put(
      `/itineraries/${itineraryId}`,
      itinerary
    );
    return response.data;
  },
  async updateItineraryItem(itineraryItemId, itineraryItem) {
    const response = await itineraryApi.put(
      `/itineraries/items/${itineraryItemId}`,
      itineraryItem
    );
    return response.data;
  },
  async deleteItinerary(itineraryId) {
    const response = await itineraryApi.delete(`/itineraries/${itineraryId}`);
    return response.data;
  },
  async deleteItineraryItem(itineraryItemId) {
    const response = await itineraryApi.delete(`/itineraries/items/${itineraryItemId}`);
    return response.data;
  },
  async deleteDestinationItem(itineraryItemId) {
    const response = await itineraryApi.delete(`/itineraries/items/${itineraryItemId}/destination`);
    return response.data;
  },
  async deleteAccommodationItem(itineraryItemId) {
    const response = await itineraryApi.delete(`/itineraries/items/${itineraryItemId}/accommodation`);
    return response.data;
  },
  async deleteTransportItem(itineraryItemId) {
    const response = await itineraryApi.delete(`/itineraries/items/${itineraryItemId}/transport`);
    return response.data;
  },
  async getCountries() {
    let options = [];
    let countries = [];
    try {
      const response = await itineraryApi.get(`/itineraries/countries`);
      response.data.map((country) =>
        countries.push(country.name.common)
      );
      countries.sort();
      countries.map((country) =>
        options.push({
          value: country,
          label: country,
        })
      );
    return options;
    } catch (error) {
      console.log(error.message);
    }
  },
  async getAllDestinations() {
    const response = await itineraryApi.get("/itineraries/destinations");
    let destinationList = [];
    response.data.map((destination) =>
      destinationList.push({
        value: destination.id,
        label: destination.name
      })
    )
    return destinationList;
  },
  async getAllAccommodations() {
    const response = await itineraryApi.get("/itineraries/accommodations");
    let accommodationList = [];
    response.data.map((accommodation) =>
      accommodationList.push({
        value: accommodation.id,
        label: accommodation.name
      })
    )
    return accommodationList;
  },
  async getAllTransports() {
    const response = await itineraryApi.get("/itineraries/transports");
    let transportList = [];
    response.data.map((transport) =>
      transportList.push({
        value: transport.id,
        label: transport.name
      })
    )
    return transportList;
  },
};

export default itineraryService;
