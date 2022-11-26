import React, { useEffect, useState } from "react";
import Tile from "../../Tile/Tile";
import { boardInfo } from "../../../models/boardInfo";
import "./styles.css";

const StealCharacterPopup = ({ G, matchWinner, handleStealCharacter }) => {
    const [tiles, setTiles] = useState([]);

    useEffect(() => {
        var ownedTiles = [];
        var id = matchWinner === "0" ? "1" : "0";
        G.cells.forEach((cell, index) => {
            if (cell === id) {
                ownedTiles.push(index);
            }
        });

        setTiles(ownedTiles);
    }, [G.cells, matchWinner]);

    return (
        <div className="steal-popup-container">
            <h2>PAY UP!</h2>
            <p>{`Player ${
                parseInt(matchWinner) + 1
            } choose a fighter to steal!`}</p>
            <div className="character-steal-options">
                {tiles.map((tileIndex, index) => {
                    let character = boardInfo
                        .filter((n) => n)
                        .find((n) => n.pos === tileIndex);
                    return (
                        <div
                            className="tile-wrapper"
                            key={index}
                            onClick={() => handleStealCharacter(character.pos)}
                        >
                            <Tile
                                strip={character.strip}
                                stripColor={character.stripColor}
                                title={character.title}
                            />
                        </div>
                    );
                })}
            </div>
            {tiles.length === 0 && (
                <div>
                    <p>No characters to steal!</p>
                    <button
                        className="fighter-btn"
                        onClick={() => handleStealCharacter(-1)}
                    >
                        Continue
                    </button>
                </div>
            )}
        </div>
    );
};

export default StealCharacterPopup;
