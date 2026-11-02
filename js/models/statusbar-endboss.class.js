class StatusbarEndboss extends Bars {

    visible = false;

    /** Loads the end boss status images and initializes the bar. */
    constructor() {
        super();
        this.IMAGES = [
            'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
            'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
            'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
            'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
            'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
            'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
        ];
        this.loadImages(this.IMAGES);
        this.setPercentage(100);
        this.x = 350;
        this.y = 10;
        this.width = 250;
    }
}