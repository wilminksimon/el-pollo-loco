class Character extends MovableObject {
    height = 280;
    y = 80;
    speed = 10;
    maxBottleInventory = 100;
    offset = {
        top: 120,
        bottom: 10,
        left: 20,
        right: 30
    };


    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ]

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ]

    IMAGES_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ]

    world;
    deadAnimationFinished = false;
    deadAnimationStarted = false;
    isFallingAfterDeath = false;
    walking_sound = new Audio('audio/walk.mp3');
    snoring_sound = new Audio('audio/snore.wav');
    jump_sound = new Audio('audio/jump.wav');
    hurt_sound = new Audio('audio/hurt.mp3');
    dead_sound = new Audio('audio/fall-down.mp3');



    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.walking_sound.loop = true;
        this.walking_sound.volume = 0.4;
        registerSound(this.walking_sound);
        registerSound(this.jump_sound);
        registerSound(this.snoring_sound);
        registerSound(this.hurt_sound);
        registerSound(this.dead_sound);
        this.snoring_sound.loop = true;
        this.snoring_sound.volume = 0.5;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.applyGravity();
        this.animate();
        this.snoring_sound.loop = true;
        this.dead_sound_played = false;
    }

    animate() {

        setStoppableInterval(() => {
            if (this.isDead()) {
                this.walking_sound.pause();
                this.snoring_sound.pause();
                this.world.keyboard.RIGHT = false;
                this.world.keyboard.LEFT = false;
                this.world.keyboard.SPACE = false;
                return;
            }

            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.snoring_sound.pause();
                if (!this.isAboveGround()) {
                    this.walking_sound.play();
                }
            }

            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                this.snoring_sound.pause();
                if (!this.isAboveGround()) {
                    this.walking_sound.play();
                }
            }

            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.walking_sound.pause();
                this.jump_sound.currentTime = 0;
                this.jump_sound.play();
                this.jump();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);


        setStoppableInterval(() => {
            let timepassed = (new Date().getTime() - this.world.keyboard.lastKeyPress) / 1000;

            if (this.isDead()) {
                if (!this.deadAnimationStarted) {
                    this.currentImage = 0;
                    this.deadAnimationStarted = true;
                }

                if (!this.deadAnimationFinished) {
                    this.playAnimation(this.IMAGES_DEAD);

                    if (this.currentImage >= this.IMAGES_DEAD.length) {
                        this.deadAnimationFinished = true;
                        this.currentImage = this.IMAGES_DEAD.length - 1;
                        this.isFallingAfterDeath = true;
                        this.speedY = 0;
                    }
                }
                if (!this.dead_sound_played) {
                    this.dead_sound.currentTime = 0;
                    this.dead_sound.play();
                    this.dead_sound_played = true;
                }
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (timepassed > 7) {
                this.playAnimation(this.IMAGES_IDLE_LONG);

                if (this.snoring_sound.paused) {
                    this.snoring_sound.play();
                }
            } else {
                this.playAnimation(this.IMAGES_IDLE);
                this.snoring_sound.pause();
                this.snoring_sound.currentTime = 0;
            }
        }, 95);
    }


    jump() {
        this.speedY = 30;
    }
}
