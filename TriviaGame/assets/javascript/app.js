// What movie had a clown as it's main antagonist?
// What movie had the antagonist kill it's victims in their dreams?
// what movie was based upon a japanese curse?
// What game is associated with mirrors?
// Michael Myers is from?
// Jason is from?
// The Nun from "The Nun/Conjuring 2" is what?
// One of the major concepts of Insidious

$(document).ready(function () {


    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unansweredQuestions = 0;
    var timeRemaining = 15;
    var intervalID;
    var indexQandA = 0; 
//index to load a different question each round without the game reset or screen refresh
    var answered = false; 
//variable to stop the timer if user has clicked an answer
    var correct;
    var triviaGame = [{
        question: "What horror movie had a clown as its main antagonist?",
        answer: ["The Thing", "Friday the 13th", "IT", "Saw"],
        correct: "2",
        image: ("assets/images/it.gif")
    }, {
        question: "What horror movie had the antagonist primarily kill its victims in their dreams?",
        answer: ["A Nightmare On Elm Street", "The Hills Have Eyes", "The Grudge", "The Ring"],
        correct: "0",
        image: ("assets//images/freddy.gif")
    }, {
        question: "What horror movie was based upon a Japanese Curse?",
        answer: ["The Ring", "The Grudge", "The Nun", "Jeepers Creepers"],
        correct: "1",
        image: ("assets//images/grudge.gif")
    }, {
        question: "What horror game is associated with mirrors?",
        answer: ["Mirrors", "Slender Man", "Bloody Mary", "Scary Stories To Tell In The Dark"],
        correct: "2",
        image: ("assets//images/mirror.gif")
    }, {
        question: "Michael Myers is the antagonist from which horror movie? ",
        answer: ["Halloween", "The Jackson 5", "Friday The 13th", "Jigsaw"],
        correct: "0",
        image: ("assets/images/source.gif")
    }, {
        question: "Jason, is the antagonist from which horror movie?",
        answer: ["Halloween", "Friday The 13th", "The Hills Have Eyes", "Saw"],
        correct: "1",
        image: ("assets//images/jason.gif")
    }, {
        question: "The Insidious series placed a heavy emphasis on the concept of?",
        answer: ["Sleep Paralysis", "Nightmares", "Quantum Physics", "Astral Projection"],
        correct: "3",
        image: ("assets//images/astro.gif")
    }, {
        question: "The creature from The Nun is actually a?",
        answer: ["Painting", "Nun", "Demon", "Ghost"],
        correct: "2",
        image: ("assets//images/nun.gif")
    }];

   

    function startGame() {
        console.log("game has begun");
        $('.start-button').remove();
        correctAnswers = 0;
        incorrectAnswers = 0;
        unansweredQuestions = 0;
        loadQandA();
    }

    function loadQandA() {
        answered = false; 
// will allow timeRemaining to be pushed back to <h5> after round reset....else statement in function timer()
        timeRemaining = 15;
        intervalID = setInterval(timer, 1000);
        if (answered === false) {
            timer();
        }
        correct = triviaGame[indexQandA].correct;
        var question = triviaGame[indexQandA].question;
        $('.question').html(question);
        for (var i = 0; i < 4; i++) {
            var answer = triviaGame[indexQandA].answer[i];
            $('.answers').append('<h4 class= answersAll id=' + i + '>' + answer + '</h4>');
        }

        $("h4").click(function () {
            var id = $(this).attr('id');
            if (id === correct) {
                answered = true; 
// stops the timer
                $('.question').text("THE ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
                correctAnswer();
            } else {
                answered = true; 
//stops the timer
                $('.question').text("YOU CHOSE: " + triviaGame[indexQandA].answer[id] + ".....HOWEVER THE ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
                incorrectAnswer();
            }
        });
    }

    function timer() {
        if (timeRemaining === 0) {
            answered = true;
            clearInterval(intervalID);
            $('.question').text("THE CORRECT ANSWER IS: " + triviaGame[indexQandA].answer[correct]);
            unAnswered();
        } else if (answered === true) {
            clearInterval(intervalID);
        } else {
            timeRemaining--;
            $('.timeRemaining').text('YOU HAVE ' + timeRemaining + ' SECONDS TO CHOOSE');
        }
    }

    function correctAnswer() {
        correctAnswers++;
        $('.timeRemaining').text("YOU HAVE ANSWERED CORRECTLY!").css({
            'color': '#3D414F'
        });
        resetRound();
    }

    function incorrectAnswer() {
        incorrectAnswers++;
        $('.timeRemaining').text("YOU HAVE ANSWERED INCORRECTLY!").css({
            'color': '#3D414F'
        });
        resetRound();

    }

    function unAnswered() {
        unansweredQuestions++;
        $('.timeRemaining').text("YOU FAILED TO CHOOSE AN ANSWER").css({
            'color': '#3D414F'
        });
        resetRound();
    }

    function resetRound() {
        $('.answersAll').remove();
        $('.answers').append('<img class=answerImage width="350" height="350" src="' + triviaGame[indexQandA].image + ' ">'); // adds answer image
        indexQandA++; 
// increments index which will load next question when loadQandA() is called again
        if (indexQandA < triviaGame.length) {
            setTimeout(function () {
                loadQandA();
                $('.answerImage').remove();
            }, 5000); 
// removes answer image from previous round
        } else {
            setTimeout(function () {
                $('.question').remove();
                $('.timeRemaining').remove();
                $('.answerImage').remove();
                $('.answers').append('<h4 class= answersAll end>CORRECT ANSWERS: ' + correctAnswers + '</h4>');
                $('.answers').append('<h4 class= answersAll end>INCORRECT ANSWERS: ' + incorrectAnswers + '</h4>');
                $('.answers').append('<h4 class= answersAll end>UNANSWERED QUESTIONS: ' + unansweredQuestions + '</h4>');
                setTimeout(function () {
                    location.reload();
                }, 7000);
            }, 5000);
        }
    };

    $('.startButton').on("click", function () {
        $('.startButton');
        startGame();

    });

});