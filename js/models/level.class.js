class Level {
    coin;
    bottle;
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2200;

    constructor(coin, bottle, enemies, clouds, backgroundObjects){
        this.coin = coin;
        this.bottle = bottle;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}