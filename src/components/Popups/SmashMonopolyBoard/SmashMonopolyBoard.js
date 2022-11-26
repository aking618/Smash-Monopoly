import React from "react";
import "./styles.css";
import Tile from "../../Tile/Tile";
import { boardInfo } from "../../../models/boardInfo";
import PopupWrapper from "../PopupWrapper";

const SmashMonopolyBoard = ({ ctx, G, moves }) => {
    return (
        <div className="container">
            <PopupWrapper G={G} ctx={ctx} moves={moves} />

            <div className="boardContainer">
                {boardInfo.map((tile, index) => {
                    if (tile === null) {
                        return <div className="filler" key={index} />;
                    }

                    return (
                        <Tile
                            key={index}
                            image={tile.image}
                            strip={tile.strip}
                            stripColor={tile.stripColor}
                            top={tile.top}
                            left={tile.left}
                            right={tile.right}
                            title={tile.title}
                            corner={tile.corner}
                            cornerRotate={tile.cornerRotate}
                            player1Pos={tile.pos === G.player1Pos}
                            player2Pos={tile.pos === G.player2Pos}
                            ownedBy={G.cells[tile.pos]}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default SmashMonopolyBoard;
