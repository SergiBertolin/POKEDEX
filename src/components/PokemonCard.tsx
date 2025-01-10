import type { PokemonDetails } from "../types"
import { useAppStore } from "../stores/useAppStore"

type PokemonDetailsProps = {
    pokemon: PokemonDetails
}

export default function PokemonCard({pokemon} : PokemonDetailsProps) {
    const selectPokemon = useAppStore((state) => state.selectPokemon)

    return (
            <div className={`shadow-lg text-center p-5 rounded-3xl border-black border-2 ${
                pokemon.types.length > 1
                    ? `bg-pokemon-${pokemon.types[0].type.name}-${pokemon.types[1].type.name}`
                    : `bg-${pokemon.types[0].type.name}`
                }`}>
                <div className="overflow-hidden">
                    <h1 className="text-4xl truncate font-black uppercase">{pokemon.name}</h1>
                    <img 
                        src={pokemon.sprites.other.home.front_default} 
                        alt={`Imagen de ${pokemon.name}`}
                        className="hover:scale-125 transition-transform hover:rotate-2 p-5"
                    />
                    <div className="">
                        <h2 className="font-semibold text-2xl">Types:</h2>
                        <ul className="flex space-x-2 justify-center mt-4">
                            {pokemon.types.map((tipo) => (
                            <li
                                key={tipo.type.name}
                                className={`capitalize text-white rounded-full w-24 px-2 py-1 text-xl border-black border-2 ${
                                    tipo.type.name === 'grass' ? 'bg-grass' :
                                    tipo.type.name === 'fire' ? 'bg-fire' :
                                    tipo.type.name === 'water' ? 'bg-water' :
                                    tipo.type.name === 'bug' ? 'bg-bug' :
                                    tipo.type.name === 'normal' ? 'bg-normal' :
                                    tipo.type.name === 'poison' ? 'bg-poison' :
                                    tipo.type.name === 'electric' ? 'bg-electric' :
                                    tipo.type.name === 'ground' ? 'bg-ground' :
                                    tipo.type.name === 'fairy' ? 'bg-fairy' :
                                    tipo.type.name === 'fighting' ? 'bg-fighting' :
                                    tipo.type.name === 'psychic' ? 'bg-psychic' :
                                    tipo.type.name === 'dragon' ? 'bg-dragon' :
                                    tipo.type.name === 'flying' ? 'bg-flying' :
                                    tipo.type.name === 'rock' ? 'bg-rock' :
                                    tipo.type.name === 'steel' ? 'bg-steel' :
                                    tipo.type.name === 'ice' ? 'bg-ice' :
                                    tipo.type.name === 'ghost' ? 'bg-ghost' :
                                    'bg-gray-300' // Por defecto, si el tipo no está especificado
                                  }`}
                            >
                                {tipo.type.name}
                            </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div>
                    <div className="mt-4 rounded-lg">
                        <h2 className="font-semibold text-2xl">Stats:</h2>
                        <div className="flex justify-between items-end mt-10 h-48">
                            {pokemon.stats.map((stat) => (
                                <div key={stat.stat.name} className="flex flex-col items-center w-full">
                                    <div
                                        className="bg-black w-4 rounded-t-md"
                                        style={{ height: `${stat.base_stat}px` }}
                                    />
                                    <p className="text-xs mt-3 max-h-5">{stat.stat.name}</p>
                                    <p className="text-xs text-black mt-4">{stat.base_stat}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    className="bg-black hover:bg-slate-800 mt-5 w-full p-3 font-bold text-white text-lg uppercase rounded-xl"
                    onClick={() => selectPokemon(pokemon.id)}
                >pokemon viewer</button>
            </div>
    )
}