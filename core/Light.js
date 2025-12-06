export class Light {
    constructor({
        color = [1,1,1],
        direction = [0,0,1],
        blinking = false,
        baseColor = null,
    } = {}) {
        this.color = color;
        this.direction = direction;
        this.blinking = blinking;
        this.baseColor = baseColor ?? [...color]; // store original color
    }
}
