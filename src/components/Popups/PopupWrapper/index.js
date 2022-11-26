import React from "react";
import FightPopup from "../FightPopup/FightPopup";
import StealCharacterPopup from "../StealCharacterPopup/StealCharacterPopup";
import PlayerControls from "../../PlayerControls/PlayerControls";
import FreeCharacterPopup from "../FreeCharacterPopup/FreeCharacterPopup";
import WinnerPopup from "../WinnerPopup/WinnerPopup";
import BannedPopup from "../BannedPopup/BannedPopup";
import EffectPopup from "../TaxPopup/TaxPopup";
import { AllPopupsHandled } from "../../../Game/utility";
import { boardInfo } from "../../../models/boardInfo";

import "./styles.css";

const PopupWrapper = ({ G, ctx, moves }) => {
    const handleStealCharacter = (pos) => moves.stealCharacter(pos);
    const handleWinner = (playerID) => moves.pickWinner(playerID);
    const handlePickFreeCharacter = (pos) => moves.pickFreeCharacter(pos);
    const handleAcceptTaxEffect = () => moves.acceptTaxEffect();
    const handleAcceptBanned = () => moves.acceptBanned();

    return (
        <>
            {G.showFightPopup && AllPopupsHandled(G) && (
                <FightPopup
                    G={G}
                    p1Fighter={boardInfo
                        .filter((n) => n)
                        .find((tile) => tile.pos === G.player1Pos)}
                    p2Fighter={boardInfo
                        .filter((n) => n)
                        .find((tile) => tile.pos === G.player2Pos)}
                    handleWinner={(playerId) => {
                        handleWinner(playerId);
                    }}
                />
            )}
            <PlayerControls G={G} ctx={ctx} moves={moves} />

            {G.showStealPopup && (
                <StealCharacterPopup
                    G={G}
                    matchWinner={G.matchWinner}
                    handleStealCharacter={(pos) => {
                        handleStealCharacter(pos);
                    }}
                />
            )}
            {G.showTaxPopup && (
                // add state for community chest and chance
                // pass each of them as props to decide the text and random effect
                <EffectPopup acceptPopup={() => handleAcceptTaxEffect()} />
            )}
            {G.showSelectFreeCharacterPopup && (
                <FreeCharacterPopup
                    G={G}
                    ctx={ctx}
                    handleResult={(pos) => {
                        handlePickFreeCharacter(pos);
                    }}
                />
            )}
            {G.showBannedPopup && (
                <BannedPopup
                    ctx={ctx}
                    acceptPopup={() => handleAcceptBanned()}
                />
            )}
            {ctx.gameover && <WinnerPopup ctx={ctx} />}
        </>
    );
};

export default PopupWrapper;
