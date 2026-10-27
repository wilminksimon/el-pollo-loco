class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;

    /** Loads the cloud image, assigns a random position, and starts movement. */
    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500;
        this.animate();
    }

    /** Moves the cloud to the left. */
    animate() {
        this.moveLeft();
    }



}