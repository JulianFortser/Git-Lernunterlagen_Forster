//Check if javaScript Works
console.log("Js works");


// Fetch data from the JSON file and use it also as Main
fetch('./data/questionAndAnswerEnglish.json')
    .then(response => response.json())  // Parse the response as JSON
    .then(data => {
        // Handle the data
        const quizData = data.quiz;
        

        function getNextRandomQuestion(){
            return quizData[1];
        }


        //Main
        console.log(getNextRandomQuestion());
    })
    .catch(error => {
    console.error("Error loading the JSON file:", error);
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
