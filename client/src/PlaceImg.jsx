const PlaceImg = ({ place, index = 0, className = null }) => {
  if (!place.photos?.length) {
    return null;
  }
  if (!className) {
    className = "object-cover";
  }
  return (
    place.photos?.length > 0 && (
      <img
        className={className}
        src={"http://localhost:4000/uploads/" + place.photos[index]}
        alt={"http://localhost:4000/uploads/" + place.photos[index]}
      />
    )
  );
};

export default PlaceImg;
