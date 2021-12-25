const path = require("path");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
  },
  mocha: {},
  contracts_directory: path.join(__dirname, "contracts"),
  contracts_build_directory: path.join(__dirname, "src/abis"),
  compilers: {
    solc: {
      version: "0.8.10",
      optimizer: {
        enabled: false,
        runs: 200,
      },
    },
  },
};
