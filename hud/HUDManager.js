import dialogueMaster from './dialogueMaster.js';
import Character from '../core/Character.js'

export class HUDManager {

    constructor() {
        this.overlay = document.getElementById('hud-overlay');
        this.hudElements = new Map();
        this.nextId = 0;
        this.setupKeyboardControls();
        this.buttonCallbacks = new Map();
        this.inDialogue = false;
        this.dialogueId = 0;
        this.NPCLocations = Character.getNPCCloseness();
        this.endGame = 0;

        this.canTalkTo = [0, 1, 0, 0, 0, 0, 0, 0];
        // 1 - can talk to (first dialogue)
        // 2 - can talk to (second dialogue)
        // 3 - can talk to (third dialogue)
        // 0 - cannot talk to
        // -1 - waiting for special conditions
        
    }

// Inventory:
/*
DFish,
SFish,
Pearl,
RootE
*/

// ---------------------------------------------------------------------------------------------
// Dialogue master controler

    isInInventory(item) {
        const inventory = Character.getInventory();
        for (let i = 0; i < inventory.length; i++) {
            if (inventory[i] === item) {
                return true;
            }
        }
        return false;
    }

    setupKeyboardControls() { 
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                if (this.inDialogue) {
                    dialogueMaster.inputReader(this.dialogueId);

                } else {
                    let isTalkingWith = -1;
                    for (let i = 0; i < this.NPCLocations.length; i++) {
                        if (this.NPCLocations[i]) {
                            isTalkingWith = i;
                            break;
                        }
                    }

                    dialogueMaster.updateDialogueCounter();

                    if (
                        this.isInInventory("DFish") &&
                        this.isInInventory("RootE") &&
                        this.isInInventory("Pearl") &&
                        this.canTalkTo[1] == -1
                    ) {
                        this.canTalkTo[1] = 2;
                    }
                    if (
                        this.isInInventory("SFish") &&
                        this.isInInventory("RootE") &&
                        this.isInInventory("Pearl") &&
                        this.canTalkTo[4] == -1 &&
                        this.canTalkTo[2] == -1
                    ) {
                        this.canTalkTo[2] = 2;
                    }

                    switch(isTalkingWith) {
                        // NPCs
                        case 0:
                            /*if (this.canTalkTo[0] == 1) { // Intro
                                this.dialogueId = 1;
                                dialogueMaster.inputReader(this.dialogueId);
                                this.canTalkTo = [0, 1, 0, 0, 0, 0, 0, 0];
                            } else */
                            if (this.canTalkTo[0] == 2) { // Carlos Good
                                this.dialogueId = 13;
                                dialogueMaster.inputReader(this.dialogueId);
                                this.canTalkTo = [0, 0, 0, 0, 0, 0, 0, 0];
                            } else if (this.canTalkTo[0] == 3) { // Carlos Bad
                                this.dialogueId = 14;
                                dialogueMaster.inputReader(this.dialogueId);
                                this.canTalkTo = [0, 0, 0, 0, 0, 0, 0, 0];
                            }
                            break;
                        case 1:
                            if (this.canTalkTo[1] == 1) { // Marjorie 1
                                this.dialogueId = 3;
                                dialogueMaster.inputReader(this.dialogueId);
                                this.canTalkTo = [0, -1, 1, 1, 0, 1, 1, 1];
                            } else if (this.canTalkTo[1] == 2) { // Marjorie 2
                                this.dialogueId = 11;
                                dialogueMaster.inputReader(this.dialogueId);
                                this.canTalkTo = [3, 0, 0, 0, 0, 0, 0, 0];
                            }
                            break;
                        case 2:
                            if (this.canTalkTo[2] == 1) { // Isa 1
                                this.dialogueId = 7;
                                dialogueMaster.inputReader(this.dialogueId);
                                this.canTalkTo[2] = -1;
                                this.canTalkTo[4] = 1;
                            } else if (this.canTalkTo[2] == 2) { // Isa 2
                                this.dialogueId = 12;
                                dialogueMaster.inputReader(this.dialogueId);
                                this.canTalkTo = [2, 0, 0, 0, 0, 0, 0, 0];
                            }
                            break;
                        case 3:
                            if (this.canTalkTo[3] == 1) { // Romeo 1
                                this.dialogueId = 15;
                                dialogueMaster.inputReader(this.dialogueId);
                                this.canTalkTo[3] = 0;
                            }
                            break;
                        case 4:
                            if (this.canTalkTo[4] == 1) { // Mermaid 1
                                this.dialogueId = 16;
                                dialogueMaster.inputReader(this.dialogueId);
                                this.canTalkTo[4] = -1;
                            }
                            break;
                        
                        // Items;
                        case 5:
                            if (this.canTalkTo[5] == 1) { // Root Extract
                                this.dialogueId = 20;
                                dialogueMaster.inputReader(this.dialogueId);
                                this.canTalkTo[5] = 0;
                            }
                            break;
                        case 6:
                            if (this.canTalkTo[6] == 1) { // Diver Fish
                                this.dialogueId = 21;
                                dialogueMaster.inputReader(this.dialogueId);
                                this.canTalkTo[6] = 0;
                            }
                            break;
                        case 7:
                            if (this.canTalkTo[7] == 1) { // Scarfish
                                this.dialogueId = 22;
                                dialogueMaster.inputReader(this.dialogueId);
                                this.canTalkTo[7] = 0;
                            }
                            break;
                    }
                }
            }
        });
    }

