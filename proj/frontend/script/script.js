//Check if javaScript Works
console.log("Js works");
document.body.style.overflowX = "hidden";
document.body.style.overflowY = "auto";


let QuizCounter = 0;
let resultsRight = 0;


// Fetch data from the JSON file and use it also as Main
function newQuiz(){
    return fetch('../backend/data/questionAndAnswerEnglish.json')
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



function quiz(){
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "hidden";
    document.getElementById('cirtlesPART1').style.display="none";
    document.getElementById('chooseAdvancedOrBasic').style.display="none";
    document.getElementById('header').style.display="none";
    document.getElementById('indexButton').style.display="none";

    document.getElementById('quizBox').style.display="block";
    document.getElementById('cirtlesPART2').style.display="block";

    quizBuilder();
}







function quizBuilder(){
    document.getElementById('quizBox').style.display="block";
    if(QuizCounter == 10){
        loadEnd();
    }

    document.getElementById('wrapper').innerHTML=" ";
    newQuiz().then(data => {
        console.log("Quiz Data:", data); // Logs the selected quiz data
        
        document.getElementById('wrapper').innerHTML+=`   
            <div id="questionCount">Question ${QuizCounter+1}: </div>

            <div id="question">${data[QuizCounter].question}</div>
            <div id="choosingAnswere">
                <div id="answereOption0" onclick="check('${data[QuizCounter].options[0]}', '${data[QuizCounter].answer}', 0)"> <div id="A">A)</div> <p>${data[QuizCounter].options[0]}</p></div>
                <div id="answereOption1" onclick="check('${data[QuizCounter].options[1]}', '${data[QuizCounter].answer}', 1)"> <div id="B">B)</div> <p>${data[QuizCounter].options[1]}</p></div>
                <div id="answereOption2" onclick="check('${data[QuizCounter].options[2]}', '${data[QuizCounter].answer}', 2)"> <div id="C">C)</div> <p>${data[QuizCounter].options[2]}</p></div>
                <div id="answereOption3" onclick="check('${data[QuizCounter].options[3]}', '${data[QuizCounter].answer}', 3)"> <div id="D">D)</div> <p>${data[QuizCounter].options[3]}</p></div>
            </div>
        
        `;

    }); 
}

function check(id1, id2, id3){
        if(id1 == id2){
            document.getElementById('answereOption'+id3).style.backgroundColor="Green";
            QuizCounter++;
            resultsRight++;

            setTimeout(() => {
                quizBuilder();
            }, 500); 
            
        }
        else if (id1 != id2){
            document.getElementById('answereOption'+id3).style.backgroundColor="Red";

            QuizCounter++;
            setTimeout(() => {
                quizBuilder();
            }, 500);
        }
}


function loadEnd() {
    document.getElementById('wrapper').innerHTML=" ";
    document.getElementById('wrapper').style.display="none";
    document.querySelector('#loaderTXT').style.display="block";
    document.querySelector('.loader').style.display="block";
    setTimeout(() => {
        loadingResults();
    }, 5000);
}

function loadingResults(){
    document.querySelector('#loaderTXT').style.display="none";
    document.querySelector('.loader').style.display="none";

    document.getElementById('wrapper').style.display="block";
    document.getElementById('wrapper').innerHTML+= `
    
    `;
}



/*function generateIndividualSlideFrames(text) {
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

*/
function back(){
    window.location.href = "../frontend/index.html"
}


const animationFrames = [
    "__________",
    "____G_____",
    "___G______",
    "__G_______",
    "_G________",
    "G_________",
    "G___i_____",
    "G__i______",
    "G_i_______",
    "Gi________",
    "Gi__t_____",
    "Gi_t______",
    "Git_____G_",
    "Git____G__",
    "Git__G____",
    "Git G_____",
    "Git G___u_",
    "Git G__u__",
    "Git G_u___",
    "Git Gu____",
    "Git Gu__d_",
    "Git Gu_d__",
    "Git Gud___",
    "Git Gud__!",
    "Git Gud_!_",
    "Git Gud!__",
    "Git Gud!_?",
    "Git Gud!?_",
    "Git Gud!?",
    "Git Gud!?"
];

// Funktion, die durch das Array iteriert und den Titel aktualisiert
async function animateTitle(frames) {
    while (true) {
        for (const frame of frames) {
            document.title = frame;
            await new Promise(resolve => setTimeout(resolve, 200));
        }
    }
}

// Animation starten
animateTitle(animationFrames);
const slider = document.querySelector('#third_section .slider')
const sections = gsap.utils.toArray(".slider section")

let tl = gsap.timeline({
    defaults:{
        ease : "none"
    },
    scrollTrigger:{
        trigger: slider,
        pin:true,
        scrub:2,
        end: () => "+=" + slider.offsetWidth,
    }
})

tl.to(slider, {
    xPercent:-60  
})
sections.forEach((stop, index) => {
    tl.to(stop, {
            yPercent: -18,
            opacity: 1,
            boxShadow: "0px 10px 168px -29px rgba(68,61,255,1)",
            border: "2px solid #443DFF",
            scrollTrigger: {
                trigger: stop,
                start: "left center",
                end: "center center",
                containerAnimation: tl,
                scrub: true,
            }
        }
    );
    tl.to(stop.querySelector(".inner"),{
        yPercent: -18,
        opacity: 1,
        scrollTrigger: {
                trigger: stop,
                start: "left center",
                end: "center center",
                containerAnimation: tl,
                scrub: true,
                stagger:true
            }
    })
    if (sections[index+1]) {
        tl.from(stop, {
                yPercent: -18,
                opacity: 1,
                boxShadow: "0px 10px 168px -29px rgba(68,61,255,1)",
                border: "2px solid #443DFF",
                scrollTrigger: {
                trigger: sections[index+1],
                start: "left center",
                end: "right center", // Adjusted end position to wait longer
                containerAnimation: tl,
                scrub: true,
                markers: true
                }
            })
            tl.from(stop.querySelector(".inner"),{
            yPercent: -18,
            opacity: 1,
                scrollTrigger: {
                trigger: sections[index+1],
                start: "left center",
                end: "right center", // Adjusted end position to wait longer
                containerAnimation: tl,
                scrub: true,
                markers: true
                }
            })
    }
});
