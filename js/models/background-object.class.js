class BackgroundObject extends MovableObject {

    width = 720;
    height = 480;

    /**
     * Loads a background image and positions it horizontally at the ground.
     * @param {string} imagePath - The background image source path.
     * @param {number} x - The horizontal position of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.y = 480 - this.height;
        this.x = x;
    }
}