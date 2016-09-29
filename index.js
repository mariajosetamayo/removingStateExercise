
// State object that keeps track of changes
var state = {
    currentQuestionIndex:0,
    score:0,
}

// array with questions
var QUESTIONS = [
    {
        text: '<:48:x<:65:=<:6C:$=$=$$~<:03:+$~<:ffffffffffffffbd:+$<:ffffffffffffffb1:+$<:57:~$~<:18:x+$~<:03:+$~<:06:x-$x<:0e:x-$=x<:43:x-$',
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: 0
    },
    {
        text: '+0+0+0+0+0+0+0+2)+0+0+9)+7))+3)-0-0-0-0-0-0-0-9)+0+0+0+0+0+0+0+0+7)-8)+3)-6)-8)-7-0-0-0-0-0-0)',
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: 1
    },
    {
        text: '*6*3p*4*3*2*0p*2*1*0pp>0*1*0p*5*4*0p*5*4*2*1*0p*4*3p*1*0p/+0p+0*6*5*2p+0*5*0p',
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: 2
    },
    {
        text: ']xhhhhooooooooohhhhhhxooooooooxooooooxjjjxhoooohhhxhohhhhhhhxhhhhjjjhhhxhhhhooooooooohhhhhhxjjjxxjjjjjjjxjhhhhxjhhhhhhhhjjjhh~',
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: 3
    }
]

// variables to obtain elements from html
var questionsPageElement = $('.questions-page')
var questionCurrentElement = $('.question-current')
var questionsTotalElement = $('.questions-total')
var questionElement = $('.question')
var answersElement = $('.answers')
var resultsPageElement = $('.results-page')
var scoreElement = $('.score')
var restartButtonElement = $('.restart-button')


///// Game Logic /////

// function for keeping track of current question
var presentQuestion = function(state){
    return QUESTIONS[state.currentQuestionIndex]
}

// function for increasing the score
var increaseScore = function(state){
    state.score++
    scoreElement.text(state.score)
}

// function for evaluating if user had the correct answer and to increase the question index
var userAnswer = function(choice){
    var question = presentQuestion(state)
    if(question.correct === choice){
        increaseScore(state)
    }
    state.currentQuestionIndex++
}

// function to specify where quiz ends
var hasNextQuestion = function(state){
    return (state.currentQuestionIndex < QUESTIONS.length)
}

// function to start a new quiz
var newGame = function(state){
    state.currentQuestionIndex = 0
    state.score = 0
}


///// Display Logic /////

// jQuery to start the quiz
$(document).ready(function(){
    renderQuestions(state)
    questionsTotalElement.text(QUESTIONS.length)
})

// function to display the questions
var renderQuestions = function(state){
    var question = presentQuestion(state)
    questionCurrentElement.text(state.currentQuestionIndex)
    questionElement.text(question.text)
    answersElement.empty()
    for (var i = 0; i < question.answers.length; i++){
        var answer = question.answers[i]
        answersElement.append("<li><button type='button'>" + answer + "</button></li>")
    }
}

// functions to show or hide the questions and the results
var showResult = function(){
    questionsPageElement.hide()
    resultsPageElement.show()
}

var showQuestions = function(){
    questionsPageElement.show()
    resultsPageElement.hide()
}

///// Event Handlers /////

// event handler to obtain user choice, evaluate it, and when the quiz ends show the results
answersElement.on("click","button",function(){
    var choice = $(this).parent().index()
    userAnswer(choice)
    hasNextQuestion(state)? renderQuestions(state) : showResult()
})

// event handler to start a new game after clicking restart button
restartButtonElement.click(function(){
    scoreElement.text(0)
    newGame(state)
    renderQuestions(state)
    showQuestions()
})










