class Bottle extends MovableObject {
    height = 80;
    width = 80;
    offset = {
        top: 10,
        bottom: 0,
        left: 20,
        right: 10
    };

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 200 + Math.random() * 1500;
        this.y = 350;


        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 400);
    }
}