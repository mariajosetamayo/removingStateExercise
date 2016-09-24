
//<-- state object with all the questions information -->

var state = {
    question1:{
        text: '<:48:x<:65:=<:6C:$=$=$$~<:03:+$~<:ffffffffffffffbd:+$<:ffffffffffffffb1:+$<:57:~$~<:18:x+$~<:03:+$~<:06:x-$x<:0e:x-$=x<:43:x-$',
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: 0
    },
    
    question2:{
        text: '+0+0+0+0+0+0+0+2)+0+0+9)+7))+3)-0-0-0-0-0-0-0-9)+0+0+0+0+0+0+0+0+7)-8)+3)-6)-8)-7-0-0-0-0-0-0)',
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: 1
    },
    
    question3:{
        text: '*6*3p*4*3*2*0p*2*1*0pp>0*1*0p*5*4*0p*5*4*2*1*0p*4*3p*1*0p/+0p+0*6*5*2p+0*5*0p',
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: 2
    },
    
    question4:{
        text: ']xhhhhooooooooohhhhhhxooooooooxooooooxjjjxhoooohhhxhohhhhhhhxhhhhjjjhhhxhhhhooooooooohhhhhhxjjjxxjjjjjjjxjhhhhxjhhhhhhhhjjjhh~',
        answers: [
            '0815',
            '2B',
            'BAM128',
            'Barely'
        ],
        correct: 3
    }
 };

//<-- Functions to modify the state object -->

var presentQuestion = function(state,questionIndex){
    var arrayQuestions = []
    arrayQuestions.push(state.question1, state.question2, state.question3, state.question4)
    window.currentQuestion = arrayQuestions[questionIndex]
}

var quizPoints = function(state,choice){
    var score = 0
    if(window.currentQuestion.correct === choice){
        score++
    }
    state["score"] = score
}

//<-- Function to calculte total score -->

var scorePoints = function(){
    if(state.score === 1){
        currentPoints = 1
    }
    else{
        currentPoints = 0
    }
    totalPoints = totalPoints + currentPoints
    currentPoints = 0  
}

//<-- Functions to render content in DOM -->

var renderQuestions = function(element){
    var questionHTML = "<p>" + window.currentQuestion.text + "</p>"
    element.html(questionHTML)
}

var renderOptions = function(element){
    var optionsHTML = window.currentQuestion.answers.map(function(item){
        return "<li><button>" + item + "</button></li>"
    })
    element.html(optionsHTML)
}

var renderScore = function(state, element){
    var scoreHTML = "<div>You scored <span class='score'>" + totalPoints + "</span>/<span class='questions-total'>4</span></div>" + "<button class='restart-button'>Restart</button>"
    element.html(scoreHTML)
}

// <--Global variables to keep track of questions and calculate points -->

var counter = 0
var totalPoints = 0
var currentPoints = 0

// <-- jQuery to make changes in DOM -->

$(".answers").on("click","button",function(event){
    event.preventDefault()
    var choice = $(this).parent().index();
    var questionIndex = counter + 1
    $(".question-current").text(questionIndex + 1)  
    if((questionIndex+1)<=4){
        presentQuestion(state,questionIndex)
        quizPoints(state,choice+1)
        renderQuestions($('.question'))
        renderOptions($(".answers"))
        scorePoints()
        counter++
    }
    else {
        scorePoints()
        $(".questions-page").hide()
        $(".results-page").show()
        renderScore(state, $(".results-page"))
    }
})

$(".results-page").on("click","button",function(){
    $(".questions-page").show()
    $(".results-page").hide()
    counter=0
    presentQuestion(state,counter)
    renderQuestions($('.question'))
    renderOptions($(".answers"))
    $(".question-current").text(1)
    totalPoints = 0
})

$(document).ready(function(){
    presentQuestion(state,counter)
    renderQuestions($('.question'))
    renderOptions($(".answers"))
});









