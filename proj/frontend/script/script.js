//Check if javaScript Works
console.log("Js works");


// Fetch data from the JSON file and use it also as Main
function newQuiz(){
    return fetch('./data/questionAndAnswerEnglish.json')
        .then(response => response.json())  // Parse the response as JSON
        .then(data => {

            // <---------- Variables ----------->
            
                //Variables to change
                let numberOfQuestionsReturning = 10; //should not be longer than numberOfQuestionsInJson
                let numberOfQuestionsInJson = data.quiz.length; //30 currently

                //Variables NOT to change
                const quizData = data.quiz;
                let quizDataUsed = [];
                let quizAllQuestions = [];

            // <---------- functions ----------->
            
                //getting a random number between 0 - 30 and each number can only be returned once
                function getRandomNumber(){
                    let randomNumber = Math.floor(Math.random() * numberOfQuestionsInJson);
                    while(quizDataUsed.includes(randomNumber)){
                        randomNumber = Math.floor(Math.random() * numberOfQuestionsInJson);
                    }
                    quizDataUsed.push(randomNumber);
                    return randomNumber;
                }

            // <---------- code ----------->

                //getting 10 (questions + options + anwsers) out of data and pushing them into the object "quizAllQuestions"
                for(let i = 0; i < numberOfQuestionsReturning; i++){
                    quizAllQuestions.push(quizData[getRandomNumber()]);
                }

                //returning "quizAllQuestions" | it contains 10 questions + options + answers
                return quizAllQuestions

        })
        .catch(error => {
        console.error("Error loading the JSON file:", error);
        });
    }

// Code snippet for Marc | data is a array with 10 questions
newQuiz().then(data => {
    console.log("Quiz Data:", data); // Logs the selected quiz data
    
});

function generateIndividualSlideFrames(text) {
    const frames = [];
    const length = text.length;
    let currentFrame = "_".repeat(length).split("");

    // Füge jeden Buchstaben einzeln hinzu und lasse ihn "sliden"
    for (let i = 0; i < length; i++) {
        for (let j = length - 1; j >= i; j--) {
            currentFrame[j] = text[i];
            frames.push(currentFrame.join(""));
            currentFrame[j] = "_"; // Zurücksetzen für den nächsten Slide
        }
        currentFrame[i] = text[i]; // Buchstaben an der finalen Position fixieren
    }

    return frames;
}

// Beispielnutzung:
const text = "Hallo";
const frames = generateIndividualSlideFrames(text);

console.log(frames);
// 0c549648b9fd5516ed139fd46f8e6ec87cf29589


function back(){
    window.location.href = "../frontend/index.html"
}
