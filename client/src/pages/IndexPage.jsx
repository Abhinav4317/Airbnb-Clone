import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((response) => {
      //console.log("Response Data:", response.data); // Log response data to verify
      setPlaces([...response.data, ...response.data, ...response.data]);
    });
  }, []);

  return (
    <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {places.length > 0 &&
        places.map((place) => {
          return (
            <Link to={"/place/" + place._id} key={place.id}>
              <div className="mb-2 bg-gray-300 rounded-2xl flex">
                {place.photos?.[0] && (
                  <img
                    className="rounded-2xl object-cover aspect-square"
                    src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                    alt=""
                  />
                )}
              </div>
              <h2 className="font-bold truncate">{place.title}</h2>
              <h3 className="text-gray-500">{place.address}</h3>
              <div className="mt-1">
                <span className="font-bold">Rs.{place.price}</span> per night
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default IndexPage;
