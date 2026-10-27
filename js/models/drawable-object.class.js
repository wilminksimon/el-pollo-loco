class DrawableObject {
    img;
    imageCache = [];
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    // loadImage('img/test.png');
    /**
     * Loads an image from the given path.
     * @param {string} path - The image source path.
     */
    loadImage(path) {
        this.img = new Image();  // Create a new image object
        this.img.src = path;     // Set the source of the image to the provided path
    }

    /**
     * Draws the image on the canvas at this object's position and size.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }



    /**
     * Loads and caches each image from the provided paths.
     * @param {Array<string>} arr - The image source paths to load.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


}