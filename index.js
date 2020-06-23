function loadFinalPage(){
    console.log('Loading final page.')

    
}

function nextButtonListener(){
    console.log('listening to Next button')

    $('button.next').on('click',function(e){
        e.preventDefault();
        console.log('Loading next...')

        questionCount++;

        if (questionCount<11) {
            console.log('Current question: '+questionCount)

            $('.output').html('')
            $('.QA').html(`
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
        $('.output').html('')
        $('.QA').html(`
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
    $('.output').html(`
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