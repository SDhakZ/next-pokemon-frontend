import React from "react";

// This component will run on the server and fetch the data before rendering
export default async function Home() {
  // Fetch data directly from the API on the server side
  const response = await fetch("http://localhost:3000/api/pokemons", {
    cache: "no-store", // Disable caching to fetch fresh data every time (SSR-like behavior)
  });
  const pokemons = await response.json();

  const getBackgroundColor = (type) => {
    switch (type) {
      case "Grass":
        return "bg-green-500 text-white";
      case "Fire":
        return "bg-orange-500 text-white";
      case "Flying":
        return "bg-blue-400 text-white";
      case "Water":
        return "bg-blue-500 text-white";
      case "Ground":
        return "bg-yellow-700 text-white";
      case "Bug":
        return "bg-green-800 text-white";
      case "Poison":
        return "bg-purple-500 text-white";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div className="container-margin">
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="mt-10 text-2xl font-semibold text-center">
          Pokemons List
        </h1>
        <ul className="flex flex-wrap items-center justify-center w-full gap-4 mt-10">
          {pokemons.map((pokemon) => (
            <li key={pokemon.id}>
              <a
                href={`/pokemon/${pokemon.id}`}
                className="w-full group items-center flex justify-center px-10 py-2 flex-col gap-3 max-w-[300px]"
              >
                <div className="w-full p-4 overflow-hidden bg-gray-300 rounded-md max-w-36">
                  <img
                    className="w-full transition-transform group-hover:scale-110"
                    src={pokemon.image.hires}
                    alt={pokemon.name.english}
                  />
                </div>
                <p className="text-xl font-medium text-gray-800">
                  {pokemon.name.english}
                </p>
                <div className="flex gap-2">
                  {pokemon.type.map((type) => (
                    <span
                      key={type}
                      className={`px-2 py-1 rounded-md ${getBackgroundColor(
                        type
                      )}`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
