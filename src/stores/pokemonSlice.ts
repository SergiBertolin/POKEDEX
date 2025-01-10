import { StateCreator } from "zustand"
import { getPokemonById, getPokemons, getTipos } from "../services/PokedexService"
import type { Pokemon, PokemonDetails, Tipos, Tipo } from "../types"

export type PokedexSliceType = {
    pokemonDetails: PokemonDetails[]
    pokemonReset: PokemonDetails[]
    selectedPokemon: PokemonDetails
    tipos: Tipos    
    modal: boolean
    fetchPokemons: () => Promise<void>
    searchPokemon: (name: Pokemon) => void
    fetchTipos: () => Promise<void>
    searchTipo: (tipo: Tipo) => void
    selectPokemon: (id: PokemonDetails['id']) => Promise<void>
    resetPokedex: () => void
    closeModal: () => void
}

export const createPokedexSlice : StateCreator<PokedexSliceType> = (set) => ({
    pokemonDetails: [],
    tipos: {
        results: []
    },
    pokemonReset: [],
    selectedPokemon: {} as PokemonDetails,
    modal: false,
    fetchPokemons: async () => {
        try {
          const pokemonDetails = await getPokemons();
          set({ pokemonDetails, pokemonReset: pokemonDetails });
        } catch (error) {
          console.error("Error fetching Pokemons:", error);
        }
      },
      searchPokemon: (name) => {
        set((state) => ({
          pokemonDetails: state.pokemonDetails.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(name.pokemon.toLowerCase())
          ),
        }));
      },
      fetchTipos: async () => {
        try {
          const tipos = await getTipos();
          set({ tipos });
        } catch (error) {
          console.error("Error fetching types:", error);
        }
      },
      searchTipo: (tipo) => {
        set((state) => ({
          pokemonDetails: state.pokemonDetails.filter((pokemon) =>
            pokemon.types.some((t) => t.type.name.toLowerCase() === tipo.tipo.toLowerCase())
          ),
        }));
      },
      resetPokedex: () => {
        set((state) => ({
            pokemonDetails: state.pokemonReset
        }))
      },
      selectPokemon: async (id) => {
        const selectedPokemon = await getPokemonById(id)
        set({
          selectedPokemon,
          modal: true
        })
      },
      closeModal: () => {
        set({
          modal: false,
          selectedPokemon: {} as PokemonDetails
        })
      },
});