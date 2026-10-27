class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 60;
    speed = 15;
    offset = {
        top: 60,
        bottom: 10,
        left: 25,
        right: 30
    };

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    hadFirstContact = false;
    isEntering = false;
    isAlerting = false;
    isChasing = false;
    isAttacking = false;
    isHurt = false;
    isDead = false;
    winScreenShown = false;
    energy = 100;
    lastHit = 0;
    lastCharacterHit = 0;


    /** Loads the end boss assets and starts its behavior loop. */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2900;
        this.animate();
    }


    /** Advances the end boss behavior according to its current state. */
    animate() {
        setStoppableInterval(() => {
            this.checkFirstContact();
            if (this.isDead) this.dead();
            else if (this.isHurt) this.hurt();
            else if (this.isEntering) this.entering();
            else if (this.isAlerting) this.alerting();
            else if (this.isChasing) this.chasing();
            else if (this.isAttacking) this.attacking();
        }, 100);
    }

    /** Starts the end boss entrance when the character reaches its trigger. */
    checkFirstContact() {
        if (world.character.x <= 2199 || this.hadFirstContact) return;
        this.hadFirstContact = true;
        this.isEntering = true;
        world.statusbarEndboss.visible = true;
    }

    /** Moves the end boss into position before it begins its attack. */
    entering() {
        this.x -= this.speed;
        this.playAnimation(this.IMAGES_WALKING);
        if (this.x > 2500) return;
        this.x = 2500;
        this.isEntering = false;
        this.isAlerting = true;
        this.currentImage = 0;
    }

    /** Plays the alert animation before the end boss starts attacking. */
    alerting() {
        this.playAnimation(this.IMAGES_ALERT);
        if (this.currentImage < this.IMAGES_ALERT.length) return;
        this.isAlerting = false;
        this.isAttacking = true;
        this.currentImage = 0;
    }

    /** Moves the end boss toward the character during a chase. */
    chasing() {
        this.playAnimation(this.IMAGES_WALKING);
        if (this.x > world.character.x + 200) {
            this.x -= 5;
            return;
        }
        this.isChasing = false;
        this.isAttacking = true;
        this.currentImage = 0;
    }

    /** Plays the attack animation and advances the end boss toward the character. */
    attacking() {
        this.playAnimation(this.IMAGES_ATTACK);
        if (this.x > world.character.x - 10) {
            this.x -= this.speed;
        }
        if (this.currentImage < this.IMAGES_ATTACK.length) return;
        this.currentImage = 0;
    }

    /** Plays the hurt animation and resumes attacking when it finishes. */
    hurt() {
        this.playAnimation(this.IMAGES_HURT);
        if (this.currentImage < this.IMAGES_HURT.length) return;
        this.isHurt = false;
        this.isAttacking = true;
        this.currentImage = 0;
    }

    /** Plays the death animation and displays the win screen once complete. */
    dead() {
        this.playAnimation(this.IMAGES_DEAD);

        if (this.currentImage < this.IMAGES_DEAD.length) return;
        this.currentImage = this.IMAGES_DEAD.length - 1;

        if (!this.winScreenShown) {
            this.winScreenShown = true;
            world.showWinScreen();
        }
    }


}