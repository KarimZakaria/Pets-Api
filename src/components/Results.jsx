import Pet from "./Pet";

const Results = ({ pets }) => {
  // throw new Error("");
  return (
    <div className="search">
      {!pets.length ? (
        <h2>Search Doesn't Match Any Record</h2>
      ) : (
        pets.map((pet) => (
          <Pet
            key={pet.id}
            id={pet.id}
            name={pet.name}
            animal={pet.animal}
            breed={pet.breed}
            images={pet.images}
            location={`${pet.city}, ${pet.state}`}
            // description={pet.description}
          />
        ))
      )}
    </div>
  );
};

export default Results;
