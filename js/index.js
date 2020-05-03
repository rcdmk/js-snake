'mode strict';

import Board from './board.js';
import './keyEvent.js';

// main settings
const boardSize = 24;
const tileSize = 24;
const fsp = 5;
const frameTime = 1000 / fsp;
let currTime = 0;
let frameStartTime = null;
let paused = false;

// setup stage
const screen = document.getElementById('screen');
screen.width = screen.height = tileSize * boardSize;
screen.style.border = '1px solid black';
const ctx = screen.getContext('2d');

const board = new Board(boardSize, tileSize);

const draw = (timestamp) => {
    // limit fps
    if (!frameStartTime) frameStartTime = timestamp;
    currTime = timestamp - frameStartTime;
    if (currTime < frameTime) {
        window.requestAnimationFrame(draw);
        return;
    }
    frameStartTime = timestamp;

    // update logic loop
    if (!paused) {
        board.update();

        if (board.gameOver) paused = true;
    }

    // draw loop
    ctx.clearRect(0, 0, screen.width, screen.height);

    board.draw(ctx);

    // draw UI
    ctx.save();
    ctx.font = '2vw sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`score: ${board.score}`, 20, 20);
    ctx.textAlign = 'right';
    ctx.fillText(`hi-score: ${board.hiscore}`, screen.width - 20, 20);
    ctx.restore();

    if (paused) {
        ctx.save();

        ctx.textAlign = 'center';
        ctx.font = '5vw sans-serif';

        if (board.gameOver) {
            ctx.fillStyle = 'rgba(80, 80, 80, 0.5)';
            ctx.fillText('GAME OVER', screen.width / 2, screen.height / 2);
        } else {
            ctx.fillStyle = 'rgba(100, 80, 80, 0.5)';
            ctx.fillText('PAUSE', screen.width / 2, screen.height / 2);
        }

        ctx.restore();
    }

    window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);

window.onkeydown = (e) => {
    switch (e.keyCode) {
        case KeyEvent.DOM_VK_SPACE:
            paused = !paused;
            if (!paused && board.gameOver) {
                board.reset();
            }
            break;

        case KeyEvent.DOM_VK_LEFT:
            if (!paused) board.setDirection(Board.DIRECTION_LEFT);
            break;

        case KeyEvent.DOM_VK_RIGHT:
            if (!paused) board.setDirection(Board.DIRECTION_RIGHT);
            break;

        case KeyEvent.DOM_VK_UP:
            if (!paused) board.setDirection(Board.DIRECTION_UP);
            break;

        case KeyEvent.DOM_VK_DOWN:
            if (!paused) board.setDirection(Board.DIRECTION_DOWN);
            break;

        default:
            break;
    }
};

