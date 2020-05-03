export default class Board {
    static DIRECTION_UP = 'u';
    static DIRECTION_DOWN = 'd';
    static DIRECTION_LEFT = 'l';
    static DIRECTION_RIGHT = 'r';

    static STYLE_FOOD = 'rgba(0, 255, 0, 0.75)';
    static STYLE_BODY = 'rgba(0, 0, 0, 0.75)';

    static PART_NONE = 0;
    static PART_BODY = 1;
    static PART_FOOD = 2;

    size = 0;
    map = [];
    body = [];
    tileSize = 0;
    x = 0;
    y = 0;
    xspeed = 0;
    yspeed = 0;
    foodX = 0;
    foodY = 0;
    score = 0;
    hiscore = 0;
    styleMap = {};
    gameOver = false;

    constructor(size, tileSize) {
        this.size = size;
        this.tileSize = tileSize;
        this.map = this.generateMap();

        this.styleMap[Board.PART_FOOD] = Board.STYLE_FOOD;
        this.styleMap[Board.PART_BODY] = Board.STYLE_BODY;

        this.reset();
    }

    clamp(val, min, max) {
        return Math.min(Math.max(min, val), max);
    }

    generateMap() {
        let map = new Array(this.size);

        for (let y = 0; y < this.size; y++) {
            map[y] = Array(this.size);
        }

        return map;
    }

    generateFood() {
        do {
            this.foodX = Math.floor(Math.random() * this.size);
            this.foodY = Math.floor(Math.random() * this.size);
        } while (this.map[this.foodX][this.foodY] !== Board.PART_NONE)
    }

    reset() {
        // clear map
        this.map.forEach((row) => row.fill(0));

        // reset to default
        this.gameOver = false;
        this.score = 0;
        this.xspeed = 0;
        this.yspeed = 0;
        this.x = this.size / 2;
        this.y = this.size / 2;
        this.body.length = 0;

        this.generateFood();
    }

    eatFood() {
        if (this.x !== this.foodX || this.y !== this.foodY) return false;

        this.score++;
        if (this.score > this.hiscore) this.hiscore = this.score;

        this.generateFood();

        return true;
    }

    reverseDirection() {
        const tail = this.body.shift();
        let referenceX = this.x;
        let referenceY = this.y;

        if (this.body.length > 0) {
            referenceX = this.body[0].x;
            referenceY = this.body[0].y;
        }

        this.xspeed = tail.x - referenceX;
        this.yspeed = tail.y - referenceY;

        this.body.push({x: this.x, y: this.y});
        this.body.reverse();
        this.x = tail.x;
        this.y = tail.y;
    }

    setDirection(direction) {
        switch (direction) {
            case Board.DIRECTION_UP:
                if (this.yspeed > 0 && this.body.length > 0) return this.reverseDirection();
                this.xspeed = 0;
                this.yspeed = -1;
                break;
            case Board.DIRECTION_DOWN:
                if (this.yspeed < 0 && this.body.length > 0) return this.reverseDirection();
                this.xspeed = 0;
                this.yspeed = 1;
                break;
            case Board.DIRECTION_LEFT:
                if (this.xspeed > 0 && this.body.length > 0) return this.reverseDirection();
                this.xspeed = -1;
                this.yspeed = 0;
                break;
            case Board.DIRECTION_RIGHT:
                if (this.xspeed < 0 && this.body.length > 0) return this.reverseDirection();
                this.xspeed = 1;
                this.yspeed = 0;
                break;

            default:
                break;
        }
    }

    update() {
        const oldX = this.x;
        const oldY = this.y;

        const newX = this.clamp(oldX + this.xspeed, 0, this.size - 1);
        const newY = this.clamp(oldY + this.yspeed, 0, this.size - 1);

        if (this.xspeed + this.yspeed !== 0 && this.map[newY][newX] === Board.PART_BODY) this.gameOver = true;

        this.map[this.foodY][this.foodX] = Board.PART_FOOD;
        this.map[oldY][oldX] = Board.PART_NONE;
        this.map[newY][newX] = Board.PART_BODY;

        this.x = newX;
        this.y = newY;

        this.eatFood();

        if (this.score > 0) {
            // shift snake body to follow head
            this.body.push({x: oldX, y: oldY});

            if (this.body.length > this.score) {
                const tail = this.body.shift();
                this.map[tail.y][tail.x] = Board.PART_NONE;
            }

            for (let seg of this.body) {
                this.map[seg.y][seg.x] = Board.PART_BODY;
            }
        }
    }

    draw(ctx) {
        ctx.save();

        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                const part = this.map[y][x];
                if (part !== Board.PART_NONE) {
                    ctx.fillStyle = this.styleMap[part];
                    ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
                }
            }
        }

        ctx.restore();
    }
}

