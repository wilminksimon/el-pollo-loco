class Level {
    coin;
    bottle;
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2200;

    /**
     * Creates a level from its object collections.
     * @param {Array<Coin>} coin - The coins in the level.
     * @param {Array<Bottle>} bottle - The collectible bottles in the level.
     * @param {Array<MovableObject>} enemies - The enemies in the level.
     * @param {Array<Cloud>} clouds - The clouds in the level.
     * @param {Array<BackgroundObject>} backgroundObjects - The background layers.
     */
    constructor(coin, bottle, enemies, clouds, backgroundObjects){
        this.coin = coin;
        this.bottle = bottle;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}