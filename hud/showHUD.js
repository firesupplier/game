import hudManager from './HUDManager.js';

// ---------------------------------------------------------------------------------------------

export function showHUD(text, options = {}) {
    if (typeof text === 'object') {
        return hudManager.showHUD(text)
    }
    return  hudManager.showHUD({
        text: text,
        ...options
    });   
}

// ---------------------------------------------------------------------------------------------

export function showDialogue(title, text, options = {}) {
    return hudManager.showDialogue(title, text, options);
}

/*export function updateHUD(hudId, text) {
    hudManager.updateHud(hudId, text);
}*/

export function closeHUD() {
    hudManager.closeHUD();
}

// ---------------------------------------------------------------------------------------------