function repeatButtonListener() {
    console.log('Listening to repeat button')
    
    $('button.repeat').on('click',function(e){
        loadStartPage();
    })
}

function loadFinalPage(){
    console.log('Loading final page.')

    $('nav').toggleClass('hidden')
    $('section.QA').html('')
    $('section.output').html(`
        <p>Thanks for completing our quiz. We hope you enjoyed it and learned something useful. Your final score is:</p>
        <p><span class="score">10</span>/10</p>
        <button type="button" name="Repeat" class="repeat">Repeat Quiz</button>
    `)
    repeatButtonListener();
}

function nextButtonListener(){
    console.log('listening to Next button')

    $('button.next').on('click',function(e){
        e.preventDefault();
        console.log('Loading next...')

        questionCount++;
        $('nav span.questionCount').text(questionCount)
        $('nav span.correctCount').text(correctCount)
        $('nav span.incorrectCount').text(incorrectCount)


        if (questionCount<11) {
            console.log('Current question: '+questionCount)

            $('section.output').html('')
            $('section.QA').html(`
            <form>
                <fieldset>
                    <legend>How are you?</legend>
                    <input type="radio" id="ans1" name="answer">
                    <label for="ans1">Answer</label><br>
                    <input type="radio" id="ans2" name="answer">
                    <label for="ans2">Answer</label><br>
                    <input type="radio" id="ans3" name="answer">
                    <label for="ans3">Answer</label><br>
                    <input type="radio" id="ans4" name="answer">
                    <label for="ans4">Answer</label><br>
                </fieldset>
                <button type="submit" class="submit" name="Submit">Submit</button>
            </form>
            `)
            submitListener();
        }
        else {
            loadFinalPage();
        }
        

    })
}

function feedbackMessage(questionCount,isCorrect,answerSubmittedId){
    let response = QAdata[questionCount-1].answers[answerSubmittedId].response

    console.log('Response: ' + response)

    if (isCorrect){
        return `<p>Correct!</p>
                <p>${response}</p>`
    }
    else {
        let correctAnsId = QAdata[questionCount-1].correctanswerId
        let correctAnswer = QAdata[questionCount-1].answers[correctAnsId].answer
        
        return `<p>Incorrect!</p>
                <p>${response}</p>
                <p>The correct answer is:</p>
                <p>${correctAnswer}</p>
                `
    }
}

function submitListener(){
    console.log('listening to Submit button')
    $('button.submit').on('click',function(e){
        
        e.preventDefault();

        let answerSubmittedId = parseInt($('input[name="answer"]:checked').val())
        console.log('Answer submitted: '+ answerSubmittedId)

        let isCorrect = answerSubmittedId === QAdata[questionCount].correctanswerId

        console.log('Answer is correct: '+isCorrect)
        if (isCorrect){correctCount++;}
        else{incorrectCount++;}

        $('nav span.correctCount').text(correctCount)
        $('nav span.incorrectCount').text(incorrectCount)

        $('section.output').html(`
            ${feedbackMessage(questionCount,isCorrect,answerSubmittedId)}
            <button type="submit" class="next" name="Next">Next</button>
        `)

        $('button.submit').toggleClass('hidden')

        nextButtonListener();
    })
}

function startButtonListener(){
    
    console.log('listening to start button')
    
    questionCount = 0;
    correctCount = 0;
    incorrectCount = 0;
    
    $('button.start').on('click',function(e){

        console.log('start button clicked')

        questionCount++;
        console.log('current question: ' + questionCount)

        $('nav').removeClass('hidden')
        $('nav span.questionCount').text(questionCount)
        $('nav span.correctCount').text(correctCount)
        $('nav span.incorrectCount').text(incorrectCount)

        $('section.output').html('')
        $('section.QA').html(`
        <form>
            <fieldset>
                <legend>${QAdata[questionCount-1].question}</legend>
                <input type="radio" id="ans1" name="answer" value=0>
                <label for="ans1">${QAdata[questionCount-1].answers[0].answer}</label><br>
                <input type="radio" id="ans2" name="answer" value=1>
                <label for="ans2">${QAdata[questionCount-1].answers[1].answer}</label><br>
                <input type="radio" id="ans3" name="answer" value=2>
                <label for="ans3">${QAdata[questionCount-1].answers[2].answer}</label><br>
                <input type="radio" id="ans4" name="answer" value=3>
                <label for="ans4">${QAdata[questionCount-1].answers[3].answer}</label><br>
            </fieldset>
            <button type="submit" class="submit" name="Submit">Submit</button>
        </form>
        `)
        submitListener();
    })
}

function loadStartPage(){
    console.log('loading start page')
    $('section.output').html(`
    <p>These questions will touch on some important issues regarding COVID19. By completing this quiz, you'll know how prepared you are, as well as gain valuable answers after each question. All information is referenced from official sources.</p>
    <button type="button" class="start" name="Start">Start Quiz</button>`
    )
    startButtonListener();
}

function main(){
    console.log('main running')
    loadStartPage();
}

$(main);