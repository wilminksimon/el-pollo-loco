let canvas;
let world;
let keyboard = new Keyboard();
let touchEventsBound = false;


/** Initializes the game world and binds touch controls. */
function init() {
    bindTouchEvents();
    canvas = document.getElementById('canvas');
    keyboard.lastKeyPress = new Date().getTime();
    world = new World(canvas, keyboard);
}

window.addEventListener("keydown", (e) => {

    keyboard.lastKeyPress = new Date().getTime();

    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }
})

window.addEventListener("keyup", (e) => {

    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
})




/** Binds touch controls once and updates their visibility on resize. */
function bindTouchEvents() {
    if (touchEventsBound) {
        return;
    }

    touchEventsBound = true;
    window.addEventListener('resize', showMobileControls);

    bindTouchButton('touch-left', 'LEFT');
    bindTouchButton('touch-right', 'RIGHT');
    bindTouchButton('touch-jump', 'SPACE');
    bindTouchButton('touch-throw', 'D');
}


/**
 * Connects a touch button to a keyboard control.
 * @param {string} buttonId - The ID of the touch button.
 * @param {string} key - The keyboard control to update.
 */
function bindTouchButton(buttonId, key) {
    let button = document.getElementById(buttonId);

    button.addEventListener('touchstart', (event) => {
        startTouch(event, key);
    });

    button.addEventListener('touchend', () => {
        keyboard[key] = false;
    });
}

/**
 * Prevents the default touch action and activates the matching control.
 * @param {TouchEvent} event - The touch event to handle.
 * @param {string} key - The keyboard control to activate.
 */
function startTouch(event, key) {
    event.preventDefault();
    keyboard.lastKeyPress = new Date().getTime();
    keyboard[key] = true;
}