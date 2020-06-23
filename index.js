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

function submitListener(){
    console.log('listening to Submit button')
    $('button.submit').on('click',function(e){
        
        e.preventDefault();
        console.log('Answer submitted')

        $('.output').html(`
            <p>if (right){"You know your stuff! Congrats!"} else {"We're sorry but you missed"}.</p>
            <p class="reveal-correct">if (incorrect){The correct answer is: }</p>
            <p><span>'Correct answer here'</span></p>
        `)

        $('button.submit').toggleClass('submit next')
        $('button.next').attr('name','Next')
        $('button.next').text('Next')

        nextButtonListener();
    })
}

function startButtonListener(){
    
    console.log('listening to start button')
    
    questionCount = 0;
    
    $('button.start').on('click',function(e){

        console.log('start button clicked')

        questionCount++;
        console.log('current question: ' + questionCount)

        $('nav').removeClass('hidden')
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