// --------------------------------------------------------------------------------------

    setDialogueId(ID) {
        this.dialogueId = ID;
    }

    setNPCLocation(i, value) {
        this.NPCLocations[i] = value;
    }

// ---------------------------------------------------------------------------------------------

    showHUD(options = {}) {
        this.inDialogue = true;
        const hudId = `hud-${this.nextId++}`

        const config = {
            id: hudId,
            title: '',
            text: '',
            position: 'center',
            width: '100%',
            height: '30%',
            background: 'rgba(0, 0, 0, 0.95)',
            textColor: 'white',
            animation: 'fade-in',
            onClose: null,
            allowInteraction: true,
            buttons: [],
            ...options
        };

        const hudElement = document.createElement('div');
        hudElement.id = hudId;
        hudElement.className = `hud-panel ${config.position} hud-${config.animation}`;

        Object.assign(hudElement.style, {
            background: config.background,
            color: config.textColor,
            width: config.width,
            height: config.height
        });

        // ---------------------------------------------------------------------------------------------

        let content = '';
        if (config.title) {
            content += `<div class="hud-title">${config.title}</div>`
        }

        if (config.text) {
            const lines = config.text.split('\n');
            content += `<div class="hud-text">`;
            lines.forEach(line => {
                content += `<div class = "hud-line">${line}</div>`;
            })
            content += '</div>'
        }

        if (config.buttons && config.buttons.length > 0) {
            content += `<div class="hud-buttons-container">`;
            config.buttons.forEach((button, index) => {
                const bId = `${hudId}-button-${index}`;
                content += `
                    <button id ="${bId}" class="hud-button" data-button-index="${index}">
                    ${button.text}
                    </button>
                `;
            });
            content += `</div>`;
        }

        // ---------------------------------------------------------------------------------------------

        hudElement.innerHTML = content;
        this.overlay.appendChild(hudElement);

        // ------------------------------------------------------

        if (config.buttons && config.buttons.length > 0) {
            config.buttons.forEach((button, index) => {
                const bId = `${hudId}-button-${index}`;
                const buttonElement = document.getElementById(bId);
                if (buttonElement) {
                    buttonElement.addEventListener('click', () => {
                        const callbackData = this.buttonCallbacks.get(bId);
                        if (callbackData && callbackData.callback) {
                            callbackData.callback()
                        }
                        if (button.buttonID !== undefined) {
                            const clickSound = document.getElementById("click-sound");   
                            clickSound.play();
                            dialogueMaster.updateDialogueCounter();
                            this.dialogueId = button.buttonID;
                            dialogueMaster.inputReader(button.buttonID);
                        }
                    })
                }
            });
        }

        // ------------------------------------------------------

        this.hudElements.set(hudId, {
            element: hudElement,
            config: config
        });
    }

// ---------------------------------------------------------------------------------------------
    
    showDialogue(title, text, options = {}) {
        this.closeHUD();
        return this.showHUD({
            title: title,
            text: text,
            animation: 'fade-in',
            position: 'center',
            ...options
        });
    }

// ---------------------------------------------------------------------------------------------

    closeHUD() {
        for (const hudId of this.hudElements.keys()) {
            const hud = this.hudElements.get(hudId);
            if (hud) {
                if (hud.config.onClose) {
                    hud.config.onClose();
                }

                if (hud.element.parentNode) {
                    hud.element.parentNode.removeChild(hud.element);
                }
                this.hudElements.delete(hudId);
            }
        }
        this.inDialogue = false;
    }

// ---------------------------------------------------------------------------------------------

    getDialogueValue() {
        return this.inDialogue;
    }

// ------------------------------------------------------------------------------------------

    getEndGame() {
        return this.endGame;
    }

    setEndGame(value) {
        this.endGame = value;
    }
}

window.hudManager = new HUDManager(); // Is now globally accessible
export default window.hudManager;
