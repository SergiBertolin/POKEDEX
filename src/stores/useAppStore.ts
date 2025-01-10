import { create } from "zustand";
import { devtools } from "zustand/middleware"
import { createPokedexSlice, PokedexSliceType } from "./pokemonSlice";
import  { FavoritesSliceType, createFavoritesSlice } from "./favoritesSlice"

// Definir el tipo combinado
type AppState = PokedexSliceType & FavoritesSliceType;

export const useAppStore = create<AppState>()(
    devtools(
        (...a) => ({
            ...createPokedexSlice(...a),
            ...createFavoritesSlice(...a),
        }),
        { name: "AppStore" }
    )
);