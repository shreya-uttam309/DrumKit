
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var started=false;
var level=0;
$(document).keypress(function(){
  if(!started){
   // The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
$("#level-title").text("Level "+level);
nextSequence();
started=true;
  }
});

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    console.log("Wrong");
    //In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
    playSound("wrong");

    // In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
  }
}

function nextSequence() {
  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level" +level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
 /* var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
  In place of this we have made the new function named playSound and taken a 
  single input parameter name and simply called playSound function here */

  playSound(randomChosenColour);
}

function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play;
}

function animatePress(currentColour){
$("#" +currentColour).addClass("pressed");

/* Use setTimeout():

var delayInMilliseconds = 1000; //1 second

setTimeout(function() {
  //your code to be executed after 1 second
}, delayInMilliseconds); */

setTimeout(function(){
  $("#" +currentColour).removeClass("pressed");
},100);
}

function startOver() {

  //Inside this function, you'll need to reset the values of level, gamePattern and started variables.
  level = 0;
  gamePattern = [];
  started = false;
}