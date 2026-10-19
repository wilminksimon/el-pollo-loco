class Coin extends MovableObject {
    offset = {
        top: 50 ,
        bottom: 50,
        left: 30,
        right: 30
    };

    IMAGES_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COIN);
        this.x = 200 + Math.random() * 1500;
        this.y = 250 - Math.random() * 200;

        this.animate();
    }

    animate() {
        setStoppableInterval(() => {
            this.playAnimation(this.IMAGES_COIN);
        }, 300);
    }

}