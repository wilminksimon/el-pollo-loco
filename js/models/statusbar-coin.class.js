class StatusbarCoin extends Bars {


    /** Loads the coin status images and initializes the bar. */
    constructor() {
        super();
        this.IMAGES = [
            'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
        ]
        this.loadImages(this.IMAGES);
        this.y = 40;
        this.setPercentage(0);
    }

}