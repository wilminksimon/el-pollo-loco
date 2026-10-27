class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    coins = 0;
    bottles = 0;
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };


    /** Applies gravity to the object while it is airborne. */
    applyGravity() {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * Checks whether the object is above the ground.
     * @returns {boolean} Whether the object is considered airborne.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else if (this instanceof Character && this.isDead()) {
            return true;
        } else {
            return this.y < 150;
        }
    }

    // character.isColliding(chicken);
    /**
     * Checks whether this object overlaps another object, accounting for offsets.
     * @param {MovableObject} mo - The object to check against.
     * @returns {boolean} Whether the objects are colliding.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /** Reduces the object's energy and records the time of the hit. */
    hit() {
        let wasHurt = this.isHurt();
        this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
            if (!wasHurt && this instanceof Character) {
                this.hurt_sound.currentTime = 0;
                this.hurt_sound.play();
            }
        }
    }

    /** Adds coins to the inventory, capped at 100. */
    collectCoin() {
        this.coins += 20;

        if (this.coins > 100) {
            this.coins = 100;
        }
    }

    /** Adds bottles to the inventory, capped at the inventory limit. */
    collectBottle() {
        this.bottles += 20;

        if (this.bottles > this.maxBottleInventory) {
            this.bottles = this.maxBottleInventory;
        }
    }

    /**
     * Checks whether the object was hit within the last second.
     * @returns {boolean} Whether the object is currently hurt.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 1;
    }

    /**
     * Checks whether the object's energy has reached zero.
     * @returns {boolean} Whether the object is dead.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Displays the next frame from an animation sequence.
     * @param {Array<string>} images - The image paths in the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /** Moves the object to the right by its current speed. */
    moveRight() {
        this.x += this.speed;
    }

    /** Moves the object to the left by its current speed. */
    moveLeft() {
        this.x -= this.speed;
    }

    /** Applies upward velocity to the object. */
    jump() {
        this.speedY = 30;
    }
}