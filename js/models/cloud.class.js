class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;

    /** Loads the cloud image, assigns a random position, and starts movement. */

    constructor(x, imageNumber) {
        super().loadImage(`img/5_background/layers/4_clouds/${imageNumber}.png`);

        this.x = x;
        this.animate();
    }


   
/**
 * Moves the cloud continuously to the left.
 */
animate() {
    setStoppableInterval(() => {
        this.moveLeft();
    }, 1000 / 60);
}

}