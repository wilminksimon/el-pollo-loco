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

    switch (e.code) {
        case "ArrowRight":
            keyboard.RIGHT = true;
            break;
        case "ArrowLeft":
            keyboard.LEFT = true;
            break;
        case "ArrowUp":
            keyboard.UP = true;
            break;
        case "ArrowDown":
            keyboard.DOWN = true;
            break;
        case "Space":
            keyboard.SPACE = true;
            break;
        case "KeyD":
            keyboard.D = true;
            break;
    }
});

window.addEventListener("keyup", (e) => {
    switch (e.code) {
        case "ArrowRight":
            keyboard.RIGHT = false;
            break;
        case "ArrowLeft":
            keyboard.LEFT = false;
            break;
        case "ArrowUp":
            keyboard.UP = false;
            break;
        case "ArrowDown":
            keyboard.DOWN = false;
            break;
        case "Space":
            keyboard.SPACE = false;
            break;
        case "KeyD":
            keyboard.D = false;
            break;
    }
});



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