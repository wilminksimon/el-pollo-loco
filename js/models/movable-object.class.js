class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = [];

    // loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image();  // Create a new image object
        this.img.src = path;     // Set the source of the image to the provided path
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {

    }
}