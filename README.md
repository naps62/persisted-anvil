# Persisted Anvil

A docker setup that includes a persistent anvil instance, with optional forking capabilities, and a faucet API

# Usage

1. Start the system with `docker compose up -d`
2. Use anvil through the exposed RPC at `http://localhost:8545`
3. Mint new ETH to an arbitrary account with `curl localhost:3000 --data '{"address": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"}'`
