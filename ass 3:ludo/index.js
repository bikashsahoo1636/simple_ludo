var currPos = 0;
var step = 77;
var currcolor = "";
var NumOfPaw = "";
var num = 0;
var clicked = false;
var currpawn = "";
var allcolor = ["red", "blue"];
var pawnOut = {red:0,blue:0}
function HaveHover() {
    var count = 0;
    var toKill = "";
    for (var i = 0; i < allcolor.length; i++) {
        for (var n = 1; n <= 2; n++) {
            var firstPawn = document.getElementById(allcolor[i] + "pawn" + n);
            var secondPawn=document.getElementById(currpawn);
            if (firstPawn.style.top==secondPawn.style.top&&firstPawn.style.left==secondPawn.style.left&&currcolor!=allcolor[i]&&currPos+num<44) {
                count++;
                toKill = allcolor[i] + "pawn" + n;
                return toKill;
            }
        }
    }
    return false;
}
function Stuck() {
    var text = document.getElementById('player');
    if (onboard[currpawn] == 0||currPos+num>28) {
        if (DontHaveOtherFree()||currPos+num>28) {
            var badtext = document.getElementById('badtext');
            badtext.innerText = "Unfortunately you stuck";
            clicked = false;
            var dice = document.getElementById('dice');
            dice.style.backgroundImage = "url(photos/dice.gif)";
            window.setTimeout(changePlayer, 1000);
        }
    }
}
function changePlayer() {
    if (num != 6){
    var text = document.getElementById('player');
    switch (text.innerText) {
        case "red": text.innerText = text.style.color = "blue"; break;
        case "blue": text.innerText = text.style.color = "red"; break;
    }
    }
    var badtext = document.getElementById('badtext');
    badtext.innerText = "";
    var dice = document.getElementById('dice');
    dice.style.backgroundImage = "url(photos/dice.gif)";
}
var positions = {
    redpawn1: 0, redpawn2: 0,
    bluepawn1: 0, bluepawn2: 0

};
var onboard = {
    redpawn1: 0, redpawn2: 0,
    bluepawn1: 0, bluepawn2: 0

};
function DontHaveOtherFree() {
    var text = document.getElementById('player');
    for (var i = 1; i <=2; i++) {
        if (onboard[text.innerText + "pawn" + i] == 1 || positions[text.innerText + "pawn" + i]+num>=44) return false;
    }
    return true;
}
function CheckForWinner() {
    if (pawnOut[currcolor] == 2) {
        var dice = document.getElementById("dice");
        var player = document.getElementById("player");
        var uselesstext1 = document.getElementById("uselesstext1");
        var uselesstext2 = document.getElementById("uselesstext2");
        dice.innerText = "";
        dice.style.visibility = "hidden";
        uselesstext1.innerText = "";
        uselesstext2.innerText = "";
        player.innerText = "The Winner is the "+currcolor+" player";
    }
}
function stepDown() {
    var doc = document.getElementById(currcolor + "pawn"+NumOfPaw);
    var curr = Number(doc.style.top.replace(/[a-z]/g, ''));
    doc.style.top = (curr+step)+'px';
    currPos++;
}
function stepUp() {
    var doc = document.getElementById(currpawn);
    var curr = Number(doc.style.top.replace(/[a-z]/g, ''));
    doc.style.top = (curr - step) + 'px';
    currPos++;
}
function stepLeft() {
    var doc = document.getElementById(currpawn);
    var curr = Number(doc.style.left.replace(/[a-z]/g, ''));
    doc.style.left = (curr - step) + 'px';
    currPos++;
}
function stepRight() {
    var doc = document.getElementById(currpawn);
    var curr = Number(doc.style.left.replace(/[a-z]/g, ''));
    doc.style.left = (curr + step) + 'px';
    currPos++;
}
var stepsRed = [];
var stepsBlue =[];
function pushSteps(value, steps, count) {
    for (i = 0; i < count; i++) steps.push(value);
}
//Red pawns path
pushSteps(stepRight,stepsRed,7);
pushSteps(stepDown, stepsRed,7);
pushSteps(stepLeft, stepsRed,7);
pushSteps(stepUp, stepsRed,7);


