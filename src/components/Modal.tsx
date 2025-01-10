import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAppStore } from '../stores/useAppStore';
import SkillsConfigurator from './SkillsConfigurator';

export default function Modal() {
    const modal = useAppStore((state) => state.modal);
    const closeModal = useAppStore((state) => state.closeModal);
    const selectedPokemon = useAppStore((state) => state.selectedPokemon);
    const handleClickFavorite = useAppStore((state) => state.handleClickFavorite)
    const favoriteExist = useAppStore((state) => state.favoriteExist)


    return (
        <>
            <Transition appear show={modal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-70" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6 xl:max-w-6xl">
                                    <Dialog.Title
                                        as="h3"
                                        className="uppercase text-black text-4xl font-extrabold my-5 text-center"
                                    >
                                        {selectedPokemon?.name || 'Unknown'}
                                    </Dialog.Title>

                                    <img
                                        src={selectedPokemon?.sprites?.other?.home?.front_default || ''}
                                        alt={`Imagen de ${selectedPokemon?.name || 'Unknown'}`}
                                        className="mx-auto w-96"
                                    />

                                    <Dialog.Title
                                        as="h3"
                                        className="text-gray-900 text-2xl font-extrabold my-5 text-center"
                                    >
                                        TYPE
                                    </Dialog.Title>
                                    {selectedPokemon?.types ? (
                                        <ul className="list-disc list-inside ml-96">
                                            {selectedPokemon.types.map((type) => (
                                                <li key={type.type.name} className="capitalize">
                                                    {type.type.name}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No types available.</p>
                                    )}

                                    <Dialog.Title
                                        as="h3"
                                        className="text-black text-2xl font-extrabold my-5 text-center"
                                    >
                                        BASE STATS
                                    </Dialog.Title>
                                    {selectedPokemon?.stats ? (
                                        <ul className="list-disc list-inside ml-96">
                                            {selectedPokemon.stats.map((stat) => (
                                                <li key={stat.stat.name} className="capitalize">
                                                    {`${stat.stat.name}: ${stat.base_stat}`}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No stats available.</p>
                                    )}

                                    <Dialog.Title
                                        as="h3"
                                        className="text-gray-900 text-2xl font-extrabold my-5 text-center"
                                    >
                                        SKILLS CONFIGURATOR
                                    </Dialog.Title>
                                    <div className="grid grid-cols-1 xl:grid-cols-2  my-10 gap-10">
                                        <SkillsConfigurator
                                            detailsPokemon={selectedPokemon}
                                        />
                                        <SkillsConfigurator 
                                            detailsPokemon={selectedPokemon}
                                        />
                                        <SkillsConfigurator 
                                            detailsPokemon={selectedPokemon}
                                        />                                        
                                        <SkillsConfigurator 
                                            detailsPokemon={selectedPokemon}
                                        />
                                    </div>

                                    <div className='mt-5 flex justify-between gap-4'>
                                        <button
                                            type='button'
                                            className='w-full rounded bg-black p-3 font-bold text-white uppercase shadow hover:bg-slate-800'
                                            onClick={closeModal}
                                        >Close</button>

                                        <button
                                            type='button'
                                            className='w-full rounded bg-yellow-500 p-3 font-bold text-white uppercase shadow hover:bg-yellow-400'
                                            onClick={() => {
                                                handleClickFavorite(selectedPokemon)
                                                closeModal()
                                            }}
                                        >{favoriteExist(selectedPokemon.id) ? 'Delete Favorite' : 'Add Favorite'}</button>
                                    </div>
                                    
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
