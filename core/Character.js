export class Character {

    constructor({
        colliding = false,
        pickups = [false],
    } = {}) {
        this.colliding = colliding;
        this.pickups = pickups;
    }

}