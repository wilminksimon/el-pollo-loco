class World {
    animationFrameId = null;
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


    /**
     * Creates the game world and starts its drawing and update loops.
     * @param {HTMLCanvasElement} canvas - The canvas used to render the world.
     * @param {Keyboard} keyboard - The controls used by the player.
     */
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

    /** Links the character to this world instance. */
    setWorld() {
        this.character.world = this;
    }

    /** Starts the recurring game-state update loop. */
    run() {
        setStoppableInterval(() => {

            this.checkCollisions();
            this.checkThrowObjects();
            this.checkRemoveObjectsFromWorld();
            this.checkGameOver();
        }, 1000 / 60);
    }

    /** Displays the game-over screen when the character falls after dying. */
    checkGameOver() {
        if (this.character.isDead() &&
            this.character.y > this.canvas.height &&
            !this.gameOverShown) {

            this.gameOverShown = true;
            document.getElementById('game-over-screen')
                .classList.remove('d-none');
        }
    }

    /** Displays the win screen. */
    showWinScreen() {
        this.character.gameWon = true;
        this.character.snoring_sound.pause();
        this.character.snoring_sound.currentTime = 0;

        document.getElementById('win-screen')
            .classList.remove('d-none');
    }

    /** Throws a bottle when the throw control is active and bottles remain. */
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

    /** Checks all character, enemy, collectible, and projectile collisions. */
    checkCollisions() {
        this.checkCollisionCharacterEnemy();
        this.checkCollisionCharacterCoin();
        this.checkCollisionCharacterBottle();
        this.checkCollisionBottleChicken();
        this.checkCollisionBottleEndboss();
    }


    /** Checks collisions between the character and enemies. */
checkCollisionCharacterEnemy() {
    let stompedEnemies = this.level.enemies.filter((enemy) =>
        this.character.isColliding(enemy) &&
        this.isEnemyStomped(enemy)
    );
    if (stompedEnemies.length > 0) {
        stompedEnemies.forEach((enemy) => {
            this.handleEnemyStomp(enemy);
        });
        return;
    }
    this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy) &&
            this.canEnemyHitCharacter(enemy)) {
            this.handleCharacterHit(enemy);
        }
    });
}




    /**
     * Determines whether the character is stomping a living regular enemy.
     * @param {MovableObject} enemy - The enemy to check.
     * @returns {boolean} Whether the enemy is being stomped.
     */
    isEnemyStomped(enemy) {
        return (enemy instanceof Chicken || enemy instanceof ChickenSmall) &&
            !enemy.dead &&
            this.character.speedY < 0 &&
            this.character.y + this.character.height -
            this.character.offset.bottom <
            enemy.y + enemy.offset.top + 30;
    }

    /**
     * Kills a stomped enemy and bounces the character upward.
     * @param {MovableObject} enemy - The enemy being stomped.
     */
    handleEnemyStomp(enemy) {
        enemy.die();
        this.character.speedY = 15;
    }

    /**
     * Applies damage to the character after a valid enemy hit.
     * @param {MovableObject} enemy - The enemy that hit the character.
     */
    handleCharacterHit(enemy) {
        if (!this.canEnemyHitCharacter(enemy)) return;

        enemy.lastCharacterHit = Date.now();
        this.character.hit();
        this.statusbarHealth.setPercentage(this.character.energy);
    }


    /**
     * Checks whether an enemy can currently damage the character.
     * @param {MovableObject} enemy - The enemy to check.
     * @returns {boolean} Whether the enemy can hit the character.
     */
    canEnemyHitCharacter(enemy) {
        let isRegularEnemy = !(enemy instanceof Endboss);
        let isAlive = !enemy.dead;
        let isLivingEndboss = enemy instanceof Endboss && !enemy.isDead;

        if (!(isRegularEnemy && isAlive || isLivingEndboss)) {
            return false;
        }

        return Date.now() - enemy.lastCharacterHit >= 50;
    }


    /** Checks for collisions between thrown bottles and regular enemies. */
    checkCollisionBottleChicken() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {

                if ((enemy instanceof Chicken || enemy instanceof ChickenSmall) &&
                    bottle.isColliding(enemy) &&
                    !bottle.removeFromWorld &&
                    !enemy.dead) {
                    enemy.die();
                    bottle.removeFromWorld = true;
                }
            });
        });
    }


    /** Checks for collisions between thrown bottles and the end boss. */
    checkCollisionBottleEndboss() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (this.isBottleHitEndboss(bottle, enemy)) {
                    this.handleBottleHitEndboss(bottle, enemy);
                }
            });
        });
    }


    /**
     * Determines whether a bottle can damage the end boss.
     * @param {ThrowableObject} bottle - The bottle to check.
     * @param {Endboss} enemy - The enemy to check.
     * @returns {boolean} Whether the bottle hits a living end boss.
     */
    isBottleHitEndboss(bottle, enemy) {
        return enemy instanceof Endboss &&
            bottle.isColliding(enemy) &&
            !bottle.removeFromWorld &&
            enemy.energy > 0;
    }

    /**
     * Applies bottle damage to the end boss and consumes the bottle.
     * @param {ThrowableObject} bottle - The bottle that hit the end boss.
     * @param {Endboss} enemy - The end boss that was hit.
     */
    handleBottleHitEndboss(bottle, enemy) {
        enemy.energy = Math.max(0, enemy.energy - 20);
        this.statusbarEndboss.setPercentage(enemy.energy);
        bottle.removeFromWorld = true;
        this.updateEndbossHitState(enemy);
    }

    /**
     * Resets the end boss animation and updates its hurt or dead state.
     * @param {Endboss} enemy - The end boss whose hit state changed.
     */
    updateEndbossHitState(enemy) {
        enemy.currentImage = 0;

        if (enemy.energy === 0) {
            enemy.isDead = true;
        } else {
            enemy.isHurt = true;
        }
    }

    /** Removes enemies and bottles marked for removal from the world. */
    checkRemoveObjectsFromWorld() {
        this.level.enemies = this.level.enemies.filter(
            enemy => !enemy.removeFromWorld
        );

        this.throwableObjects = this.throwableObjects.filter(
            bottle => !bottle.removeFromWorld
        );
    }


    /** Collects coins touched by the character and updates the coin status bar. */
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

    /** Collects bottles touched by the character and updates the bottle status bar. */
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


    /** Draws the current frame and schedules the next animation frame. */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBackground();
        this.drawMovingObjects();
        this.drawFixedObjects();

        this.animationFrameId = requestAnimationFrame(() => {
            this.draw();
        });
    }


    /** Draws the background objects using the camera offset. */
    drawBackground() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);
    }

    /** Draws status bars that remain fixed on the screen. */
    drawFixedObjects() {
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarBottle);
        this.addToMap(this.statusbarCoin);

        if (this.statusbarEndboss.visible) {
            this.addToMap(this.statusbarEndboss);
        }
    }

    /** Draws the character and other objects that move with the camera. */
    drawMovingObjects() {
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
    }


    /**
     * Draws each object in an array on the world canvas.
     * @param {Array<DrawableObject>} objects - The objects to draw.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Draws an object and flips it when it faces the opposite direction.
     * @param {DrawableObject} mo - The object to draw.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);


        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Saves the canvas state and flips an object horizontally.
     * @param {DrawableObject} mo - The object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the object position and canvas state after a horizontal flip.
     * @param {DrawableObject} mo - The object to restore.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}