import { pickWinnerAction, rollAction, stealCharacterAction } from "./moves";
import { IsDraw, IsVictory } from "./utility";

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
  }),

  turn: {
    minMoves: 1,
    maxMoves: 3,
  },
  moves: {
    roll: rollAction,
    pickWinner: pickWinnerAction,
    stealCharacter: stealCharacterAction,
    pickFreeCharacter: pickWinnerAction,
  },

  endIf: ({ G, ctx }) => {
    if (IsVictory(G.cells)) {
      return { winner: ctx.currentPlayer };
    }

    if (IsDraw(G.cells)) {
      return { draw: true };
    }
  },
};

export default SmashMonopoly;
