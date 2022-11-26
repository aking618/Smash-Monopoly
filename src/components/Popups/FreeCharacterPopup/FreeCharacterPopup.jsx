import React, { useState, useEffect } from "react";
import { boardInfo } from "../../../models/boardInfo";
import Tile from "../../Tile/Tile";
import "./styles.css";

const FreeCharacterPopup = ({ G, ctx, handleResult }) => {
    const [tiles, setTiles] = useState([]);

    useEffect(() => {
        var unownedTiles = [];

        G.cells.forEach((cell, index) => {
            if (
                cell === null &&
                boardInfo.filter((n) => n).find((tile) => tile.pos === index)
                    .canBuy
            ) {
                unownedTiles.push(index);
            }
        });

        setTiles(unownedTiles);
    }, [G.cells]);

    return (
        <div className="steal-popup-container free-character-container">
            <h2>Congrats!</h2>
            <p>Choose a fighter to take!</p>
            <div className="character-steal-options">
                {tiles.map((tileIndex, index) => {
                    let character = boardInfo
                        .filter((n) => n)
                        .find((n) => n.pos === tileIndex);
                    return (
                        <div
                            className="tile-wrapper"
                            key={index}
                            onClick={() => handleResult(character.pos)}
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
                    <p>No characters to take!</p>
                    <button
                        className="fighter-btn"
                        onClick={() => handleResult(-1)}
                    >
                        Continue
                    </button>
                </div>
            )}
        </div>
    );
};

export default FreeCharacterPopup;
