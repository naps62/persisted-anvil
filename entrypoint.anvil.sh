#!/bin/sh

args="--host 0.0.0.0"

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

anvil $args
