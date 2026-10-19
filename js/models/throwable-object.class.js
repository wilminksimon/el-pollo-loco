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

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 70;
        this.width = 60;
        this.throw();
    }

    throw() {
        this.speedY = 30;

        setStoppableInterval(() => {
            if (!this.hasHitGround) {
                this.x += 10;

                this.y -= this.speedY;
                this.speedY -= this.acceleration;

                if (this.y >= 350) {
                    this.y = 350;
                    this.hasHitGround = true;
                    this.speedY = 0;

                    this.splash_sound.currentTime = 0;
                    this.splash_sound.play();

                    this.currentImage = 0;
                    this.animateSplash();
                }
            }
        }, 25);
    }

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