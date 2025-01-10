import PokemonCard from "../components/PokemonCard"
import { useEffect } from "react"
import { useAppStore } from "../stores/useAppStore"

export default function IndexPage() {
    const fetchPokemons = useAppStore((state) => state.fetchPokemons)
    const pokemons = useAppStore((state) => state.pokemonDetails)

    useEffect(() => {
        fetchPokemons()
    }, [])

    return (
        <>
          <h1 className="text-6xl font-extrabold text-yellow-500">Pokedex</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 my-10 gap-10">
            {pokemons.map( (pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                />
            ))}
          </div>
        </>
    )
}