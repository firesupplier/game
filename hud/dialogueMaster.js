import {showHUD, showDialogue, closeHUD} from './showHUD.js'

export class dialogueMaster{

    constructor() {
        this.dialogueCounter = 0;
        // -1 is reset dialogue
        // -2 is wait for input
    }

    // ID list for the input reader:
    /*
    
    */
    inputReader(ID) {
        const clickSound = document.getElementById("click-sound");   
        switch (ID) {
            case 0:
                if (this.dialogueCounter == 0) {
                    showDialogue("The Root", "You shouldn't be here :3",);
                    this.dialogueCounter = 1;
                } else if (this.dialogueCounter == 1) {
                    showDialogue("The Root", "I said you shouldn't be here >:3", {textColor: 'red',
                        buttons: [
                            {
                                text: "DIE!!!!!!!!!!",
                                buttonID: 1
                            },
                            {
                                text: "I love you :3",
                                buttonID: 2
                            }
                        ]}
                    );
                    this.dialogueCounter = -2;
                } else if (this.dialogueCounter == -1) {
                    closeHUD();
                    this.dialogueCounter = 0;
                }
                break;
            case 1:
                clickSound.currentTime = 0; 
                clickSound.play();
                showDialogue("The Root", "A naughty one are you? \nVery well then!");
                this.dialogueCounter = -1;
                break;
            case 2:
                clickSound.currentTime = 0; 
                clickSound.play();
                showDialogue("The Root", "Well I hate you :3");
                this.dialogueCounter = -1;
                break;
        }

    }
}

window.dialogueMaster = new dialogueMaster();
export default window.dialogueMaster;