
// First answer is the correct answer for each question.
// Answers will display in a random order so questions[x].answers[0] is always the correct one.
var questions = [
  {
    "questionText" : "Transfiguration is most like:",
    "answers" : ["Science",
                 "Music",
                 "Art",
                 "Drama"]
  },
  {
    "questionText" : "Which of these factors does not directly influence Transfiguration spells?",
    "answers" : ["Age",
                 "Wand power",
                 "Viciousness",
                 "Concentration",
                 "Body weight"]
  },
  {
  "questionText" : "Which object is commonly used to teach Transfiguration?",
  "answers" : ["Teapot",
               "Hairbrush",
               "Knife",
               "Blanket",
               "Shoe"]
  },
  {
    "questionText" : "True or false: Animagi use Transfiguration to achieve their animal forms.",
    "answers" : ["True",
                 "False"]
  },
  {
    "questionText" : "True or false: Transfiguration can be used to bring the dead back to life.",
    "answers" : ["False",
                 "True"]
  },
  {
    "questionText" : "Which of the following is not a branch of Transfiguration?",
    "answers" : ["Reformation",
                 "Conjuration",
                 "Vanishment",
                 "Transformation",
                 "Untransfiguration"]
  },
  {
    "questionText" : "Which of the following cannot be created through Conjuration?",
    "answers" : ["Food",
                 "Animals",
                 "Books",
                 "Clouds",
                 "Furniture"]
  },
  {
    "questionText" : "Which spell is a Transfiguration that might be used to provide first aid?",
    "answers" : ["Ferula",
                 "Reparifors",
                 "Episkey",
                 "Tergeo"]
  },
  {
    "questionText" : "Which Wizard is not a known Animagus?",
    "answers" : ["Harry Potter",
                 "Minerva McGonagall",
                 "Rita Skeeter",
                 "Sirius Black",
                 "Peter Pettigrew"]
  },
  {
    "questionText" : "True or false: Werewolves are naturally gifted at Transfiguration.",
    "answers" : ["False",
                 "True"]
  }
];

// Score variables
var numCorrect = 0;
var numIncorrect = 0;
var numUnanswered = 0;

var currentQuestion = 0;


// Timer variables
var intervalID;
var timerLength = 30;


$(document).ready(function() {

  // Countdown timer
  var timer = {
    secondsRemaining: timerLength,

    start: function() {

      timer.secondsRemaining = timerLength;
      intervalID = setInterval(timer.count, 1000);

      $("#secondsRemaining").text(timerLength);
      // console.log("Started timer");

    },

    stop: function() {
      clearInterval(intervalID);
      // console.log("Stopped timer");
    },

    count: function() {
      timer.secondsRemaining--;
      $("#secondsRemaining").text(timer.secondsRemaining);
      // console.log(timer.secondsRemaining);
      if (timer.secondsRemaining <= 0) {
        timer.stop();
        doTimeout();
      }
    }
  }


  // Event handlers

  $("#startBtn").on("click", function() {

    // Hide the start button & display the game instead
    $("#startBtn").css("display", "none");
    $("#wrapper").css("display", "block");
    $("#secondsRemaining").text(timer.secondsRemaining);

    randomizeList(questions);
    askQuestion();
  });

  $("#resetBtn").on("click", function() {
    resetGame();
    askQuestion();
  });

  // Whenever we click on an answer, check to see if it's right.
  $(document).on("click", ".answer", function() {

    // Stop the timer
    timer.stop();

    // If we're within the time limit
    if(timer.secondsRemaining > 0) {

      // If the answer clicked on is the first one in the list, it's right
      if(questions[currentQuestion].answers.indexOf($(this).text()) === 0) {
        numCorrect++;

        $("#question").text("Correct!");
        $("#answers").empty();
      }

      else { // We picked a wrong answer
        numIncorrect++;

        $("#question").text("Nope!");
        $("#answers").empty();
        $("#answers").append("<p>The correct answer was: " + questions[currentQuestion].answers[0] + "</p>");
      }
    }

    // Prepare to ask the next question
    setTimeout(function() {
      checkForQuestions();
    }, 3000);

  });


  function askQuestion() {

    // Display the question
    $("#question").text(questions[currentQuestion].questionText);

    // Randomize the answers
    var answerList = questions[currentQuestion].answers.slice();  // duplicate the array
    randomizeList(answerList);

    // Display the randomized answers
    for(var a = 0; a < answerList.length; a++) {
      $("#answers").append('<button class="answer">' + answerList[a] + '</button>');
    }

    // Start the timer
    timer.start();
  }

  // See if there are more questions to ask
  function checkForQuestions() {
    $("#answers").empty();  // Clear the answer list
    currentQuestion++;  // Look for the next question

    // If there are no questions left to ask, display the results
    if (currentQuestion >= questions.length) {
      displayScore();
    }
    // Otherwise, ask the next question
    else {
      askQuestion();
    }
  }

  // User failed to answer the question within the time allotted
  function doTimeout() {
    $("#question").text("Out of time!");
    $("#answers").empty();
    $("#answers").append("<p>The correct answer was: " + questions[currentQuestion].answers[0] + "</p>");

    numUnanswered++;

    // Wait 5 seconds, then look for more questions
    setTimeout(function() {
      checkForQuestions();
    }, 3000);
  }

  function displayScore() {
    // Hide the time remaining
    $("#timeRemaining").css("display", "none");

    // Display the results
    $("#question").text("All done!  Here's how you did:");
    $("#answers").append("<p>Correct answers: " + numCorrect + "<p>");
    $("#answers").append("<p>Incorrect answers: " + numIncorrect + "<p>");
    $("#answers").append("<p>Unanswered: " + numUnanswered + "<p>");

    // Show the reset button
    $("#resetBtn").css("display", "block");
  }

  function resetGame() {

    timer.stop();

    numCorrect = 0;
    numIncorrect = 0;
    numUnanswered = 0;
    currentQuestion = 0;

    $("#answers").empty();
    $("#resetBtn").css("display", "none");
    $("#timeRemaining").css("display", "inline-block");
    $("#secondsRemaining").text(timerLength);

    randomizeList(questions);
  }

});

function randomizeList(theList) {
  for (var i = 0; i < theList.length; i++) {
    var pickOne = randomNum(i, theList.length-1);
    var temp = theList[i];
    theList[i] = theList[pickOne];
    theList[pickOne] = temp;
  }
}

function randomNum(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}
