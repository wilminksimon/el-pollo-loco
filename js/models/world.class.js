class World {
    gameOverShown = false;
    character = new Character();
    level = createLevel1();
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusbarHealth = new StatusbarHealth();
    statusbarCoin = new StatusbarCoin();
    statusbarBottle = new StatusbarBottle();
    statusbarEndboss = new StatusbarEndboss();
    throwableObjects = [];
    throw_sound = new Audio('audio/throw.wav');
    coin_sound = new Audio('audio/coinCollect.wav');
    bottle_sound = new Audio('audio/bottleCollect.ogg');


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        registerSound(this.throw_sound);
        registerSound(this.coin_sound);
        registerSound(this.bottle_sound);
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setStoppableInterval(() => {

            this.checkCollisions();
            this.checkThrowObjects();
            this.checkRemoveObjectsFromWorld();
            this.checkGameOver();
        }, 1000 / 60);
    }

    checkGameOver() {
        if (this.character.isDead() &&
            this.character.y > this.canvas.height &&
            !this.gameOverShown) {

            this.gameOverShown = true;
            document.getElementById('game-over-screen')
                .classList.remove('d-none');
        }
    }

    showWinScreen() {
        document.getElementById('win-screen')
            .classList.remove('d-none');
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.character.bottles > 0) {
            let x = this.character.otherDirection
                ? this.character.x - 40
                : this.character.x + 100;

            let bottle = new ThrowableObject(x, this.character.y + 100);
            this.throwableObjects.push(bottle)
            this.throw_sound.currentTime = 0;
            this.throw_sound.play();
            this.character.bottles -= 20;
            this.statusbarBottle.setPercentage(this.character.bottles);
            this.keyboard.D = false; // Reset the D key state to prevent continuous throwing
        }
    }

    checkCollisions() {
        this.checkCollisionCharacterEnemy();
        this.checkCollisionCharacterCoin();
        this.checkCollisionCharacterBottle();
        this.checkCollisionBottleChicken();
        this.checkCollisionBottleEndboss();
    }

    checkCollisionCharacterEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {

                if (enemy instanceof Chicken || enemy instanceof ChickenSmall && !enemy.dead &&
                    this.character.speedY < 0 &&
                    this.character.y + this.character.height -
                    this.character.offset.bottom <
                    enemy.y + enemy.offset.top + 30) {

                    enemy.die();
                    this.character.speedY = 15;

                } else if (!(enemy instanceof Endboss) && !enemy.dead ||
                    (enemy instanceof Endboss && !enemy.isDead)) {
                    if (Date.now() - enemy.lastCharacterHit < 50) return;
                    enemy.lastCharacterHit = Date.now();
                    this.character.hit();
                    this.statusbarHealth.setPercentage(
                        this.character.energy
                    );
                }
            }
        });
    }

    checkCollisionBottleChicken() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy instanceof Chicken || enemy instanceof ChickenSmall &&
                    bottle.isColliding(enemy) &&
                    !bottle.removeFromWorld &&
                    !enemy.dead) {
                    enemy.die();
                    bottle.removeFromWorld = true;
                }
            });
        });
    }

    checkCollisionBottleEndboss() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (enemy instanceof Endboss && bottle.isColliding(enemy)
                    && !bottle.removeFromWorld && enemy.energy > 0) {

                    enemy.energy = Math.max(0, enemy.energy - 20);
                    this.statusbarEndboss.setPercentage(enemy.energy);
                    bottle.removeFromWorld = true;

                    if (enemy.energy === 0) {
                        enemy.isDead = true;
                        enemy.currentImage = 0;
                    } else {
                        enemy.isHurt = true;
                        enemy.currentImage = 0;
                    }
                }
            });
        });
    }


    checkRemoveObjectsFromWorld() {
        this.level.enemies = this.level.enemies.filter(
            enemy => !enemy.removeFromWorld
        );

        this.throwableObjects = this.throwableObjects.filter(
            bottle => !bottle.removeFromWorld
        );
    }


    checkCollisionCharacterCoin() {
        for (let i = this.level.coin.length - 1; i >= 0; i--) {
            let coin = this.level.coin[i];

            if (this.character.isColliding(coin)) {
                this.character.collectCoin();

                this.coin_sound.play();
                this.level.coin.splice(i, 1);

                this.statusbarCoin.setPercentage(this.character.coins);
            }
        }
    }

    checkCollisionCharacterBottle() {
        for (let i = this.level.bottle.length - 1; i >= 0; i--) {
            let bottle = this.level.bottle[i];

            if (this.character.isColliding(bottle) &&
                this.character.bottles < this.character.maxBottleInventory) {
                this.character.collectBottle();

                this.bottle_sound.play();
                this.level.bottle.splice(i, 1);

                this.statusbarBottle.setPercentage(this.character.bottles);
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0); //Back
        // ----- Space for fixed Objects -------
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarBottle);
        this.addToMap(this.statusbarCoin);
        if (this.statusbarEndboss.visible) {
            this.addToMap(this.statusbarEndboss);
        }
        this.ctx.translate(this.camera_x, 0); //Forward

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        // Draw() wird immer wieder aufgerufen, um die Animation zu aktualisieren
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}