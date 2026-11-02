class Bars extends DrawableObject {


    percentage = 100;

    /** Loads the health status images and initializes the bar. */
    constructor() {
        super();
        this.x = 40;
        this.y = 0;
        this.width = 200;
        this.height = 60;
    }

    /**
     * Updates the displayed health amount.
     * @param {number} percentage - The current health as a percentage.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Selects the status image for the current health amount.
     * @returns {number} The index of the matching image.
     */

resolveImageIndex() {
    if (this.percentage <= 0) {
        return 0;
    } else if (this.percentage <= 20) {
        return 1;
    } else if (this.percentage <= 40) {
        return 2;
    } else if (this.percentage <= 60) {
        return 3;
    } else if (this.percentage <= 80) {
        return 4;
    } else {
        return 5;
    }
}
}