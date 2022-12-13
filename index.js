const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
});
var level = 0



function playSound(name) {
  var name = new Audio("sounds/" + name + ".mp3");
  name.play()
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}


function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence()
      }, 1000);

    } else {};
  } else {
    var wrong = new Audio("sounds/wrong.mp3")
    wrong.play();
    console.log("mistake");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}


let started = false;

$(document).keydown(function() {
  if (started == false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }

})

function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  userClickedPattern = [];
  gamePattern.push(randomChosenColour);

  level++;
  $("#level-title").text("Level " + level);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

function startOver() {
  gamePattern = [];
  level = 0;
  started = false;
}
