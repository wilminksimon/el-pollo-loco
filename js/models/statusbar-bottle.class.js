class StatusbarBottle extends Bars {



    /** Loads the bottle status images and initializes the bar. */
    constructor() {
        super();
        this.IMAGES = [
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
        ];

        this.loadImages(this.IMAGES);
        this.y = 80;
        this.setPercentage(0);
    }
}