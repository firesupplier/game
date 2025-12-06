import dialogueMaster from './dialogueMaster.js';

export class HUDManager {

    constructor() {
        this.overlay = document.getElementById('hud-overlay');
        this.hudElements = new Map();
        this.nextId = 0;
        this.setupKeyboardControls();
        this.buttonCallbacks = new Map();
        this.inDialogue = false;
        this.dialogueId = 0;
    }

// ---------------------------------------------------------------------------------------------

    setupKeyboardControls() { // Scrolling through dialogue
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                dialogueMaster.inputReader(this.dialogueId);
            }
        });
    }

    setDialogueId(ID) {
        this.dialogueId = ID;
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
}

window.hudManager = new HUDManager(); // Is now globally accessible
export default window.hudManager;
