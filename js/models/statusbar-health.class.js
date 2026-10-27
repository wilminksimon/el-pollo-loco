class StatusbarHealth extends DrawableObject {


    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ]

    percentage = 100;

    /** Loads the health status images and initializes the bar. */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 40;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Updates the displayed health amount.
     * @param {number} percentage - The current health as a percentage.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
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