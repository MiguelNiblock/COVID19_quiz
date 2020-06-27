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
        $('section.QA').html(`
            <p class="final">For all your effort, here's a cookie. :) --></p>
            <img src="https://media0.giphy.com/media/5t3FyUHyJiUyA/giphy.gif?cid=ecf05e4788764498652a09e9805f7519074a46b9f86a7801&amp;rid=giphy.gif" class="gif">
        `)
        $('section.output').html(`
            <p>Thanks for completing our quiz. We hope you enjoyed it and learned something useful. Your final score is:</p>
            <h2>${correctCount}/10</h2>
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
        $('section.output').toggleClass('hidden')
        $('section.QA').html(`
        <form>
            <fieldset>
                <legend>${QAdata[questionCount-1].question}</legend>
                <label for="ans1">
                    <input type="radio" id="ans1" name="answer" value="0" required checked>
                    <img src="coronavirus_icon.png">
                    ${QAdata[questionCount-1].answers[0].answer}
                </label><br>
                <label for="ans2">
                    <input type="radio" id="ans2" name="answer" value="1" required>
                    <img src="coronavirus_icon.png">
                    ${QAdata[questionCount-1].answers[1].answer}
                </label><br>
                <label for="ans3">
                    <input type="radio" id="ans3" name="answer" value="2" required>
                    <img src="coronavirus_icon.png">
                    ${QAdata[questionCount-1].answers[2].answer}
                </label><br>
                <label for="ans4">
                    <input type="radio" id="ans4" name="answer" value="3" required>
                    <img src="coronavirus_icon.png">
                    ${QAdata[questionCount-1].answers[3].answer}
                </label><br>
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
        return `<p class="bold">Correct!</p>
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

        let correctAnsId = parseInt(QAdata[questionCount-1].correctanswerId)

        let isCorrect = answerSubmittedId === correctAnsId
        console.log('Answer is correct: '+isCorrect)

        if (isCorrect){
            correctCount++; 
            $('input[name="answer"]:checked').parent().toggleClass('correct')
        }
        else{
            incorrectCount++;
            $('input[name="answer"]:checked').parent().toggleClass('wrong')
            $(`input[value=${correctAnsId}]`).parent().toggleClass('correct')
        }

        $('nav span.correctCount').text(correctCount)
        $('nav span.incorrectCount').text(incorrectCount)

        $('section.output').html(`
            ${feedbackMessage(questionCount,isCorrect,answerSubmittedId)}
            ${whichNextButton(questionCount)}
            <br>
        `)
        $('section.output').toggleClass('hidden')

        $('button.submit').toggleClass('hidden')

        $('label').toggleClass('gray')

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
        $('section.output').toggleClass('hidden')
        $('section.QA').html(`
        <form>
            <fieldset>
                <legend>${QAdata[questionCount-1].question}</legend>
                <label for="ans1">
                    <input type="radio" id="ans1" name="answer" value=0 required checked>
                    <img src="coronavirus_icon.png">
                    ${QAdata[questionCount-1].answers[0].answer}
                </label><br>
                <label for="ans2">
                    <input type="radio" id="ans2" name="answer" value=1 required>
                    <img src="coronavirus_icon.png">
                    ${QAdata[questionCount-1].answers[1].answer}
                </label><br>
                <label for="ans3">
                    <input type="radio" id="ans3" name="answer" value=2 required>
                    <img src="coronavirus_icon.png">
                    ${QAdata[questionCount-1].answers[2].answer}
                </label><br>
                <label for="ans4">
                    <input type="radio" id="ans4" name="answer" value=3 required>
                    <img src="coronavirus_icon.png">
                    ${QAdata[questionCount-1].answers[3].answer}
                </label><br>
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
    $('section.QA').html('')
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