class DrawableObject {
    img;
    imageCache = [];
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    // loadImage('img/test.png');
    loadImage(path) {
        this.img = new Image();  // Create a new image object
        this.img.src = path;     // Set the source of the image to the provided path
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

drawFrame(ctx) {
    if (this.offset) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'blue';

        ctx.rect(
            this.x + this.offset.left,
            this.y + this.offset.top,
            this.width - this.offset.left - this.offset.right,
            this.height - this.offset.top - this.offset.bottom
        );

        ctx.stroke();
    }
}

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


}