#!/bin/sh

args=""

if ! [ -z $PORT ]; then
  args="$args --port $PORT"
fi

bun next start $args
