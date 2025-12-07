export class Character {

    constructor({
        colliding = false,
        pickups = [],
    } = {}) {
        this.colliding = colliding;
        this.pickups = pickups;
    }

    addItem(item) {
        this.pickups.push(item);
    }

    getInventory() {
        return this.pickups;
    }

}

window.Character = new Character();
export default window.Character;
