import { useMemo } from "react"
import PokemonCard from "../components/PokemonCard"
import { useAppStore } from "../stores/useAppStore"


export default function FavoritesPage() {
    const favorites = useAppStore((state) => state.favorites)
    const hasFavorites = useMemo(() => favorites.length , [favorites])
    
    return (
        <>
            <h1 className="text-6xl font-extrabold text-yellow-500">Favorites</h1>

            {hasFavorites ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 my-10 gap-10">
                {favorites.map( pokemon => (
                    <PokemonCard 
                        key={pokemon.id}
                        pokemon={pokemon}
                    />
            ))}
            </div>                
            ) : (
               <p className="my-10 text-center text-2xl text-yellow-500">
                    Favorites will be displayed here
               </p> 
            )}

        </>
    )
}