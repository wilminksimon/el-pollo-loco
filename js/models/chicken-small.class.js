class ChickenSmall extends MovableObject {
    energy = 15;
    y = 372;
    height = 50;
    width = 60;
    dead = false;
    lastCharacterHit = 0;
    dead_sound = new Audio('audio/chickenhurt.wav');

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /** Loads the small chicken assets and starts its movement and animation. */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        registerSound(this.dead_sound);

        this.x = 400 + Math.random() * 1600;
        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();
    }

    /** Marks the small chicken as dead and removes it from the world after a delay. */
    die() {
        if (this.dead) return;
        this.dead = true;
        this.img = this.imageCache[this.IMAGES_DEAD[0]];
        this.dead_sound.play();
        
        setTimeout(() => {
            this.removeFromWorld = true;
        }, 2000);
    }

/** Moves the small chicken and plays its walking animation while it is alive. */
animate() {
    setStoppableInterval(() => {
        if (!this.dead) {
            this.moveLeft();
        }
    }, 1000 / 60);

    setStoppableInterval(() => {
        if (!this.dead) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }, 200);
}

}