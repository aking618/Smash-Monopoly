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
    roll: ({ G, ctx, events, random }) => {
      let roll = random.D12();

      switch (ctx.currentPlayer) {
        case "0":
          G.player1Pos += roll;

          if (G.player1Pos >= G.cells.length) {
            G.player1Pos -= G.cells.length;

            G.showSelectFreeCharacterPopup = true;
          }

          break;
        case "1":
          G.player2Pos += roll;

          if (G.player2Pos >= G.cells.length) {
            G.player2Pos -= G.cells.length;

            G.showSelectFreeCharacterPopup = true;
          }

          // to be adjusted if other action is needed before hand
          G.showFightPopup = true;
          break;
        default:
          break;
      }

      events.endTurn();
    },
    pickWinner: ({ G, ctx, events }, playerID) => {
      // pass winner into here
      if (playerID === "0") {
        switch (IsTileOwned(G.cells, G.player1Pos)) {
          case "0":
            break;
          case "1":
            break;
          default:
            if (IsTilePurchasable(G.cells, G.player1Pos)) {
              G.cells[
                boardInfo
                  .filter((n) => n)
                  .find((tile) => tile.pos === G.player1Pos).pos
              ] = playerID;
            }
            break;
        }

        if (IsTileOwned(G.cells, G.player2Pos) === playerID) {
          G.matchWinner = playerID;
          G.showStealPopup = true;
        }
      }

      if (playerID === "1") {
        switch (IsTileOwned(G.cells, G.player2Pos)) {
          case "0":
            break;
          case "1":
            break;
          default:
            if (IsTilePurchasable(G.cells, G.player2Pos)) {
              G.cells[
                boardInfo
                  .filter((n) => n)
                  .find((tile) => tile.pos === G.player2Pos).pos
              ] = playerID;
            }
            break;
        }

        if (IsTileOwned(G.cells, G.player1Pos) === playerID) {
          G.matchWinner = playerID;
          G.showStealPopup = true;
        }
      }

      G.showFightPopup = false;
    },

    stealCharacter: ({ G, ctx, events }, pos) => {
      if (pos == -1) {
        G.showStealPopup = false;
        G.matchWinner = "";
        return;
      }

      G.cells[boardInfo.filter((n) => n).find((tile) => tile.pos === pos).pos] =
        G.matchWinner;
      G.showStealPopup = false;
      G.matchWinner = "";
    },

    pickFreeCharacter: ({ G, ctx }, pos) => {
      if (pos == -1) {
        G.showSelectFreeCharacterPopup = false;
      }

      G.cells[boardInfo.filter((n) => n).find((tile) => tile.pos === pos).pos] =
        ctx.currentPlayer;
      G.showSelectFreeCharacterPopup = false;
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

function IsTileOwned(cells, pos) {
  return cells[boardInfo.filter((n) => n).find((tile) => tile.pos === pos).pos];
}

function IsTilePurchasable(cells, pos) {
  return boardInfo.filter((n) => n).find((tile) => tile.pos === pos).canBuy;
}
