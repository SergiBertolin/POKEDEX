import type { MovesDetails, PokemonDetails } from "../types"
import { useState } from "react";
import { getMoveByName } from "../services/PokedexService";

type SkillsConfiguratorProps = {
    detailsPokemon: PokemonDetails
}

export default function SkillsConfigurator({detailsPokemon} : SkillsConfiguratorProps) {
    const [selectedMove, setSelectedMove] = useState<string>("");
    const [selectedMoveDetails, setSelectedMoveDetails] = useState<MovesDetails | null>(null); // Detalles del movimiento

    const handleMoveChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const moveName = e.target.value;
        setSelectedMove(moveName); // Actualiza el estado local.

        if (moveName) {
            const moveDetails = await getMoveByName(moveName);
            setSelectedMoveDetails(moveDetails);
        }
    };

    return (
        <div className="">
            <label
                htmlFor="move"
                className="block text-slate-300 uppercase font-extrabold text-lg"
            >
                Move
            </label>

            <select
                name="move"
                id="move"
                className="p-3 w-full rounded-lg focus:outline-none bg-slate-300"
                onChange={handleMoveChange}
                value={selectedMove}
            >
                <option value="">-- Select --</option>
                {detailsPokemon?.name &&
                    detailsPokemon.moves.map((move) => (
                        <option
                            value={move.move.name}
                            key={move.move.name}
                        >
                            {move.move.name}
                        </option>
                    ))}
            </select>
            {selectedMoveDetails ? (
                <div className="flex space-x-2">
                    <p>
                        <span className="font-bold">Effect:</span>{" "}
                        {selectedMoveDetails.effect_entries && selectedMoveDetails.effect_entries.length > 0
                            ? selectedMoveDetails.effect_entries.map(entry => entry.effect).join(", ")
                            : ""}
                    </p>
                    <p>
                        <span className="font-bold">Damage Class:</span>{" "}
                        {selectedMoveDetails.damage_class ? selectedMoveDetails.damage_class.name : ""}
                    </p>
                    <p>
                        <span className="font-bold">Type:</span>{" "}
                        {selectedMoveDetails.type ? selectedMoveDetails.type.name : ""}
                    </p>
                    <p>
                        <span className="font-bold">Accuracy:</span>{" "}
                        {selectedMoveDetails.accuracy ? selectedMoveDetails.accuracy : ""}
                    </p>
                    <p>
                        <span className="font-bold">Power:</span>{" "}
                        {selectedMoveDetails.power ? selectedMoveDetails.power : ""}
                    </p>
                    <p>
                        <span className="font-bold">PP:</span>{" "}
                        {selectedMoveDetails.pp ? selectedMoveDetails.pp : ""}
                    </p>
                </div>
            ) : (
                <p>No info available</p>
            )}
            
        </div>
    )
}