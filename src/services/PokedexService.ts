import axios from "axios"
import { PokemonsAPIResponseSchema, PokemonsAPIDetailsSchema, TiposAPIResponseSchema, MovesAPIDetailsSchema } from "../utils/pokemons-schema"
import type { Pokemons, PokemonDetails } from "../types"

export async function getPokemons() {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0'
    const { data } = await axios(url)
    const result = PokemonsAPIResponseSchema.safeParse(data)
    if(!result.success) {
        throw new Error("Error en el primer fetch de getPokemons")
    }
    const pokemonsList : Pokemons[] = data.results
    const pokemonDetailsPromises = pokemonsList.map(async (pokemon) => {
        const { data } = await axios(pokemon.url);
        const detailResult = PokemonsAPIDetailsSchema.safeParse(data);
        if (!detailResult.success) {
            throw new Error(`Error en el fetch de detalles para ${pokemon.name}`);
        }
        return detailResult.data; 
    }); 
    const pokemonDetails = await Promise.all(pokemonDetailsPromises)
    console.log(pokemonDetails)    
    return pokemonDetails
} 

export async function getTipos() {
    const url = 'https://pokeapi.co/api/v2/type?limit=16&offset=0'
    const { data } = await axios(url)
    const result = TiposAPIResponseSchema.safeParse(data)
    if(result.success) {
        console.log(result.data.results)
        return result.data
    }
}

export async function getPokemonById(id: PokemonDetails['id']) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`
    const { data } = await axios(url)
    const result = PokemonsAPIDetailsSchema.safeParse(data);
    if (!result.success) {
        throw new Error(`Error en el fetch de detalles pokemon con id ${id}`);
    }
    console.log(result)
    return result.data; 
}

export async function getMoveByName(name: PokemonDetails['moves'][number]['move']['name']) {  
    const url = `https://pokeapi.co/api/v2/move/${name}/`
    const { data } = await axios(url)
    const result = MovesAPIDetailsSchema.safeParse(data)
    if(!result.success) {
        throw new Error(`Error en el fetch de detalles del movieminto con nombre ${name}`)
    }
    console.log(result)
    return result.data;
}