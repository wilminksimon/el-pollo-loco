/**
 * Creates and returns the first level with its objects and enemies.
 * @returns {Level} The configured first level.
 */
function createLevel1() {
    return new Level(

        [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin()
        ],

        [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle()
        ],

        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new Endboss()
        ],

        [
            new Cloud(0, 1),
            new Cloud(500, 2),
            new Cloud(1000, 1),
            new Cloud(1500, 2),
            new Cloud(2000, 1),
            new Cloud(2500, 2),
            new Cloud(3000, 2),
            new Cloud(3500, 2),
        ],

        [
            new BackgroundObject('img/5_background/layers/air.png', -720),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -720),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -720),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -720),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

            new BackgroundObject('img/5_background/layers/air.png', 720),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720),

            new BackgroundObject('img/5_background/layers/air.png', 720 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 720 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 720 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 720 * 2),

            new BackgroundObject('img/5_background/layers/air.png', 720 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720 * 3),
        ],


    );
}