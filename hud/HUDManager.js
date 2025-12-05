export class HUDManager {

    constructor() {
        this.overlay = document.getElementById('hud-overlay');
        this.hudElements = new Map();
        this.nextId = 0;
        this.setupKeyboardControls();
        this.dialogueCounter = 0;
    }

// ---------------------------------------------------------------------------------------------

    setupKeyboardControls() { // This is here just for testing purposes. Will need to delete later
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowUp') { 
                this.dialogueCounter = 0;
                this.closeHUD();
            }
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight') {
                if (this.dialogueCounter == 0) {
                    this.showDialogue("The Root", "You shouldn't be here :3",);
                } else if (this.dialogueCounter == 1) {
                    this.showDialogue("The Root", "I said you shouldn't be here >:3", {textColor: 'red'})
                } else {
                    this.closeHUD();
                    this.dialogueCounter = -1;
                }
                this.dialogueCounter++;
                
            }
        });
    }

// ---------------------------------------------------------------------------------------------

    showHUD(options = {}) {
        const hudId = `hud-${this.nextId++}`

        const config = {
            id: hudId,
            title: '',
            text: '',
            position: 'center',
            width: '100%',
            height: '30%',
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            textColor: 'white',
            animation: 'fade-in',
            onClose: null,
            allowInteraction: true,
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

        // ---------------------------------------------------------------------------------------------

        hudElement.innerHTML = content;
        this.overlay.appendChild(hudElement);
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

    /*updateHud(hudId, newText) {
        const hud = this.hudElements.get(hudId);
        if (hud && hud.element) {
            const textElement = hud.element.querySelector('.hud-text')
            if (textElement) {
                const lines = newText.split('\n');
                let content = '';
                lines.forEach(line => {
                    content += `<div class="hud-line">${line}</div>`;
                });
                textElement.innerHTML = content;
            }
        }
    }*/

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
    }

// ---------------------------------------------------------------------------------------------

}

window.hudManager = new HUDManager(); // Is now globally accessible
export default window.hudManager;