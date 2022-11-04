import { INVALID_MOVE } from "boardgame.io/core";
import { boardInfo } from "./models/boardInfo";

export const TicTacToe = {
  name: "tic-tac-toe",
  setup: () => ({
    cells: Array(40).fill(null),
    player1Pos: 0,
    player1Cells: [],
    player2Pos: 0,
    player2Cells: [],
    showPopup: false,
  }),

  turn: {
    minMoves: 1,
    maxMoves: 2,
  },
  moves: {
    roll: ({ G, ctx, events, random }) => {
      let roll = random.D12();

      switch (ctx.currentPlayer) {
        case "0":
          G.player1Pos += roll;

          if (G.player1Pos >= G.cells.length) {
            G.player1Pos -= G.cells.length;
          }

          break;
        case "1":
          G.player2Pos += roll;

          if (G.player2Pos >= G.cells.length) {
            G.player2Pos -= G.cells.length;
          }

          G.showPopup = true;
          break;
        default:
          break;
      }

      events.endTurn();
    },
    pickWinner: ({ G, ctx, events }, playerID) => {
      // pass winner into here
      if (playerID === "0") {
        G.cells[
          boardInfo
            .filter((n) => n)
            .find((tile) => tile.pos === G.player1Pos).pos
        ] = playerID;
      }

      if (playerID === "1") {
        G.cells[
          boardInfo
            .filter((n) => n)
            .find((tile) => tile.pos === G.player2Pos).pos
        ] = playerID;
      }

      G.showPopup = false;
    },
  },

  endIf: ({ G, ctx }) => {
    if (IsVictory(G.cells)) {
      return { winner: ctx.currentPlayer };
    }

    if (IsDraw(G.cells)) {
      return { draw: true };
    }
  },

  ai: {
    enumerate: (G, ctx) => {
      let moves = [];
      for (let i = 0; i < 9; i++) {
        if (G.cells[i] === null) {
          moves.push({ move: "clickCell", args: [i] });
        }
      }

      return moves;
    },
  },
};

function IsVictory(cells) {
  const positions = [
    [21, 23, 24], // red
    [26, 27, 29], // yellow
    [19, 18, 16], // orange
    [32, 31, 34], // green
    [14, 13, 11], // magenta
    [39, 37], // blue
    [6, 8, 9], // cyan
    [1, 3], // brown
    [28, 12], // pythra
    [25, 15, 35, 5], // fire emblem stations
  ];

  const isRowComplete = (row) => {
    const symbols = row.map((i) => cells[i]);
    return symbols.every((i) => i !== null && i === symbols[0]);
  };

  return positions.map(isRowComplete).some((i) => i === true);
}

function IsDraw(cells) {
  return cells.filter((c) => c === null).length === 0;
}
