var userClickedPattern = []; 
var gamePattern = [];
var IDs = "#green, #red, #yellow, #blue";
var level = 0;

function nextSequence() {
    level++;
    $("h1").text("Level " + level);
    userClickedPattern = [];

    var randomNumber = Math.random() * 4; 
    randomNumber = Math.floor(randomNumber) + 1;

    var randomChosenColor, audioPath;
    if(randomNumber == 1) {
        randomChosenColor = "green";
        audioPath = "./sounds/green.mp3";
    } else if(randomNumber == 2) {
        randomChosenColor = "red";
        audioPath = "./sounds/red.mp3";
    } else if(randomNumber == 3) {
        randomChosenColor = "yellow";
        audioPath = "./sounds/yellow.mp3";
    } else {
        randomChosenColor = "blue";
        audioPath = "./sounds/blue.mp3";
    }
    
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    gamePattern.push(randomChosenColor);
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    var id = "#" + currentColor; 
    $(id).addClass("pressed");
    setTimeout(function () {
        $(id).removeClass("pressed");
    }, 150);
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if(userClickedPattern.length === gamePattern.length) {
            // console.log("success");
            setTimeout(nextSequence, 1000);
        }
    }
    else {
        playSound("wrong");
        $("h1").text("Opps! You lose on level " + level);
        $("h1").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        level = 0;
        gamePattern = [];
        setTimeout(function () {
            $("h1").text("Press any key to restart");
        }, 3500);
    }
}

function handler() {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    // console.log(userClickedPattern);

    playSound(this.id);
    animatePress(this.id);
    checkAnswer(userClickedPattern.length - 1);
}

$(IDs).click(handler);

$(document).keypress(nextSequence);
