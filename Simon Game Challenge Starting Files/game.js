var started = false
var indeks = 0;

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

$(document).on("keypress", function (event) {
    if (event.key == 'A' || event.key == 'a') {
        if (!started) {
            started = true;
            nextSequence();
            $("#level-title").text("Level " + level);
        }
    }
});

$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour); 
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    level++;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        if(gamePattern.length == userClickedPattern.length){
            userClickedPattern.length = 0;
            setTimeout(nextSequence, 1000);
            $("#level-title").text("Level " + level);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press A to Restart");
        startOver();
    }
}


function startOver() {
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    indeks = 0;
}