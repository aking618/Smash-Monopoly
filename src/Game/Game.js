import { POPUP_TYPES } from "../models/popupTypes";
import {
    pickFreeCharacterAction,
    pickWinnerAction,
    rollAction,
    stealCharacterAction,
    acceptEffectAction,
    acceptBannedAction,
    endCondition,
} from "./moves";

const SmashMonopoly = {
    name: "smash-monopoly",
    setup: () => ({
        cells: Array(40).fill(null),
        player1Pos: 0,
        player1Cells: [],
        player2Pos: 0,
        player2Cells: [],
        roll: 0,
        showFightPopup: false,
        matchWinner: "",
        showStealPopup: false,
        showSelectFreeCharacterPopup: false,
        banned: "",
        showBannedPopup: false,
        showEffectPopup: false,
        effectType: POPUP_TYPES.NONE,
    }),

    turn: {
        minMoves: 1,
        maxMoves: 4, // maybe update this to 4
    },
    moves: {
        roll: rollAction,
        pickWinner: pickWinnerAction,
        stealCharacter: stealCharacterAction,
        pickFreeCharacter: pickFreeCharacterAction,
        acceptBanned: acceptBannedAction,
        acceptEffect: acceptEffectAction,
    },

    endIf: endCondition,
};

export default SmashMonopoly;
