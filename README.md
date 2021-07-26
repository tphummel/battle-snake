# braden looper

[Braden Looper](https://play.battlesnake.com/u/tphummel/braden-looper/) is my first [battlesnake](https://play.battlesnake.com). (Grey one below)

[![Alt text](/braden-looper.gif)](https://play.battlesnake.com/g/87504a4f-498a-422c-9124-ccbb46586bbc/)

## "Features"

- Loops the game board's outer-most edge, counter clockwise.
- Will not intentionally seek out food.
- Will not do much else.

## Notable things

- Battlesnake is super cool.
- I [deployed](https://braden-looper-battlesnake.tomhummel.com) this snake using [Cloudflare Workers](https://workers.cloudflare.com/)
- I wrote [unit tests](/test.js) for various scenarios the snake may find itself in and what I expect it to do (or not do)
- I added the ability to [run the snake locally](/local.js) with node.js. It is very close to the same code which runs in cloudflare.

## Usage

run locally:
```
DEBUG=1 node local.js
```

curl example:

```
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"game":{"id":"f59488b9-b159-45b0-ae2e-221648b1aa58","timeout":500},"turn":35,"board":{"height":11,"width":11,"food":[{"x":10,"y":4},{"x":5,"y":5},{"x":4,"y":4},{"x":2,"y":5},{"x":6,"y":2},{"x":4,"y":2},{"x":4,"y":0},{"x":6,"y":6}],"hazards":[],"snakes":[{"id":"acb1e234-918c-421c-9a48-84f254fcf8bd","name":"acb1e234-918c-421c-9a48-84f254fcf8bd","health":66,"body":[{"x":1,"y":9},{"x":1,"y":8},{"x":1,"y":7}],"latency":0,"head":{"x":1,"y":9},"length":3,"shout":"","squad":""}]},"you":{"id":"acb1e234-918c-421c-9a48-84f254fcf8bd","name":"acb1e234-918c-421c-9a48-84f254fcf8bd","health":66,"body":[{"x":1,"y":9},{"x":1,"y":8},{"x":1,"y":7}],"latency":0,"head":{"x":1,"y":9},"length":3,"shout":"","squad":""}}' \
  http://localhost:8080
  ```

  play locally against a remote snake using the [battlesnake rules cli](https://github.com/BattlesnakeOfficial/rules):
  ```
  battlesnake play --viewmap --gametype duel --name local --url http://localhost:8080 --name cf --url https://battlesnake.tomhummel.com
  ```

## What does the name mean?

[Braden Looper](https://www.baseball-reference.com/players/l/loopebr01.shtml) is a professional baseball player who has "loop" in his name. This snake loops.
