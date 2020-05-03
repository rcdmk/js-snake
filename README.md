# js-snake

This is a simple snake game implementation in JavaScript using the modules format, including all basic features:

- [x] simple navigation with ARROW keys (UP, DOWN, LEFT and RIGHT)
- [x] avoid moving out of bounds
- [x] random food placement
- [x] food pickup
- [x] growing when eating food
- [x] scoring when eating food
- [x] pause and unpause game with SPACE
- [x] dying when touching own body
- [x] dying when touching borders
- [x] game over when dead, pauses game
- [x] unpausing after game over resets the game
- [x] high-score keeps track of highest score between games
- [x] reversing direction if pressing opposite direction

## Reversing the direction

The direction reversion logic reverses the snake direction based on the tail direction, turning the tail into the new head. For instance, if the body of the snake is performing a U shaped moviment going up and <kbd>DOWN</kbd> is pressed, the tail will become the head and the snake will start going up from the other end.

Another example is when the snake body is performing an L shape move, going up after going left, and <kbd>DOWN</kbd> is pressed. In that case, the snake will go right because the tail was going left and it is now the head and the direction was reversed.

## Dependencies

To allow browsers to run modules locally, a static server is needed to avoid CORS rules from blocking the module imports.

For first time only, navigate to the root of the project and install the dependencies:

```sh
npm install
# OR
yarn install
```

## Running

To execute the included static server, run:

```sh
npm start
# OR
yarn start
```

Then open `http://localhost:5000` in your browser.

## Controls

| Action                  | Keys                                                                |
|-------------------------|---------------------------------------------------------------------|
| Starting                | <kbd>UP</kbd>, <kbd>DOWN</kbd>, <kbd>LEFT</kbd> or <kbd>RIGHT</kbd> |
| Moving                  | <kbd>UP</kbd>, <kbd>DOWN</kbd>, <kbd>LEFT</kbd> or <kbd>RIGHT</kbd> |
| Pause toggle            | <kbd>SPACE</kbd>                                                    |
| Restarting on game over | <kbd>SPACE</kbd>                                                    |
