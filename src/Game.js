import { INVALID_MOVE } from "boardgame.io/core";

export const TicTacToe = {
  name: "tic-tac-toe",
  setup: () => ({
    cells: Array(40).fill(null),
    player1Pos: 0,
    player1Cells: [],
    player2Pos: 0,
    player2Cells: [],
    turn: 0,
  }),

  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

  phases: {
    roll: {
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

              events.endPhase();
              break;
            default:
              break;
          }
        },
      },
      start: true,
      next: ({ G })  => {
          console.log("here")
        return G.turn % 2 === 0 ? "play" : "role";
      },
    },

    play: {
      moves: {
        pickWinner: ({ G, ctx }) => {
            // pass winner into here
        },
      },
      next: "roll"
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
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
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
