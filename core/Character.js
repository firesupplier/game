export class Character {

    constructor({
        colliding = false,
        pickups = [],
        /*
        0 -> NPC 1
        1 -> NPC 2
        */
        npcLocation = [
            [0, 0, -3], // Carlos
            [5, 0, -3], // Marjorie
            [10, 0, -3], // Isa
            [15, 0, -3], // Romeo
            [20, 0, -3], // Mermaid

            [-20, 0, -3], // Root Extract
            [-25, 0, -3], // Diver Fish
            [-30, 0, -3], // Scarfish
        ],
        isNearNPC = [false, false, false, false, false, false, false, false],
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

    getNPCCloseness() {
        return this.isNearNPC;
    }

}

window.Character = new Character();
export default window.Character;
