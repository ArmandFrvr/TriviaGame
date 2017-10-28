

// HP theme??

var questions = [];

var numCorrect = 0;
var numIncorrect = 0;
var numUnanswred = 0;

var secondsRemaining = 30;


$(document).ready(function() {


  $("startBtn").on("click", function() {








  });

  $(".answer").on("click", function() {

  // if answer is correct, reset secondsRemaning back to 30 and load the next question
  // also increase numCorrect
  // display some congrats msg


  });


  function playGame() {

    for(var i = 0; i < questions.length; i++) {
      secondsRemaining = 30;

    // display [i]th question
    // display answers for that question in $("#answers").append

    // if timer expires, reset secondsRemaining back to 30 and load the next question.
    // also increase numIncorrect
    // display the "wrong" msg and highlight the correct answer in green for 3-5 secs before moving to next q




    }
  }

  function resetGame() {
    numCorrect = 0;
    numIncorrect = 0;
    numUnanswered = 0;

    randomizeAnswers();
    playGame();
  }

  function randomizeAnswers(answerList) {
    for (var i = 0; i < answerList.length; i++) {
      var pickOne = randomNum(i, answerList.length-1);
      var temp = answerList[i];
      answerList[i] = answerList[pickOne];
      answerList[pickOne] = temp;
    }
  }

  function randomNum(min,max) {
      return Math.floor(Math.random()*(max-min+1)+min);
  }

});

