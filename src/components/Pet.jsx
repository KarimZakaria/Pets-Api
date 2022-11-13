import { Link } from "react-router-dom";

// Pet Component
const Pet = (props) => {
  const { name, animal, breed, images, location, id } = props;

  let src = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    src = images[0];
  }
  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={src} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} — ${breed} — ${location}`}</h2>
      </div>
    </Link>
  );
};

//export File to be Reusable outside as Default Export
export default Pet;
