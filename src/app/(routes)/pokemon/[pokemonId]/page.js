import React from "react";

// This component will run on the server and fetch the data before rendering
export default async function PokemonPage({ params }) {
  const { pokemonId } = params; // Get the dynamic pokemonId from params

  // Fetch data directly from the API on the server side
  const response = await fetch(
    `http://localhost:3000/api/pokemons/${pokemonId}`,
    {
      cache: "no-store", // Disable caching to fetch fresh data every time (SSR-like behavior)
    }
  );
  const pokemon = await response.json();

  return (
    <div className="flex justify-center padding-y">
      <a className="mt-5 font-medium text-blue-600" href="/">
        &lt; Go back
      </a>
      <div className="w-full mt-20 max-w-[800px]">
        <div className="flex justify-center w-full mt-10 gap-9">
          <div className="w-full p-4 overflow-hidden bg-gray-300 rounded-md max-w-[300px]">
            <img
              className="w-full transition-transform group-hover:scale-110"
              src={pokemon.image.hires}
              alt={pokemon.name.english}
            />
          </div>
          <div className="flex flex-col w-full gap-3 ">
            <h1 className="text-2xl font-semibold ">{pokemon.name.english}</h1>
            <p className="font-medium text-gray-600">{pokemon.description}</p>
            <div className="mt-4">
              <ul className="grid grid-cols-2 gap-4 py-6 bg-blue-400 rounded-lg px-7">
                <li className="flex flex-col gap-1 font-medium">
                  <span className="font-medium text-white">Height</span>
                  {pokemon.profile.height}
                </li>
                <li className="flex flex-col gap-1 font-medium">
                  <span className="font-medium text-white">Weight</span>
                  {pokemon.profile.weight}
                </li>
                <li className="flex flex-col gap-1 font-medium">
                  <span className="font-medium text-white">Egg</span>
                  {pokemon.profile.egg.join(", ")}
                </li>
                <li className="flex flex-col gap-1 font-medium">
                  <span className="font-medium text-white">Species</span>
                  {pokemon.species}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full gap-10 p-10 mt-10">
          {pokemon.evolutions.map((evolution, index) => (
            <React.Fragment key={evolution.id}>
              <a
                href={`/pokemon/${evolution.id}`}
                className="flex flex-col items-center gap-2"
              >
                <img
                  className="w-[170px]"
                  src={evolution.image.hires}
                  alt={evolution.name.english}
                />
                <p className="font-medium">{evolution.name.english}</p>
              </a>
              {index < pokemon.evolutions.length - 1 && <span>➡️</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
