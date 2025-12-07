export class Character {

    constructor({
        colliding = false,
        pickups = [],
        /*
        0 -> NPC 1
        1 -> NPC 2
        */
        npcLocation = [
            [0, 0, 0],
            [-20, 0, -5]
        ],
        isNearNPC = [false, false],
    } = {}) {
        this.colliding = colliding;
        this.pickups = pickups;
        this.npcLocation = npcLocation;
        this.isNearNPC = isNearNPC;
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
