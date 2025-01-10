import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"


export default function Header() {
    const [search, setSearch] = useState({
        pokemon: '',
        tipo: ''
    })

    const {pathname} = useLocation()
    const isHome = useMemo(() => pathname === '/', [pathname])

    const fetchTipos = useAppStore((state) => state.fetchTipos)
    const tipos = useAppStore((state) => state.tipos)
    const searchPokemon = useAppStore((state) => state.searchPokemon)
    const searchTipo = useAppStore((state) => state.searchTipo)
    const resetPokedex = useAppStore((state) => state.resetPokedex)

    useEffect(() => {
        fetchTipos()
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSearch((prevSearch) => ({
            ...prevSearch,
            [name]: value,
        }))
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        resetPokedex()
        /* Si quisiera validar el input y el select: 
        if(Object.values(search).includes('')) {
            console.log('Todos los campos son obligatorios')
            return
        } */

        // Consultar pokemons
        if (!search.pokemon && !search.tipo) {
            console.log("Por favor, ingresa un nombre o selecciona un tipo.");
            return;
          }
        if (search.pokemon) 
            searchPokemon({ pokemon: search.pokemon });
        if (search.tipo) 
            searchTipo({ tipo: search.tipo });
    }

    return (
        <header className="bg-slate-300">
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 
                            className="uppercase text-yellow-500 font-extrabold text-7xl"
                        >pokemon</h1>
                    </div>

                    <nav className='flex gap-4'>
                        <NavLink 
                            to="/"
                            className={({isActive}) =>
                            isActive ? 'text-yellow-500 uppercase font-bold' : 'text-white uppercase font-bold'
                        }

                        >Pokedex</NavLink>
                        <NavLink 
                            to="/favoritos"
                            className={({isActive}) =>
                            isActive ? 'text-yellow-500 uppercase font-bold' : 'text-white uppercase font-bold'
                            }
                        >Favorites</NavLink>
                    </nav>
                </div>

                {isHome && (
                    <form 
                        className="md:w-1/2 2xl:w-1/3 bg-white my-10 p-10 rounded-lg shadow space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <label 
                                htmlFor="pokemon"
                                className="block text-slate-300 uppercase font-extrabold text-lg"
                            >Pokemon's name</label>

                            <input 
                                type="text" 
                                name="pokemon" 
                                id="pokemon"
                                className="p-3 w-full rounded-lg focus:outline-none bg-slate-300"
                                placeholder="Pokemon's name"
                                onChange={handleChange}
                                value={search.pokemon}
                            />
                        </div>

                        <div>
                            <label 
                                htmlFor="tipo"
                                className="block text-slate-300 uppercase font-extrabold text-lg"
                            >Type</label>

                            <select 
                                name="tipo" 
                                id="tipo"
                                className="p-3 w-full rounded-lg focus:outline-none bg-slate-300"
                                onChange={handleChange}
                                value={search.tipo}
                            >
                                <option value="">-- Select --</option>
                                {tipos.results.map( tipo => (
                                    <option 
                                        value={tipo.name}
                                        key={tipo.name}
                                    >{tipo.name}</option>
                                ))}
                            </select>
                        </div>
                        <input 
                            type="submit" 
                            value="Search" 
                            className="cursor-pointer bg-slate-300 hover:bg-slate-500 text-white font-extrabold w-full p-2 rounded-lg uppercase"
                            />
                    </form>
                )}
            </div>
        </header>
    )
}