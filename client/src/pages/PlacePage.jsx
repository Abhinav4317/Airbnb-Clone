import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  useEffect(() => {
    if (!id) return;
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);
  if (!place) return "";

  return (
    <div className="mt-4 bg-gray-100 mt-8 -mx-8 px-8 pt-8 pb-4">
      <h1 className="text-3xl">{place?.title}</h1>
      <AddressLink place={place} />
      <PlaceGallery place={place} />
      <hr className="m-2 border-black shadow" />
      <div className="my-8 grid gap-8 grid-cols-1 md:grid-cols-2">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl underline">Description</h2>
            {place.description}
          </div>
          <span className="font-bold">Check-in Time: </span>
          {place.checkIn}
          <br />
          <span className="font-bold">Check-out Time: </span>
          {place.checkOut}
          <br />
          <span className="font-bold">Maximum number of guests: </span>
          {place.maxGuests}
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white px-8 py-8 rounded-2xl border-t">
        <h2 className="mt-2 font-semibold text-2xl underline">
          Relevant Information to Note:
        </h2>
        <div className="mb-4 text-gray-700 mt-2 text-sm leading-4">
          {place.extraInfo}
        </div>
      </div>
    </div>
  );
};

export default PlacePage;
