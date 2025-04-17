     const questions = [
    {
        question: "What is the capital of France?", 
        answers: [
            { text: "Paris", correct: true},
            { text: "Brussels", correct: false},
            { text: "Sofia", correct: false},
            { text: "Leningrad", correct: false},
        ]
    },
    {
        question: "What is the capital of India?",
        answers: [
            { text: "Beirut", correct: false},
            { text: "Bangladesh", correct: false},
            { text: "Muscat", correct: false},
            { text: "New Dehli", correct: true},
        ]
    },
    {
        question: "What is the capital of Georgia?",
        answers: [
            { text: "Tibilisi", correct: true},
            { text: "Baku", correct: false},
            { text: "Ulaanbaatar", correct: false},
            { text: "Kazan", correct: false}, 
        ]
    },
    {
        question: "What is the capital of spain?",
        answers: [
            { text: "Madrid", correct: true},
            { text: "Stockholm", correct: false},
            { text: "Oslo", correct: false},
            { text: "Amsterdam", correct: false}, 
        ]
    },
    {
        question: "What is the capital of Turkey?",
        answers: [
            { text: "Algier", correct: false},
            { text: "Alexandria", correct: false},
            { text: "Istanbul", correct: true},
            { text: "Antalya", correct: false}, 
        ]
    },
    {
        question: "What is the capital of Ireland?",
        answers: [
            { text: "Belfast", correct: false},
            { text: "Cork", correct: false},
            { text: "London-Derry", correct: false},
            { text: "Dublin", correct: true}, 
        ]
    },
    {
        question: "What is the capital of Estonia?",
        answers: [
            { text: "Rotterdam", correct: false},
            { text: "Talinn", correct: true},
            { text: "Kyiv", correct: false},
            { text: "Skopje", correct: false}, 
        ]
    },
    {
        question: "What is the capital of Thailand?",
        answers: [
            { text: "Bangkok", correct: true},
            { text: "Hanoi", correct: false},
            { text: "Vang-Vieng", correct: false},
            { text: "Beijing", correct: false}, 
        ]
    },
    {
        question: "What is the capital of Indonesia?",
        answers: [
            { text: "Manilla", correct: false},
            { text: "Jakarta", correct: true},
            { text: "Vientianne", correct: false},
            { text: "Mumbai", correct: false}, 
        ]
    },
    {
        question: "What is the capital of England?",
        answers: [
            { text: "Taunton", correct: false},
            { text: "Winchester", correct: false},
            { text: "London", correct: true},
            { text: "Torrevieja", correct: false}, 
        ]
    },
    

];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const previousButton = document.getElementById("previous-btn");
previousButton.addEventListener("click", handlePreviousButton);



let currentQuestionIndex = 0; 
let score = 0; 
let userAnswers = [];


function startQuiz(){
    currentQuestionIndex = 0; 
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion(); 
}

function handlePreviousButton() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

function showQuestion() {
        resetState();

    let currentQuestion = questions[currentQuestionIndex];
     let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    previousButton.style.display = currentQuestionIndex === 0 ? "none" : "inline-block";

    const savedAnswer = userAnswers[currentQuestionIndex];
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);

        if (savedAnswer && savedAnswer.selectedText === answer.text) {
            if (savedAnswer.correct) {
                button.classList.add("correct");
            } else {
                button.classList.add("incorrect");
            }

            currentQuestion.answers.forEach((ans, idx) => {
                if (ans.correct && ans.text !== answer.text) {
                    answerButtons.children[idx]?.classList.add("correct");
                }
            });

            setTimeout(() => {
                Array.from(answerButtons.children).forEach(btn => btn.disabled = true);
            }, 0);
        }


        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
       });
    }



function resetState(){
    nextButton.style.display = "inline-block"; 
   while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
     
        }
        function selectAnswer(e) {
            const selectedBtn = e.target;
            const isCorrect = selectedBtn.dataset.correct === "true";
            userAnswers[currentQuestionIndex] = {
                selectedText: selectedBtn.innerHTML,
                correct: isCorrect
            };
             if(isCorrect){
                selectedBtn.classList.add("correct");
                score++;
            }else{
                selectedBtn.classList.add("incorrect");
            }
         Array.from(answerButtons.children).forEach(button => {
            if(button.dataset.correct === "true"){
                button.classList.add("correct");
            }
            button.disabled = true;
         });
         
}

function showScore() {
    resetState();
    const totalScore = userAnswers.reduce((acc, ans) => ans?.correct ? acc + 1 : acc, 0);
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;

    const resultContainer = document.createElement('div');
    resultContainer.classList.add('result-container');

    const correctAnswersList = document.createElement('ul');
    correctAnswersList.innerHTML = `<h3>Correct Answers:</h3>`;
    userAnswers.forEach((answer, index) => {
        if (answer?.correct) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `Q${index + 1}: ${questions[index].question} - Your answer: "${answer.selectedText}"`;
            correctAnswersList.appendChild(listItem);
        }
    });

    const incorrectAnswersList = document.createElement('ul');
    incorrectAnswersList.innerHTML = `<h3>Incorrect Answers:</h3>`;
    userAnswers.forEach((answer, index) => {
        if (!answer?.correct) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `Q${index + 1}: ${questions[index].question} - Your answer: "${answer.selectedText}"`;
            incorrectAnswersList.appendChild(listItem);
        }
    });

    resultContainer.appendChild(correctAnswersList);
    resultContainer.appendChild(incorrectAnswersList);

    document.body.appendChild(resultContainer);



    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

    startQuiz();
        
    




