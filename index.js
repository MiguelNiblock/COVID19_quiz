function repeatButtonListener() {
    console.log('Listening to repeat button')
    
    $('button.repeat').on('click',function(e){
        console.log('repeat button clicked')
        loadStartPage();
    })
}

function endButtonListener(){
    console.log('Listening to end button...')

    $('button.end').on('click',function(e){

        console.log('Loading final page.')

        $('nav').toggleClass('hidden')
        $('section.QA').html('')
        $('section.output').html(`
            <p>Thanks for completing our quiz. We hope you enjoyed it and learned something useful. Your final score is:</p>
            <p>${correctCount}/10</p>
            <button type="button" name="Repeat" class="repeat">Repeat Quiz</button>
            <br>
        `)
        repeatButtonListener();
        $('button.repeat').focus();
    })
}

function nextButtonListener(){
    console.log('listening to Next button')

    $('button.next').on('click',function(e){
        e.preventDefault();
        console.log('Loading next...')

        questionCount++;
        $('nav span.questionCount').text(questionCount);

        console.log('Current question: '+questionCount)

        $('section.output').html('')
        $('section.QA').html(`
        <form>
            <fieldset>
                <legend>${QAdata[questionCount-1].question}</legend>
                <input type="radio" id="ans1" name="answer" value="0" required checked>
                <label for="ans1" class="hoverblue">${QAdata[questionCount-1].answers[0].answer}</label><br>
                <input type="radio" id="ans2" name="answer" value="1" required>
                <label for="ans2" class="hoverblue">${QAdata[questionCount-1].answers[1].answer}</label><br>
                <input type="radio" id="ans3" name="answer" value="2" required>
                <label for="ans3" class="hoverblue">${QAdata[questionCount-1].answers[2].answer}</label><br>
                <input type="radio" id="ans4" name="answer" value="3" required>
                <label for="ans4" class="hoverblue">${QAdata[questionCount-1].answers[3].answer}</label><br>
            </fieldset>
            <button type="submit" class="submit" name="Submit">Submit</button>
            <br>
        </form>
        `)
        $('#ans1').focus();
        submitListener();
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
        
        return `<p class="bold">Incorrect!</p>
                <p>${response}</p>
                <p class="bold">The correct answer is:</p>
                <p>${correctAnswer}</p>
                `
    }
}

function whichNextButton(questionCount){
    if (questionCount<10) {
        return `<button type="submit" class="next"          name="Next">Next</button>`}
    else {
        return `<button type="submit" class="end"          name="Summary">End Summary</button>`
    }
}

function submitListener(){
    console.log('listening to Submit button')
    $('button.submit').on('click',function(e){
        
        e.preventDefault();

        let answerSubmittedId = parseInt($('input[name="answer"]:checked').val())
        console.log('Answer submitted: '+ answerSubmittedId)

        let isCorrect = answerSubmittedId === QAdata[questionCount-1].correctanswerId

        console.log('Answer is correct: '+isCorrect)
        if (isCorrect){correctCount++;}
        else{incorrectCount++;}

        $('nav span.correctCount').text(correctCount)
        $('nav span.incorrectCount').text(incorrectCount)

        $('section.output').html(`
            ${feedbackMessage(questionCount,isCorrect,answerSubmittedId)}
            ${whichNextButton(questionCount)}
            <br>
        `)

        $('button.submit').toggleClass('hidden')

        $('.hoverblue').toggleClass('hoverblue gray')

        let rads = document.getElementsByName("answer")

        for(let i=0; i<rads.length;i++ ){
            rads[i].disabled = true;
        } 

        if (questionCount < 10) {
            nextButtonListener();
            $('button.next').focus();
        }
        else{
            endButtonListener();
            $('button.end').focus();
        }
        
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
                <input type="radio" id="ans1" name="answer" value=0 required checked>
                <label for="ans1" class="hoverblue">${QAdata[questionCount-1].answers[0].answer}</label><br>
                <input type="radio" id="ans2" name="answer" value=1 required>
                <label for="ans2" class="hoverblue">${QAdata[questionCount-1].answers[1].answer}</label><br>
                <input type="radio" id="ans3" name="answer" value=2 required>
                <label for="ans3" class="hoverblue">${QAdata[questionCount-1].answers[2].answer}</label><br>
                <input type="radio" id="ans4" name="answer" value=3 required>
                <label for="ans4" class="hoverblue">${QAdata[questionCount-1].answers[3].answer}</label><br>
            </fieldset>
            <button type="submit" class="submit" name="Submit">Submit</button>
            <br>
        </form>
        `)
        $('#ans1').focus();
        submitListener();
    })
}

function loadStartPage(){
    console.log('loading start page')
    $('section.output').html(`
    <p>These questions will touch on some important issues regarding COVID19. By completing this quiz, you'll know how prepared you are, as well as gain valuable answers after each question. All information is referenced from official sources.</p>
    <button type="button" class="start" name="Start" autofocus>Start Quiz</button>
    <br>`
    )
    startButtonListener();
    $('button.start').focus();
}

function main(){
    console.log('main running')
    loadStartPage();
}

$(main);