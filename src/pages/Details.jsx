import { useQuery } from "@tanstack/react-query";
import { useState, useContext, lazy } from "react";
import { useParams, useNavigate } from "react-router";
import Carousel from "../components/Carousel";
import Loader from "../components/Loader";
import usePet from "../hooks/usePet";
import AdoptedPetContext from "../contexts/AdoptedPetContext";

// import Modal from "../components/Modal";

// Import as lazy loading
const Modal = lazy(() => import("../components/Modal"));

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [, setAdoptedPet] = useContext(AdoptedPetContext);

  let petQuery = usePet(id);
  let pet = petQuery?.data?.pets[0];

  return (
    <div className="details">
      {petQuery.isLoading && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
      {petQuery.isError && <h3>{petQuery.error.message}</h3>}
      {petQuery.data && (
        <div>
          <h1>{pet.name}</h1>
          <Carousel images={pet.images} />
          <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
          <button onClick={() => setShowModal(true)}>Adopt {pet.name}</button>
          <p>{pet.description}</p>
        </div>
      )}

      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </button>
      {showModal && (
        <Modal>
          <div>
            <h1>Adopt {pet.name}</h1>
            <div className="buttons">
              <button
                onClick={() => {
                  setAdoptedPet(pet);
                  navigate("/");
                }}
              >
                Yes
              </button>
              <button onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Details;
