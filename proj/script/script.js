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