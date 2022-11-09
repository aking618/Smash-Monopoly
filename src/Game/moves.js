import { boardInfo } from "../models/boardInfo";
import {
  IsTileFreeCharacterSpace,
  IsTileOwned,
  IsTilePurchasable,
  IsDraw,
  IsVictory,
} from "./utility";

export function rollAction({ G, ctx, events, random }) {
  let roll = random.D12();
  G.roll = roll;

  switch (ctx.currentPlayer) {
    case "0":
      G.player1Pos += roll;

      if (G.player1Pos >= G.cells.length) {
        G.player1Pos -= G.cells.length;

        G.showSelectFreeCharacterPopup = true;
      }

      if (IsTileFreeCharacterSpace(G.player1Pos)) {
        G.showSelectFreeCharacterPopup = true;
      }

      break;
    case "1":
      G.player2Pos += roll;

      if (G.player2Pos >= G.cells.length) {
        G.player2Pos -= G.cells.length;

        G.showSelectFreeCharacterPopup = true;
      }

      if (IsTileFreeCharacterSpace(G.player2Pos)) {
        G.showSelectFreeCharacterPopup = true;
      }

      // to be adjusted if other action is needed before hand
      G.showFightPopup = true;
      break;
    default:
      break;
  }

  if (!G.showSelectFreeCharacterPopup) {
    events.endTurn();
  }
}

export function pickWinnerAction({ G, ctx, events }, playerID) {
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
}

export function stealCharacterAction({ G, ctx, events }, pos) {
  if (pos === -1) {
    G.showStealPopup = false;
    G.matchWinner = "";
    return;
  }

  G.cells[boardInfo.filter((n) => n).find((tile) => tile.pos === pos).pos] =
    G.matchWinner;
  G.showStealPopup = false;
  G.matchWinner = "";
}

export function pickFreeCharacterAction({ G, ctx, events }, pos) {
  if (pos === -1) {
    G.showSelectFreeCharacterPopup = false;
  }

  G.cells[boardInfo.filter((n) => n).find((tile) => tile.pos === pos).pos] =
    ctx.currentPlayer;
  G.showSelectFreeCharacterPopup = false;

  events.endTurn();
}

export function endCondition({ G, ctx }) {
  if (IsVictory(G.cells)) {
    // return the true winner
    return { winner: ctx.currentPlayer };
  }

  if (IsDraw(G.cells)) {
    return { draw: true };
  }
}
