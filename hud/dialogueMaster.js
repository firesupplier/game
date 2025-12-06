import {showHUD, showDialogue, closeHUD, setDialogueId} from './showHUD.js'

export class dialogueMaster{

    constructor() {
        this.dialogueCounter = 0;
        // -1 is reset dialogue
        // -2 is wait for input
    }

    // ID list for the input reader and dialogueID:
    /*
        1,2 - Introduction (Intro)
        3, 4, 5, 6 - Alchemist: first meeting (Marjorie 1)
        7 - Isa 1
    */
    updateDialogueCounter() {
        this.dialogueCounter = 0;
    }

    exitHUD() {
        setDialogueId(0);
        this.updateDialogueCounter();
        closeHUD();
    }
    
    inputReader(Identity) {
        switch (Identity) {
            // ---------------------------------------------------------------------------------------------------------------------------------------
            // Dialogue selector

            case 0:
                if (this.dialogueCounter == 0) {
                    showDialogue("", "Pick which conversation you would like to have.", {
                    buttons: [
                        {
                            text: "Intro",
                            buttonID: 1
                        },
                        {
                            text: "Marjorie 1",
                            buttonID: 3
                        },
                        {
                            text: "Isa 1",
                            buttonID: 7
                        }
                    ]
                    });
                    this.dialogueCounter = -2;
                }
                break;
                
            // Dialogue selector
            // ---------------------------------------------------------------------------------------------------------------------------------------
            // Intro dialogue
            
            case 1:
                switch (this.dialogueCounter) {
                    case 0:
                        showDialogue("???", "Hhh...");
                        this.dialogueCounter = 1;
                        break;
                    case 1:
                        showDialogue("???", "Hhh... Ah... Hmph...");
                        this.dialogueCounter = 2;
                        break;
                    case 2:
                        showDialogue("???", "AAAAAAAAAAAA", {
                            buttons: [
                                {
                                    text: "I hear you... Quiet down, will you, please?",
                                    buttonID: 2
                                }
                            ]
                        });
                        this.dialogueCounter = -2
                        break;
                }
                break;
            case 2:
                switch (this.dialogueCounter) {
                    case 0:
                        showDialogue("You", "Just...");
                        this.dialogueCounter = 1;
                        break;
                    case 1:
                        showDialogue("You", "Just... give me a second to get up? I'll be right there.");
                        this.dialogueCounter = 2;
                        break;
                    case 2:
                        showDialogue("You", "...");
                        this.dialogueCounter = 3;
                        break;
                    case 3:
                        showDialogue("You", "Ugh. Okay. I'm up. How've you been, Carlos?");
                        this.dialogueCounter = 4;
                        break;
                    case 4:
                        showDialogue("Carlos?", "Uggghhhhhh..?");
                        this.dialogueCounter = 5;
                        break;
                    case 5:
                        showDialogue("You", "I know I shouldn't expect an answer out of you, but can you really blame me for trying?");
                        this.dialogueCounter = 6;
                        break;
                    case 6:
                        showDialogue("Carlos?", "Mhhhhaghhh...");
                        this.dialogueCounter = 7;
                        break;
                    case 7:
                        showDialogue("You", "...");
                        this.dialogueCounter = 8;
                        break;
                    case 8:
                        showDialogue("You", "I'm sorry...");
                        this.dialogueCounter = 9;
                        break;
                    case 9:
                        showDialogue("You", "...");
                        this.dialogueCounter = 10;
                        break;
                    case 10:
                        showDialogue("You", "I'm going to make this right... I promise you...");
                        this.dialogueCounter = 11;
                        break;
                    case 11:
                        this.exitHUD();
                        break;
                    
                }
                break;

            // Intro dialogue
            // ---------------------------------------------------------------------------------------------------------------------------------------
            // Marjorie 1

            case 3:
                switch(this.dialogueCounter) {
                    case 0:
                        showDialogue("Alchemist", "Welcome, weary traveller! What brings you to Solimoor?");
                        this.dialogueCounter = 1;
                        break;
                    case 1:
                        showDialogue("You", "...");
                        this.dialogueCounter = 2;
                        break;
                    case 2:
                        showDialogue("You", "You're joking, right?");
                        this.dialogueCounter = 3;
                        break;
                    case 3:
                        showDialogue("Alchemist", "Oh, my dear, I am not! You reak of the outside!");
                        this.dialogueCounter = 5;
                        break;
                    case 5:
                        showDialogue("You", "None of your business.");
                        this.dialogueCounter = 6;
                        break;
                    case 6:
                        showDialogue("Alchemist", "My, my. There's no need to get feisty.");
                        this.dialogueCounter = 7;
                        break;
                    case 7:
                        showDialogue("Marjorie", "My name is Marjorie. The better alchemist in Solimoor!");
                        this.dialogueCounter = 8;
                        break;
                    case 8:
                        showDialogue("You", "Who is the other one then? I've only seen this shop.");
                        this.dialogueCounter = 9;
                        break;
                    case 9:
                        showDialogue("Marjorie", "My twin sister's shop is a couple of metres away from mine. Though luckily she isn't there right now!");
                        this.dialogueCounter = 10;
                        break;
                    case 10:
                        showDialogue("You", "I'm sorry about that..?");
                        this.dialogueCounter = 11;
                        break;
                    case 11:
                        showDialogue("Marjorie", "Don't be. She's horrible at her job.", {
                            buttons: [
                                {
                                    text: "Can you tell me more about her?",
                                    buttonID: 4
                                },
                                {
                                    text: "I'll take your word for it.",
                                    buttonID: 5
                                }
                            ]
                        });
                        this.dialogueCounter = -2;
                        break;
                }
                break;
            case 4:
                switch (this.dialogueCounter) {
                    case 0:
                        showDialogue("Marjorie", "Ugh!");
                        this.dialogueCounter = 1;
                        break;
                    case 1:
                        showDialogue("Marjorie", "I'm sorry, do you not want to do business with me?");
                        this.dialogueCounter = 2;
                        break;
                    case 2:
                        showDialogue("You", "I do. I was just curious what she had done to make you detest her.");
                        this.dialogueCounter = 3;
                        break;
                    case 3:
                        showDialogue("Marjorie", "Fine. But you better not regret asking.");
                        this.dialogueCounter = 4;
                        break;
                    case 4:
                        showDialogue("Marjorie", "A couple of years back, we went down into the mines below Solimoor together. She desperately wanted to find the physical body of the Root and I decided to acompany her.");
                        this.dialogueCounter = 5;
                        break;
                    case 5:
                        showDialogue("Marjorie", "Much to her dismay, all she found was the corpse of a young girl. Who somehow went outside for long enough to get partially turned and came back here part fish, only to die alone.");
                        this.dialogueCounter = 6;
                        break;
                    case 6:
                        showDialogue("Marjorie", "But that didn't stop her from forcing me to evaluate the obvious corpse!");
                        this.dialogueCounter = 7;
                        break;
                    case 7:
                        showDialogue("Marjorie", "And what did that lead to?! Me having to chop off my own hand due to an outer infection.");
                        this.dialogueCounter = 8;
                        break;
                    case 8:
                        showDialogue("Marjorie", "And she didn't even care to help stop the bleeding. All she could think about and talk about was the Root!");
                        this.dialogueCounter = 9;
                        break;
                    case 9:
                        showDialogue("Marjorie", "Does that help clear it up?");
                        this.dialogueCounter = 10;
                        break;
                    case 10:
                        showDialogue("You", "Thank you. It does.");
                        setDialogueId(6);
                        this.updateDialogueCounter();
                        break;
                }
                break;
            case 5:
                switch (this.dialogueCounter) {
                    case 0:
                        showDialogue("Marjorie", "You didn't strike me as the nice kind.");
                        this.dialogueCounter = 1;
                        break;
                    case 1:
                        showDialogue("Marjorie", "Anyway, I appreciate not being pried into.");
                        this.dialogueCounter = 2;
                        break;
                    case 2:
                        showDialogue("You", "I'm just here to do business.");
                        this.dialogueCounter = 3;
                        break;
                    case 3:
                        showDialogue("Marjorie", "I am however, interested in how you managed to make it all the way through the sea to Solimoor. And by the looks of it, you managed to do so without a single infection!");
                        this.dialogueCounter = 4;
                        break;
                    case 4:
                        showDialogue("Marjorie", "Are you perhaps a Root Whisperer?");
                        this.dialogueCounter = 5;
                        break;
                    case 5:
                        showDialogue("Marjorie", "No. You don't have that smell about you. Unlike crazy old Romeo down the street.");
                        this.dialogueCounter = 6;
                        break;
                    case 6:
                        showDialogue("Marjorie", "No. You're a Necromancer, aren't you?");
                        this.dialogueCounter = 7;
                        break;
                    case 7:
                        showDialogue("You", "I didn't pry into you, so I'd appreciate it if you didn't pry into me.");
                        this.dialogueCounter = 8;
                        break;
                    case 8:
                        showDialogue("Marjorie", "Of course, of course, I apologise, kind sir!");
                        setDialogueId(6);
                        this.updateDialogueCounter();
                        break;
                }
                break;
            case 6:
                switch (this.dialogueCounter) {
                    case 0:
                        showDialogue("Marjorie", "Now, where were we again?");
                        this.dialogueCounter = 1;
                        break;
                    case 1:
                        showDialogue("Marjorie", "Ah, right! I was going to ask your name.");
                        this.dialogueCounter = 2;
                        break;
                    case 2:
                        showDialogue("You", "And I was once again going to say that it's none of your business.");
                        this.dialogueCounter = 3;
                        break;
                    case 3:
                        showDialogue("Marjorie", "Heh.");
                        this.dialogueCounter = 4;
                        break;
                    case 4:
                        showDialogue("Marjorie", "Nevermind that then! What brings you to my shop?");
                        this.dialogueCounter = 5;
                        break;
                    case 5:
                        showDialogue("You", "I heard tell that an alchemist in Solimoor is capable of making a Vita Radicata Potion.");
                        this.dialogueCounter = 6;
                        break;
                    case 6:
                        showDialogue("Marjorie", "Hmmm...");
                        this.dialogueCounter = 7;
                        break;
                    case 7:
                        showDialogue("Marjorie", "Indeed you heard correctly! And I am that achemist.");
                        this.dialogueCounter = 8;
                        break;
                    case 8:
                        showDialogue("You", "So, how much will it cost me?");
                        this.dialogueCounter = 9;
                        break;
                    case 9:
                        showDialogue("Marjorie", "Well, a potion of life is not something that's easy to make.");
                        this.dialogueCounter = 10;
                        break;
                    case 10:
                        showDialogue("You", "I'm willing to pay any price necesarry.");
                        this.dialogueCounter = 11;
                        break;
                    case 11:
                        showDialogue("Marjorie", "In that case, I only require the materials.");
                        this.dialogueCounter = 12;
                        break;
                    case 12:
                        showDialogue("Marjorie", "I need diver fish blood, a small piece of a Root extract and a fargment of a pearl.");
                        this.dialogueCounter = 13;
                        break;
                    case 13:
                        showDialogue("Marjorie", "You can find the diver fish near the docks.\nThe town nut, Romeo, should have a pearl on his person.\n And you can easily get the Root extract by cutting off a tiny pice of the roots all around town.");
                        this.dialogueCounter = 14;
                        break;
                    case 14:
                        showDialogue("You", "That sounds too easy. What's the catch?");
                        this.dialogueCounter = 15;
                        break;
                    case 15:
                        showDialogue("Marjorie", "Well, not everyone can make it! And I would gladly do this kind gesture for you! I mean, you are trying to save someone, are you not?");
                        this.dialogueCounter = 16;
                        break;
                    case 16:
                        showDialogue("You", "Yes...");
                        this.dialogueCounter = 17;
                        break;
                    case 17:
                        showDialogue("Marjorie", "Well, in that case we have a deal. Bring me the meterials and I shal make the Vita Radicata Potion.");
                        this.dialogueCounter = 18;
                        break;
                    case 18:
                        showDialogue("You", "I'll be back soon.");
                        this.dialogueCounter = 19;
                        break;
                    case 19:
                        showDialogue("Marjorie", "I'm counting on it!");
                        this.dialogueCounter = 20;
                        break;
                    case 20:
                        this.exitHUD();
                        break;
                }
                break;

            // Marjorie 1    
            // ---------------------------------------------------------------------------------------------------------------------------------------
            // Isa 1
        }
    }
}

window.dialogueMaster = new dialogueMaster();
export default window.dialogueMaster;
