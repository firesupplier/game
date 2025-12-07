export class Character {

    constructor({
        colliding = false,
        pickups = [],
        /*
        0 -> NPC 1
        1 -> NPC 2
        */
        npcLocation = [
            [21, 2, -4.3], // Carlos
            [-17.12, 2, -0.84], // Marjorie
            [-9.25, 2, 0.86], // Isa
            [3, 2, 0], // Romeo
            [-22.42, 0, -4.46], // Mermaid

            [8.69, 0, -1.22], // Root Extract
            [-7.68, 2, -5.49], // Diver Fish
            [-2.68, 2, -5.49], // Scarfish
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
