import {showHUD, showDialogue, closeHUD, setDialogueId} from './showHUD.js'

export class dialogueMaster{

    constructor() {
        this.dialogueCounter = 0;
        // -1 is reset dialogue
        // -2 is wait for input
        this.talkedWithMAboutI = false;
        this.IaboutH = false;
        this.HaboutL = false;
    }

    // ID list for the input reader and dialogueID:
    /*
        1,2 - Introduction (Intro)
        3, 4, 5, 6 - Alchemist: first meeting (Marjorie 1)
        7, 8, 9, 10 - Isa 1
        11 - Marjorie 2
        12 - Isa 2
        13 - Carlos Final Good
        14 - Carlos Final Bad
        15 - Romeo 1
        16 - Marmaid 1
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
                        },
                        {
                            text: "Romeo 1",
                            buttonID: 15
                        },
                        {
                            text: "Mermaid 1",
                            buttonID: 16
                        },
                        {
                            text: "Marjorie 2",
                            buttonID: 11
                        },
                        {
                            text: "Isa 2",
                            buttonID: 12
                        },
                        {
                            text: "Carlos Final Bad",
                            buttonID: 14
                        },
                        {
                            text: "Carlos Final Good",
                            buttonID: 13
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
                        this.talkedWithMAboutI = true;
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

            case 7:
                switch (this.dialogueCounter) {
                    case 0:
                        showDialogue("Isa", "Hi there! I'm Isa. The other alchemist in town.");
                        this.dialogueCounter = 1;
                        break;
                    case 1:
                        showDialogue("Isa", "I'm surprised you wanted to come visit me after talking with my sister. I overheard her talking to someone, though I don't know exactly what about.");
                        this.dialogueCounter = 2;
                        break;
                    case 2:
                        if (this.talkedWithMAboutI) {
                            showDialogue("Isa", "Out of curiosity: what did she spin about me this time?", {
                                buttons: [
                                    {
                                        text: "About what happened to her hand.",
                                        buttonID: 8
                                    },
                                    {
                                        text: "Nothing, beside the fact that she doesn't like you very much.",
                                        buttonID: 9
                                    }
                                ]
                            });
                        } else {
                            showDialogue("Isa", "Out of curiosity: what did she spin about me this time?", {
                                buttons: [
                                    {
                                        text: "Nothing, beside the fact that she doesn't like you very much.",
                                        buttonID: 9
                                    }
                                ]
                            });
                        }
                        
                        this.dialogueCounter = -2;
                        break;
                }
                break;
            case 8:
                switch(this.dialogueCounter) {
                    case 0:
                        this.IaboutH = true;
                        showDialogue("Isa", "Not my fault she can't keep her hands to herself.");
                        this.dialogueCounter = 1;
                        break;
                    case 1:
                        showDialogue("Isa", "Though, I do hope that isn't going to disuade you from wanting to talk with me.");
                        this.dialogueCounter = 2;
                        break;
                    case 2:
                        showDialogue("Isa", "She's been spreading that story around Solimoor since it happened, while conveniently forgetting to mention that we were both being guided by The Root, when going down there. They wanted us to find them. Sadly we failed, only finding a neglected mermaid-like girl.");
                        this.dialogueCounter = 3;
                        break;
                    case 3:
                        showDialogue("Isa", "I don't know where that girl is right now, but I do hope she's safe.");
                        this.dialogueCounter = 4;
                        break;
                    case 4:
                        showDialogue("You", "Marjorie said the girl was dead.");
                        this.dialogueCounter = 5;
                        break;
                    case 5:
                        showDialogue("Isa", "Oh? Far from it. Marjorie just doesn't know it. You might be able to find her somewhere in town. Though I've no clue where. Tell her I said 'Hi', if you do. And be careful about what you tell her, she is impresively knowledgable.");
                        this.dialogueCounter = 6;
                        break;
                    case 6:
                        showDialogue("You", "I'll keep all that in mind.");
                        setDialogueId(10);
                        this.updateDialogueCounter();
                        break;
                }
                break;
            case 9:
                switch(this.dialogueCounter) {
                    case 0:
                        showDialogue("Isa", "Well, in that case, I don't think that's much of a hurdle, when it comes to talking with me.");
                        this.dialogueCounter = 1;
                        break;
                    case 1:
                        showDialogue("You", "There is indeed not.");
                        this.dialogueCounter = 2;
                        break;
                    case 2:
                        showDialogue("You", "And from my impression of you so far, I'd easier see you having a problem with her, not the other way around.");
                        this.dialogueCounter = 3;
                        break;
                    case 3:
                        showDialogue("Isa", "Welp, that just comes with being a twin.");
                        setDialogueId(10);
                        this.updateDialogueCounter();
                        break;
                }
                break;
            case 10:
                switch(this.dialogueCounter) {
                    case 0:
                        showDialogue("Isa", "Well, anyway, what did you want to talk about?");
                        this.dialogueCounter = 1;
                        break;
                    case 1:
                        showDialogue("You", "Just wanted to ask, if Marjorie is the only one capable of making a Vita Radicata Potion? Something about her struck me as odd.");
                        this.dialogueCounter = 2;
                        break;
                    case 2:
                        showDialogue("Isa", "Well, I probably could mix it, if I had the ingredients in front of me, but I don't even know what those would be.");
                        this.dialogueCounter = 3;
                        break;
                    case 3:
                        showDialogue("You", "Diver fish blood, Root extract, and a pearl.");
                        this.dialogueCounter = 4;
                        break;
                    case 4:
                        showDialogue("Isa", "Good thing you came to me then!");
                        this.dialogueCounter = 5;
                        break;
                    case 5:
                        showDialogue("Isa", "While I don't know the exact recipe for a Vita Radicata Potion, I can tell you with almost 100% certainty that the ingredients you listed, would not make one.");
                        this.dialogueCounter = 6;
                        break;
                    case 6:
                        showDialogue("You", "How can I know you aren't lying to me as well then.");
                        this.dialogueCounter = 7;
                        break;
                    case 7:
                        showDialogue("Isa", "Well, I'm sincerely hoping you trust me! Whoever you're trying to save with that poition, will not live, if you give them what Marjorie wanted to cook up.");
                        this.dialogueCounter = 8;
                        break;
                    case 8:
                        showDialogue("You", "So, if I find out the correct components and bring them to you, you can make the correct potion for me?");
                        this.dialogueCounter = 9;
                        break;
                    case 9:
                        showDialogue("Isa", "Well, it'll cost you, but I will do my best!");
                        this.dialogueCounter = 10;
                        break;
                    case 10:
                        showDialogue("You", "Marjorie didn't want any type of payment...");
                        this.dialogueCounter = 11;
                        break;
                    case 11:
                        showDialogue("You", "Very well then. I'll go, and I'll be back with the ingredients when I find them.");
                        this.dialogueCounter = 12;
                        break;
                    case 12:
                        this.exitHUD();
                        break;
                }
                break;

            // Isa 1
            // ---------------------------------------------------------------------------------------------------------------------------------------
            // Marjorie 2

            case 11:
                switch(this.dialogueCounter) {
                    case 0:
                        showDialogue("You", "Here. I got everything.");
                        this.dialogueCounter = 1;
                        break;
                    case 1:
                        showDialogue("Marjorie", "Wonderful!");
                        this.dialogueCounter = 2;
                        break;
                    case 2:
                        showDialogue("Marjorie", "I've already prepared most of the concoction. All that's left is to add the ingredients.");
                        this.dialogueCounter = 3;
                        break;
                    case 3:
                        showDialogue("You", "Take them.");
                        this.dialogueCounter = 4;
                        break;
                    case 4:
                        showDialogue("Marjorie", "Thank you, kind sir!");
                        this.dialogueCounter = 5;
                        break;
                    case 5:
                        showDialogue("Marjorie", "Now, just give a few second to thoroughly mix everything together!");
                        this.dialogueCounter = 6;
                        break;
                    case 6:
                        showDialogue("Marjorie", "...");
                        this.dialogueCounter = 7;
                        break;
                    case 7:
                        showDialogue("Marjorie", "There, just a little more.");
                        this.dialogueCounter = 8;
                        break;
                    case 8:
                        showDialogue("Marjorie", "...");
                        this.dialogueCounter = 9;
                        break;
                    case 9:
                        showDialogue("You", "...");
                        this.dialogueCounter = 10;
                        break;
                    case 10:
                        showDialogue("Marjorie", "And here you go! A Vita Radicata Potion!");
                        this.dialogueCounter = 11;
                        break;
                    case 11:
                        showDialogue("Marjorie", "Now, make sure to give it all to the person you wish to save. Every last drop. Anything less and The Root's hold over them will be too much.");
                        this.dialogueCounter = 12;
                        break;
                    case 12:
                        showDialogue("You", "Got it.");
                        this.dialogueCounter = 13;
                        break;
                    case 13:
                        showDialogue("You", "And Marjorie: words cannot express how much this means to me.");
                        this.dialogueCounter = 14;
                        break;
                    case 14:
                        showDialogue("You", "After all this time, I'll finally be able to save the man I love.");
                        this.dialogueCounter = 15;
                        break;
                    case 15:
                        showDialogue("Marjorie", "Off you go then! Wouldn't want to hold him for too long!");
                        this.dialogueCounter = 16;
                        break;
                    case 16:
                        showDialogue("You", "Yes. Goodbye. And thank you.");
                        this.dialogueCounter = 17;
                        break;
                    case 17:
                        this.exitHUD();
                        break;
                }
                break;

            // Marjorie 2
            // ---------------------------------------------------------------------------------------------------------------------------------------
            // Isa 2

            case 12:
                switch(this.dialogueCounter) {
                    case 0:
                        showDialogue("You", "Isa, I'm back.");
                        this.dialogueCounter = 1;
                        break;
                    case 1:
                        showDialogue("You", "I managed to find everything for the real potion. Your mermaid friend was quite a help to me.");
                        this.dialogueCounter = 2;
                        break;
                    case 2:
                        showDialogue("Isa", "That's good and all, but quicky hand over everything, before Marjorie catches onto what we're doing.");
                        this.dialogueCounter = 3;
                        break;
                    case 3:
                        showDialogue("You", "Here. Take it.");
                        this.dialogueCounter = 4;
                        break;
                    case 4:
                        showDialogue("Isa", "Okay. Just give me a couple of seconds...");
                        this.dialogueCounter = 5;
                        break;
                    case 5:
                        showDialogue("Isa", "...");
                        this.dialogueCounter = 6;
                        break;
                    case 6:
                        showDialogue("Isa", "Okay, here you go. A single drop into their mouth should be enough.");
                        this.dialogueCounter = 7;
                        break;
                    case 7:
                        showDialogue("Isa", "And hurry up. I can tell The Root is going to consume them soon, if you don't do anything.");
                        this.dialogueCounter = 8;
                        break;
                    case 8:
                        showDialogue("You", "Thank you. Let me just give you your payment. How much did you want again?");
                        this.dialogueCounter = 9;
                        break;
                    case 9:
                        showDialogue("Isa", "No! Go!");
                        this.dialogueCounter = 10;
                        break;
                    case 10:
                        showDialogue("Isa", "You don't have the time! Get to them! Then come back to pay.");
                        this.dialogueCounter = 11;
                        break;
                    case 11:
                        showDialogue("You", "...");
                        this.dialogueCounter = 12;
                        break;
                    case 12:
                        showDialogue("You", "I'll be back as soon as I can.");
                        this.dialogueCounter = 13;
                        break;
                    case 13:
                        this.exitHUD();
                        break;
                }
                break;

            // Isa 2
            // ---------------------------------------------------------------------------------------------------------------------------------------
            // Carlos Final Good

            case 13:
                switch(this.dialogueCounter) {
                    case 0:
                        showDialogue("You", "Carlos, I'm back...");
                        this.dialogueCounter = 1;
                        break;
                    case 1:
                        showDialogue("You", "I'm sorry I put you through all this.");
                        this.dialogueCounter = 2;
                        break;
                    case 2:
                        showDialogue("Carlos?", "Hrrmmhhhh?");
                        this.dialogueCounter = 3;
                        break;
                    case 3:
                        showDialogue("You", "...");
                        this.dialogueCounter = 4;
                        break;
                    case 4:
                        showDialogue("You", "We never should have gone after the Untethered...");
                        this.dialogueCounter = 5;
                        break;
                    case 5:
                        showDialogue("You", "I'm sorry you had to stay a living corpse for this long.");
                        this.dialogueCounter = 6;
                        break;
                    case 6:
                        showDialogue("You", "But I don't regret bringing you back.");
                        this.dialogueCounter = 7;
                        break;
                    case 7:
                        showDialogue("You", "Especially now that I have this. A Vita Radicata Potion.");
                        this.dialogueCounter = 8;
                        break;
                    case 8:
                        showDialogue("Carlos?", "...");
                        this.dialogueCounter = 9;
                        break;
                    case 9:
                        showDialogue("Carlos?", "ARRRRAARARAAAAAHAHAHHHHHHHHHHHHHHHHHHHHH");
                        this.dialogueCounter = 10;
                        break;
                    case 10:
                        showDialogue("You", "There's no need to scream anymore. Just take this one single drop.");
                        this.dialogueCounter = 11;
                        break;
                    case 11:
                        showDialogue("You", "...");
                        this.dialogueCounter = 12;
                        break;
                    case 12:
                        showDialogue("You", "And here you go.");
                        this.dialogueCounter = 13;
                        break;
                    case 13:
                        showDialogue("You", "Now there's just one last thing to do.");
                        this.dialogueCounter = 14;
                        break;
                    case 14:
                        showDialogue("You", "AHHHH!");
                        this.dialogueCounter = 15;
                        break;
                    case 15:
                        showDialogue("You", "Huh...");
                        this.dialogueCounter = 16;
                        break;
                    case 16:
                        showDialogue("You", "Ha...");
                        this.dialogueCounter = 17;
                        break;
                    case 17:
                        showDialogue("You", "I'm sorry Carlos...");
                        this.dialogueCounter = 18;
                        break;
                    case 18:
                        showDialogue("You", "This is how I atone for my mistake...");
                        this.dialogueCounter = 19;
                        break;
                    case 19:
                        showDialogue("Carlos?", "Arh...");
                        this.dialogueCounter = 20;
                        break;
                    case 20:
                        showDialogue("Carlos?", "ARHHHHHH!");
                        this.dialogueCounter = 21;
                        break;
                    case 21:
                        showDialogue("Carlos", "Huff...");
                        this.dialogueCounter = 22;
                        break;
                    case 22:
                        showDialogue("Carlos", "I...");
                        this.dialogueCounter = 23;
                        break;
                    case 23:
                        showDialogue("You", "I'm happy I at least get to hear you speak one last time.");
                        this.dialogueCounter = 24;
                        break;
                    case 24:
                        showDialogue("Carlos", "What...");
                        this.dialogueCounter = 25;
                        break;
                    case 25:
                        showDialogue("Carlos", "Are you...");
                        this.dialogueCounter = 26;
                        break;
                    case 26:
                        showDialogue("Carlos", "Going on about..?");
                        this.dialogueCounter = 27;
                        break;
                    case 27:
                        showDialogue("Carlos", "Why is my throat so sore?");
                        this.dialogueCounter = 28;
                        break;
                    case 28:
                        showDialogue("Carlos", "Do you have any...");
                        this.dialogueCounter = 29;
                        break;
                    case 29:
                        showDialogue("Carlos", "Water..?");
                        this.dialogueCounter = 30;
                        break;
                    case 30:
                        showDialogue("You", "...");
                        this.dialogueCounter = 31;
                        break;
                    case 31:
                        showDialogue("Carlos", "Wait! You're bleeding!");
                        this.dialogueCounter = 32;
                        break;
                    case 32:
                        showDialogue("Carlos", "What happened?! Let me patch you up!");
                        this.dialogueCounter = 33;
                        break;
                    case 33:
                        showDialogue("You", "Don't!");
                        this.dialogueCounter = 34;
                        break;
                    case 34:
                        showDialogue("You", "I did this to myself...");
                        this.dialogueCounter = 35;
                        break;
                    case 35:
                        showDialogue("Carlos", "Okay, you're an idiot! Screw my throat, I'm fixing you up right now! I'm not having you dying on me.");
                        this.dialogueCounter = 36;
                        break;
                    case 36:
                        showDialogue("You", "I said don't!");
                        this.dialogueCounter = 37;
                        break;
                    case 37:
                        showDialogue("Carlos", "I'm not losing you!");
                        this.dialogueCounter = 38;
                        break;
                    case 38:
                        showDialogue("You", "Well, I've already lost you once... Don't make it happen again...");
                        this.dialogueCounter = 39;
                        break;
                    case 39:
                        showDialogue("Carlos", "What do you mean?");
                        this.dialogueCounter = 40;
                        break;
                    case 40:
                        showDialogue("You", "The Untethered...");
                        this.dialogueCounter = 41;
                        break;
                    case 41:
                        showDialogue("Carlos", "...");
                        this.dialogueCounter = 42;
                        break;
                    case 42:
                        showDialogue("Carlos", "We didn't win, did we?");
                        this.dialogueCounter = 43;
                        break;
                    case 43:
                        showDialogue("You", "No, we did not...");
                        this.dialogueCounter = 44;
                        break;
                    case 44:
                        showDialogue("Carlos", "And you kept my body tethered to this world this whole time.");
                        this.dialogueCounter = 45;
                        break;
                    case 45:
                        showDialogue("You", "I love you.");
                        this.dialogueCounter = 46;
                        break;
                    case 46:
                        showDialogue("Carlos", "What are you on about?");
                        this.dialogueCounter = 47;
                        break;
                    case 47:
                        showDialogue("You", "I know I've never been open about my feelings, but I need you to hear that before I bleed out.");
                        this.dialogueCounter = 48;
                        break;
                    case 48:
                        showDialogue("You", "I love you, Carlos...");
                        this.dialogueCounter = 49;
                        break;
                    case 49:
                        showDialogue("Carlos", "I...");
                        this.dialogueCounter = 50;
                        break;
                    case 50:
                        showDialogue("Carlos", "Love you as well...");
                        this.dialogueCounter = 51;
                        break;
                    case 51:
                        showDialogue("Carlos", "I always have.");
                        this.dialogueCounter = 52;
                        break;
                    case 52:
                        this.exitHUD();
                        break;
                }
                break;
            
            // Carlos Final Good
            // ---------------------------------------------------------------------------------------------------------------------------------------
            // Carlos Final Bad

            case 14:
                switch(this.dialogueCounter) {
                    case 0:
                        showDialogue("You", "Carlos, I'm back...");
                        this.dialogueCounter = 1;
                        break;
                    case 1:
                        showDialogue("You", "I'm sorry I put you through all this.");
                        this.dialogueCounter = 2;
                        break;
                    case 2:
                        showDialogue("Carlos?", "Hrrmmhhhh?");
                        this.dialogueCounter = 3;
                        break;
                    case 3:
                        showDialogue("You", "...");
                        this.dialogueCounter = 4;
                        break;
                    case 4:
                        showDialogue("You", "But it'll all be over soon.");
                        this.dialogueCounter = 5;
                        break;
                    case 5:
                        showDialogue("You", "I just have to hope what Marjorie made will help...");
                        this.dialogueCounter = 6;
                        break;
                    case 6:
                        showDialogue("Carlos?", "Hrhhhh?");
                        this.dialogueCounter = 7;
                        break;
                    case 7:
                        showDialogue("You", "Here. Calm down. Drink everything. Every last drop.");
                        this.dialogueCounter = 8;
                        break;
                    case 8:
                        showDialogue("You", "...");
                        this.dialogueCounter = 9;
                        break;
                    case 9:
                        showDialogue("You", "There. All done.");
                        this.dialogueCounter = 10;
                        break;
                    case 10:
                        showDialogue("You", "Now all that's left is to wait.");
                        this.dialogueCounter = 11;
                        break;
                    case 11:
                        showDialogue("You", "Then this'll all finally be over. Our story finally coming to an end. After all these years of dragging you along with me.");
                        this.dialogueCounter = 12;
                        break;
                    case 12:
                        showDialogue("You", "...");
                        this.dialogueCounter = 13;
                        break;
                    case 13:
                        showDialogue("You", "Carlos?");
                        this.dialogueCounter = 14;
                        break;
                    case 14:
                        showDialogue("You", "...");
                        this.dialogueCounter = 15;
                        break;
                    case 15:
                        showDialogue("You", "I should have assumed as much from her.");
                        this.dialogueCounter = 16;
                        break;
                    case 16:
                        showDialogue("You", "Or maybe I did...");
                        this.dialogueCounter = 17;
                        break;
                    case 17:
                        showDialogue("You", "I'm sorry for all this, Carlos.");
                        this.dialogueCounter = 18;
                        break;
                    case 18:
                        showDialogue("You", "To die by my hand twice.");
                        this.dialogueCounter = 19;
                        break;
                    case 19:
                        showDialogue("You", "Though, this time, I don't think I can bring you back.");
                        this.dialogueCounter = 20;
                        break;
                    case 20:
                        showDialogue("You", "...");
                        this.dialogueCounter = 21;
                        break;
                    case 21:
                        showDialogue("You", "Lay peacefully.");
                        this.dialogueCounter = 22;
                        break;
                    case 22:
                        showDialogue("You", "In the embrace of The Root.");
                        this.dialogueCounter = 23;
                        break;
                    case 23:
                        showDialogue("You", "...");
                        this.dialogueCounter = 24;
                        break;
                    case 24:
                        showDialogue("You", "Goodbye.");
                        this.dialogueCounter = 25;
                        break;
                    case 25:
                        showDialogue("You", "My one and only love.");
                        this.dialogueCounter = 26;
                        break;
                    case 26:
                        showDialogue("You", "I'm sorry for lying to you all this time.");
                        this.dialogueCounter = 27;
                        break;
                    case 27:
                        this.exitHUD();
                        break;
                }
                break;
            
            // Carlos Final Bad
            // ---------------------------------------------------------------------------------------------------------------------------------------
            // Romeo 1

            case 15:
                switch(this.dialogueCounter) {
                    case 0:
                        showDialogue("???", "All! Listen! Fall to the Roots! Let go of your mortal body!");
                        this.dialogueCounter = 1;
                        break;
                    case 1:
                        showDialogue("You", "You must me Romeo.");
                        this.dialogueCounter = 2;
                        break;
                    case 2:
                        showDialogue("Romeo?", "Depends on who's asking?!");
                        this.dialogueCounter = 3;
                        break;
                    case 3:
                        showDialogue("You", "Just someone who wishes to ask you about something.");
                        this.dialogueCounter = 4;
                        break;
                    case 4:
                        showDialogue("Romeo?", "Are you here to silence me?!");
                        this.dialogueCounter = 5;
                        break;
                    case 5:
                        showDialogue("You", "Certainly not.");
                        this.dialogueCounter = 6;
                        break;
                    case 6:
                        showDialogue("You", "I simply wish to inqure about a pearl you might have in your possession.");
                        this.dialogueCounter = 7;
                        break;
                    case 7:
                        showDialogue("Romeo", "In that case, I am indeed Romeo. A Priest of Rot!");
                        this.dialogueCounter = 8;
                        break;
                    case 8:
                        showDialogue("Romeo", "And this here.");
                        this.dialogueCounter = 9;
                        break;
                    case 9:
                        showDialogue("Romeo", "Is my holy pearl.");
                        this.dialogueCounter = 10;
                        break;
                    case 10:
                        showDialogue("You", "How much would it cost me to aquire it?");
                        this.dialogueCounter = 11;
                        break;
                    case 11:
                        showDialogue("Romeo", "A blasphemer, such as yourself?");
                        this.dialogueCounter = 12;
                        break;
                    case 12:
                        showDialogue("Romeo", "Your death.");
                        this.dialogueCounter = 13;
                        break;
                    case 13:
                        showDialogue("You", "That is not something I am willing to give you.");
                        this.dialogueCounter = 14;
                        break;
                    case 14:
                        showDialogue("Romeo", "Hmmm...");
                        this.dialogueCounter = 15;
                        break;
                    case 15:
                        showDialogue("Romeo", "Fine.");
                        this.dialogueCounter = 16;
                        break;
                    case 16:
                        showDialogue("Romeo", "Take it.");
                        this.dialogueCounter = 17;
                        break;
                    case 17:
                        showDialogue("Romeo", "I've no use for it anyway.");
                        this.dialogueCounter = 18;
                        break;
                    case 18:
                        showDialogue("You", "Just like that?");
                        this.dialogueCounter = 19;
                        break;
                    case 19:
                        showDialogue("Romeo", "Leave before I change my mind.");
                        this.dialogueCounter = 20;
                        break;
                    case 20:
                        showDialogue("You", "Thank you.");
                        this.dialogueCounter = 21;
                        break;
                    case 21:
                        this.exitHUD();
                        break;
                }
                break;

            // Romeo 1
            // ---------------------------------------------------------------------------------------------------------------------------------------
            // Mermaid 1

            case 16:
                switch(this.dialogueCounter) {
                    case 0:
                        showDialogue("You", "Hello? Is anyone down there?");
                        this.dialogueCounter = 1;
                        break;
                    case 1:
                        showDialogue("???", "Has't thee cometh to tryeth and slayeth me?");
                        this.dialogueCounter = 2;
                        break;
                    case 2:
                        showDialogue("You", "I am not. I caught the whiff of something I recognise down there so I thought I might as well check.");
                        this.dialogueCounter = 3;
                        break;
                    case 3:
                        showDialogue("???", "I am not familiar with thee. Howev'r, thee doth has't Carlos' stench on thee.");
                        this.dialogueCounter = 4;
                        break;
                    case 4:
                        showDialogue("You", "You know Carlos?");
                        this.dialogueCounter = 5;
                        break;
                    case 5:
                        showDialogue("???", "I haven't hath met him, but I has't hath heard of him.");
                        this.dialogueCounter = 6;
                        break;
                    case 6:
                        showDialogue("You", "What do you know about him then?");
                        this.dialogueCounter = 7;
                        break;
                    case 7:
                        showDialogue("???", "I'm s'rry f'r bringing t up.");
                        this.dialogueCounter = 8;
                        break;
                    case 8:
                        showDialogue("You", "Don't be. I'd just like to know what you know about him.");
                        this.dialogueCounter = 9;
                        break;
                    case 9:
                        showDialogue("???", "Not much beside what the roots has't whisp'r'd to me.");
                        this.dialogueCounter = 10;
                        break;
                    case 10:
                        showDialogue("You", "Yes?");
                        this.dialogueCounter = 11;
                        break;
                    case 11:
                        showDialogue("???", "Nothing m're.");
                        this.dialogueCounter = 12;
                        break;
                    case 12:
                        showDialogue("You", "Well, I won't ask any further.");
                        this.dialogueCounter = 13;
                        break;
                    case 13:
                        if (this.IaboutH) {
                            showDialogue("???", "I can't bid thee any m're.", {
                                buttons: [
                                    {
                                        text: "Do you know Isa by chance?",
                                        buttonID: 17
                                    },
                                    {
                                        text: "What else did The Root whisper to you?",
                                        buttonID: 18
                                    },
                                    {
                                        text: "What may I call you?",
                                        buttonID: 19
                                    }
                                ]
                            });
                        } else {
                            showDialogue("???", "I can't bid thee any m're.", {
                                buttons: [
                                    {
                                        text: "What else did The Root whisper to you?",
                                        buttonID: 18
                                    },
                                    {
                                        text: "What may I call you?",
                                        buttonID: 19
                                    }
                                ]
                            });
                        }
                        this.dialogueCounter = -2;
                        break;
                }
                break;
            case 17:
                switch(this.dialogueCounter) {
                    case 0:
                        showDialogue("???", "The womanthat wenteth to the mines with h'r sist'r?");
                        this.dialogueCounter = 1;
                        break;
                    case 1:
                        showDialogue("You", "That would be the one. She told me to say 'Hi', if I ever find you.");
                        this.dialogueCounter = 2;
                        break;
                    case 2:
                        showDialogue("???", "Yond po'r mistress. To beest gift'd life by the roots and yet beest did hold backeth by h'r attachment to the physical.");
                        this.dialogueCounter = 3;
                        break;
                    case 3:
                        showDialogue("???", "So single mindedly focus'd on finding the sooth yond the lady cannot seeth yond which is already in front of h'r.");
                        this.dialogueCounter = 4;
                        break;
                    case 4:
                        showDialogue("You", "I'll take your word for it...");
                        this.dialogueCounter = 5;
                        break;
                    case 5:
                        showDialogue("You", "Though, before I ask what I originally wanted to, I'd like to at least know what I may call you. If you'd be so kind as to share your name.");
                        setDialogueId(19);
                        this.updateDialogueCounter();
                        break;
                }
                break;
            case 18:
                switch(this.dialogueCounter) {
                    case 0:
                        showDialogue("???", "The roots mainly whisp'r to me of loss.");
                        this.dialogueCounter = 1;
                        break;
                    case 1:
                        showDialogue("???", "I've hath heard of Carlos' loss, of Romeo's loss.");
                        this.dialogueCounter = 2;
                        break;
                    case 2:
                        showDialogue("???", "Though, anon yond I'm talking with thee, thee has't a similar air about thee.");
                        this.dialogueCounter = 3;
                        break;
                    case 3:
                        showDialogue("???", "Prithee bid me of thy loss.");
                        this.dialogueCounter = 4;
                        break;
                    case 4:
                        showDialogue("You", "Carlos and I travelled the sea in search of something.");
                        this.dialogueCounter = 5;
                        break;
                    case 5:
                        showDialogue("You", "But in the process, he was killed, while I remained alive.");
                        this.dialogueCounter = 6;
                        break;
                    case 6:
                        showDialogue("You", "So, I brought him back to life.");
                        this.dialogueCounter = 7;
                        break;
                    case 7:
                        showDialogue("You", "But, while his body is now once again alive, his soul isn't there anymore. Or it's buried deep beneath. I don't really know wich of the two is true.");
                        this.dialogueCounter = 8;
                        break;
                    case 8:
                        showDialogue("You", "There. That's my loss. Are you satisfied?");
                        this.dialogueCounter = 9;
                        break;
                    case 9:
                        showDialogue("???", "T is forsooth sufficient. But I can bid thee, his soul hast been hath kept particularly closeth to the roots since coequal bef're his passing.");
                        this.dialogueCounter = 10;
                        break;
                    case 10:
                        showDialogue("You", "Considering how much I've shared with you, I think I deserve to at least know your name.");
                        setDialogueId(19);
                        this.updateDialogueCounter();
                        break;
                    }
                break;
            case 19:
                switch(this.dialogueCounter) {
                    case 0:
                        showDialogue("???", "V'ry well then.");
                        this.dialogueCounter = 1;
                        break;
                    case 1:
                        showDialogue("???", "You may call me Hatarim.");
                        this.dialogueCounter = 2;
                        break;
                    case 2:
                        showDialogue("You", "Okay, Hatarim, there is something I wanted to ask you.");
                        this.dialogueCounter = 3;
                        break;
                    case 3:
                        showDialogue("You", "What are the ingredients for a Vita Radicata Potion?");
                        this.dialogueCounter = 4;
                        break;
                    case 4:
                        showDialogue("Hatarim?", "Scarfish blood, extracteth from the roots, a pearl");
                        this.dialogueCounter = 5;
                        break;
                    case 5:
                        showDialogue("You", "Thats only one off from what Marjorie told me.");
                        this.dialogueCounter = 6;
                        break;
                    case 6:
                        this.HaboutL = true;
                        showDialogue("Hatarim?", "And a life off'r'd in returneth.");
                        this.dialogueCounter = 7;
                        break;
                    case 7:
                        showDialogue("You", "...");
                        this.dialogueCounter = 8;
                        break;
                    case 8:
                        showDialogue("You", "Thank you... Hatarim.");
                        this.dialogueCounter = 9;
                        break;
                    case 9:
                        showDialogue("You", "In that case I know what I must do.");
                        this.dialogueCounter = 10;
                        break;
                    case 10:
                        this.exitHUD();
                        break;
                }
                break;
        }
    }
}

window.dialogueMaster = new dialogueMaster();
export default window.dialogueMaster;
