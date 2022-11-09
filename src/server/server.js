const { Server, Origins } = require("boardgame.io/server");
const { default: SmashMonopoly } = require("../Game/Game");

const server = Server({
  games: [SmashMonopoly],
  origins: [Origins.LOCALHOST],
});

server.run(8000);
