import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
const PlacesFormPage = () => {
  const { id } = useParams();
  console.log(id);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/places/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);
  function inputHeader(text) {
    return <h2 className="text-2xl mt-4 text-left font-bold">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm text-left font-bold">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }
  async function savePlace(e) {
    e.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };
    if (id) {
      await axios.put("/places", {
        id,
        ...placeData,
      });
      setRedirect(true);
    } else {
      await axios.post("/places", placeData);
      alert("Place successfully added");
      setRedirect(true);
    }
    //console.log(responseData);
  }
  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }
  return (
    <div>
      <div>
        <AccountNav />
        <form onSubmit={savePlace}>
          {/**title of place */}
          {preInput(
            "Title",
            "Title for your place. should be short and catchy as in advertisement"
          )}
          <input
            type="text"
            placeholder="title;for example:-my lovely apartment"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          {/**address of place */}
          {preInput("Address", "Address to this place")}
          <input
            type="text"
            placeholder="address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />

          {/**space to add photos of place */}
          {preInput("Photos", "MORE=BETTER")}
          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

          {/**description of place */}
          {preInput("Description", "description of the place")}
          <textarea
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />

          {/**perks of place */}
          {preInput("Perks", "select all the perks of your place")}
          <div className="grid mt-2 gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <Perks selected={perks} onChange={setPerks} />
          </div>
          {/**extra info of place*/}
          {preInput("Extra info", "house rules, etc")}
          <textarea
            value={extraInfo}
            onChange={(e) => {
              setExtraInfo(e.target.value);
            }}
          />

          {/**check in&out times and max guests of place*/}
          {preInput(
            "Check in&out times",
            "add check in and out times, remember to have some time window for cleaning the room between guests"
          )}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2">
            <div>
              <h3 className="mt-2 -mb-1 font-bold text-left">Check-in time</h3>
              <input
                type="text"
                placeholder="14:00"
                value={checkIn}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                }}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1 font-bold text-left">Check-out time</h3>
              <input
                type="text"
                placeholder="16:00"
                value={checkOut}
                onChange={(e) => {
                  setCheckOut(e.target.value);
                }}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1 font-bold text-left">
                Maximum number of guests
              </h3>
              <input
                type="number"
                value={maxGuests}
                onChange={(e) => {
                  setMaxGuests(e.target.value);
                }}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1 font-bold text-left">
                Price per night
              </h3>
              <input
                type="number"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
          </div>

          <button className="primary my-4">Save</button>
        </form>
      </div>
    </div>
  );
};

export default PlacesFormPage;
