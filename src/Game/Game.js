import {
  pickFreeCharacterAction,
  pickWinnerAction,
  rollAction,
  stealCharacterAction,
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
    showTaxPopup: false,
  }),

  turn: {
    minMoves: 1,
    maxMoves: 3, // maybe update this to 4
  },
  moves: {
    roll: rollAction,
    pickWinner: pickWinnerAction,
    stealCharacter: stealCharacterAction,
    pickFreeCharacter: pickFreeCharacterAction,
    // acceptTaxEffect: acceptTaxEffect
  },

  endIf: endCondition,
};

export default SmashMonopoly;
