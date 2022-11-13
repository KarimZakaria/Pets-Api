import { useContext, useEffect, useState } from "react";
import useBreedList from "../hooks/useBreedList";
import Results from "../components/Results";
import usePetsSearch from "../hooks/usePetsSearch";
import ErrorBoundary from "../components/ErrorBoundary";
import AdoptedPetContext from "../contexts/AdoptedPetContext";

const ANIMALS = ["dog", "bird", "cat", "reptile", "rabbit"];

// Pet Component
const Search = () => {
  const [search, setSearch] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [adoptedPet] = useContext(AdoptedPetContext);

  // Get Breeds Dependent on Animal Selection
  const breedsQuery = useBreedList(search.animal);
  const breeds = breedsQuery?.data?.breeds ?? [];

  const petsQuery = usePetsSearch(search);
  const pets = petsQuery?.data?.pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formDate = new FormData(e.target);
          const animal = formDate.get("animal");
          const location = formDate.get("location");
          const breed = formDate.get("breed");
          setSearch({ animal, location, breed });
        }}
      >
        {adoptedPet && (
          <div className="pet">
            <h4>{adoptedPet.name}</h4>
            <div className="image-container">
              <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
            </div>
          </div>
        )}
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            placeholder="location"
            name="location"
          />
        </label>

        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            onChange={(e) => {
              setSearch({
                ...search,
                animal: e.target.value,
                breed: "",
              });
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option value={animal} key={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="breed">
          Breed
          <select id="breed" disabled={!breeds.length} name="breed">
            <option />
            {breeds.map((breed) => (
              <option value={breed} key={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>

        <button>Search</button>
      </form>

      <ErrorBoundary>
        <Results pets={pets} />
      </ErrorBoundary>
    </div>
  );
};

//export File to be Reusable outside as Default Export
export default Search;
