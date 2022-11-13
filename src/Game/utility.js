import { boardInfo } from "../models/boardInfo";

export function IsVictory(cells) {
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

export function IsDraw(cells) {
  return cells.filter((c) => c === null).length === 0;
}

export function IsTileOwned(cells, pos) {
  return cells[boardInfo.filter((n) => n).find((tile) => tile.pos === pos).pos];
}

export function IsTilePurchasable(cells, pos) {
  return boardInfo.filter((n) => n).find((tile) => tile.pos === pos).canBuy;
}

export function IsTileFreeCharacterSpace(pos) {
  return pos === 20;
}

export function IsTileGoToJail(pos) {
  return pos === 30;
}

export function IsTileTax(pos) {
  return pos === 38 || pos === 4;
}

export function AllPopupsHandled(G) {
  return !(G.showSelectFreeCharacterPopup || G.showTaxPopup);
}