//Blue pawns path
pushSteps(stepLeft, stepsBlue,7);
pushSteps(stepUp, stepsBlue,7);
pushSteps(stepRight, stepsBlue,7);
pushSteps(stepDown, stepsBlue,7);


function ResetPawn(victim) {
    onboard[victim] = 0;
    positions[victim] = 0;
    var pawnToMove = document.getElementById(victim);
    switch (victim) {
        case "redpawn1": pawnToMove.style.top = 175 + "px"; pawnToMove.style.left = 100 + "px"; break;
        case "redpawn2": pawnToMove.style.top = 175 + "px"; pawnToMove.style.left = 175 + "px"; break;
        case "bluepawn1": pawnToMove.style.top = 650 + "px"; pawnToMove.style.left = 1010 + "px"; break;
        case "bluepawn2": pawnToMove.style.top = 650 + "px"; pawnToMove.style.left = 1085 + "px"; break; 

    }
}
function randomNum() {
    var cleanText = document.getElementById('badtext');
    cleanText.innerText = "";
    if (!clicked) {
        num = Math.floor((Math.random() * 6) + 1);;
        var dice = document.getElementById('dice');
        dice.style.backgroundImage = "url(photos/" + num + ".jpg)";
        clicked = true;
    }
    if (num != 6&&DontHaveOtherFree()) {
        var bad = document.getElementById('badtext');
        bad.innerText = "Unfortunately you stuck";
        window.setTimeout(changePlayer, 1000);
        clicked = false;
    }
}
function testing() {
    var clean = document.getElementById('badtext');
    clean.innerText = "";   
    num = Number(document.getElementById("myNumber").value);
    var dice = document.getElementById('dice');
    dice.style.backgroundImage = "url(photos/" + num + ".jpg)";
    clicked = true;
    if (((num < 6)&&(num > 0))&&DontHaveOtherFree()) {
        var bad = document.getElementById('badtext');
        bad.innerText = "Unfortunately you stuck";
        window.setTimeout(changePlayer, 1000);
        clicked = false;
    }
    if ((num > 6)||(num < 0)) {
        var excNo = document.getElementById('badtext');
        excNo.innerText = "Unfortunately, the No. doesn't exist in Dice. Please Try Again.";   
        dice.style.backgroundImage = "url(photos/dice.gif)";
        clicked = false;
    }
}
function randomMove(Color, paw) {
    var text = document.getElementById('player');
    NumOfPaw = paw;
    currcolor = Color;
    currpawn = currcolor + "pawn" + NumOfPaw;
    currPos = positions[currpawn];
    if (num + currPos > 28) {
        Stuck();
    }
    else {
        if (clicked) {
            var position = currPos;
            if (text.innerText == currcolor) {
                if (onboard[currpawn] === 1 || num === 6) {
                    if (onboard[currpawn] === 0) {
                        var doc = document.getElementById(currpawn);
                        var curr = Number(doc.style.left.replace(/[a-z]/g, ''));
                        switch (Color) {
                            case "red":
                                doc.style.left = 327 + 'px';
                                doc.style.top = 109 + "px";
                                break;    

                            case "blue":
                                doc.style.left = 866 + 'px';
                                doc.style.top = 648 + "px";
                                break;

                        }
                        onboard[currpawn] = 1;
                    }
                    else {
                        switch (Color) {
                            case "red":
                                for (i = currPos; i < position + num; i++) {
                                    stepsRed[i]();
                                }
                                break;

                            case "blue":
                                for (i = currPos; i < position + num; i++) {
                                    stepsBlue[i]();
                                }
                                break;
                        }
                        positions[currpawn] = currPos;
                        var victim = HaveHover();
                        if (victim != false) {
                            ResetPawn(victim);
                        }
                        if (currPos == 28) { pawnOut[currcolor]++; onboard[currpawn] = 0; positions[currpawn] = 0; document.getElementById(currpawn).style.visibility = "hidden"; };
                        CheckForWinner();
                        changePlayer();
                    }
                    num = 0;
                    clicked = false;
                    var dice = document.getElementById('dice');
                    dice.style.backgroundImage = "url(photos/dice.gif)";
                }
                else Stuck();
            }
        }
    }
}