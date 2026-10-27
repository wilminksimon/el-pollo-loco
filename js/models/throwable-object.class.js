class ThrowableObject extends MovableObject {

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    hasHitGround = false;
    splash_sound = new Audio('audio/bottleBreaksShort.wav');

    /**
     * Creates a throwable bottle at the specified position and starts its throw.
     * @param {number} x - The initial horizontal position.
     * @param {number} y - The initial vertical position.
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_SPLASH);
        registerSound(this.splash_sound);
        this.x = x;
        this.y = y;
        this.direction = world.character.otherDirection ? -1 : 1;
        this.speedX = 7 + world.character.speed;
        this.height = 70;
        this.width = 60;
        this.throw();
    }

    /** Launches the bottle and starts updating its movement. */
    throw() {
        this.speedY = 30;

        setStoppableInterval(() => {
            if (!this.hasHitGround) {
                this.updateThrowMovement();
            }
        }, 25);
    }

    /** Updates the bottle position and handles impact with the ground. */
    updateThrowMovement() {
        this.x += this.speedX * this.direction;
        this.y -= this.speedY;
        this.speedY -= this.acceleration;

        if (this.y >= 350) {
            this.handleGroundImpact();
        }
    }

    /** Stops the bottle at ground level and starts its splash effect. */
    handleGroundImpact() {
        this.y = 350;
        this.hasHitGround = true;
        this.speedY = 0;
        this.playSplashSound();
        this.currentImage = 0;
        this.animateSplash();
    }

    /** Plays the bottle splash sound from the beginning. */
    playSplashSound() {
        this.splash_sound.currentTime = 0;
        this.splash_sound.play();
    }


    /** Plays the splash animation and removes the bottle when it finishes. */
    animateSplash() {
        this.currentImage = 0;

        let interval = setStoppableInterval(() => {
            if (this.currentImage < this.IMAGES_SPLASH.length) {
                this.playAnimation(this.IMAGES_SPLASH);
            } else {
                clearInterval(interval);
                this.removeFromWorld = true;
            }
        }, 100);
    }
}