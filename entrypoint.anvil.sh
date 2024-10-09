#!/bin/sh

args="--host 0.0.0.0 --balance 0"

if ! [ -z $FORK_URL ]; then
  args="$args --fork-url $FORK_URL"
fi

if ! [ -z $FORK_NUMBER ]; then
  args="$args --fork-url $FORK_NUMBER"
fi

if ! [ -z $ANVIL_STATE ]; then
  args="$args --state $ANVIL_STATE"
fi

if ! [ -z $ANVIL_STATE_INTERVAL ]; then
  args="$args --state-interval $ANVIL_STATE_INTERVAL"
fi

if ! [ -z $ANVIL_CHAIN_ID ]; then
  args="$args --chain-id $ANVIL_CHAIN_ID"
fi

if ! [ -z $ANVIL_AUTO_IMPERSONATE ]; then
  args="$args --auto-impersonate"
fi

anvil $args
