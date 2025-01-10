import { StateCreator } from "zustand";
import { PokemonDetails } from "../types";


export type FavoritesSliceType = {
    favorites: PokemonDetails[]
    handleClickFavorite: (pokemon: PokemonDetails) => void
    favoriteExist: (id: PokemonDetails['id']) => boolean
    loadFromStorage: () => void
}

export const createFavoritesSlice : StateCreator<FavoritesSliceType> = (set, get) => ({
    favorites: [],
    handleClickFavorite: (pokemon) => {
        if(get().favoriteExist(pokemon.id)) {
            set((state) => ({
                favorites: state.favorites.filter( favorite => favorite.id !== pokemon.id)
            }))
        } else {
            set((state) => ({
                favorites: [ ...state.favorites, pokemon]
            }))
        }
        localStorage.setItem('favorites', JSON.stringify(get().favorites))
    },
    favoriteExist: (id) => {
        return get().favorites.some(favorite => favorite.id === id)
    },
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites')
        if(storedFavorites) {
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})