//Check if javaScript Works
console.log("Js works");
document.body.style.overflowX = "hidden";
document.body.style.overflowY = "auto";


let QuizCounter = 0;
let resultsRight = 0;

let title = [
    "Git-Newbie",
    "Commit-Explorer",
    "Branch-Begleiter",
    "Merge-Maestro",
    "Git-Guru",
    "Version-Control-Virtuose"
  ];
  

let quizDataGlobal = []; 

function newQuiz(){
    if (quizDataGlobal.length > 0) {
        return Promise.resolve(quizDataGlobal); 
    }
    
    return fetch('../backend/data/questionAndAnswerEnglish.json')
        .then(response => response.json())
        .then(data => {
            let numberOfQuestionsReturning = 10; 
            let numberOfQuestionsInJson = data.quiz.length; 

            const quizData = data.quiz;
            let quizDataUsed = [];
            let quizAllQuestions = [];

            function getRandomNumber(){
                let randomNumber = Math.floor(Math.random() * numberOfQuestionsInJson);
                while(quizDataUsed.includes(randomNumber)){
                    randomNumber = Math.floor(Math.random() * numberOfQuestionsInJson);
                }
                quizDataUsed.push(randomNumber);
                return randomNumber;
            }

            for(let i = 0; i < numberOfQuestionsReturning; i++){
                quizAllQuestions.push(quizData[getRandomNumber()]);
            }

            quizDataGlobal = quizAllQuestions;
            return quizAllQuestions;
        })
        .catch(error => {
            console.error("Error loading the JSON file:", error);
        });
}

function quiz(){
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "hidden";

    document.getElementById('cirtlesPART1').style.display="none";
    document.getElementById('chooseAdvancedOrBasic').style.display="none";
    document.getElementById('header').style.display="none";
    document.getElementById('indexButton').style.display="none";

    document.getElementById('quizBox').style.display="block";
    document.getElementById('timerBox').style.display="block";
    document.getElementById('cirtlesPART2').style.display="block";

    newQuiz().then(() => quizBuilder()); 
}

function quizBuilder(){
    document.getElementById('quizBox').style.display="block";
    
    if(QuizCounter == 10){
        loadEnd();
        return;
    }

    document.getElementById('wrapper').innerHTML=" ";
    
    // Verwende das bereits geladene Quiz
    let data = quizDataGlobal;

    document.getElementById('wrapper').innerHTML+=`   
        <div id="questionCount">Question ${QuizCounter+1}: </div>
        <div id="question">${data[QuizCounter].question}</div>
        <div id="choosingAnswere">
            <div id="answereOption0" onclick="check('${data[QuizCounter].options[0]}', '${data[QuizCounter].answer}', 0)"> <div id="A">A)</div> <p>${data[QuizCounter].options[2]}</p></div>
            <div id="answereOption1" onclick="check('${data[QuizCounter].options[1]}', '${data[QuizCounter].answer}', 1)"> <div id="B">B)</div> <p>${data[QuizCounter].options[1]}</p></div>
            <div id="answereOption2" onclick="check('${data[QuizCounter].options[2]}', '${data[QuizCounter].answer}', 2)"> <div id="C">C)</div> <p>${data[QuizCounter].options[0]}</p></div>
            <div id="answereOption3" onclick="check('${data[QuizCounter].options[3]}', '${data[QuizCounter].answer}', 3)"> <div id="D">D)</div> <p>${data[QuizCounter].options[3]}</p></div>
        </div>
    `;
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


function loadingResults(minutes, seconds){
    let gitTitle;

    if (resultsRight == 10) {
        gitTitle = title[5];  
    } 
    else if (resultsRight == 9) {
        gitTitle = title[4];  
    } 
    else if (resultsRight == 8) {
        gitTitle = title[3];  
    } 
    else if (resultsRight == 6 || resultsRight == 7) {
        gitTitle = title[2];  
    } 
    else if (resultsRight == 4 || resultsRight == 5) {
        gitTitle = title[1];  
    }
    else if (resultsRight >= 0 && resultsRight <= 3) {
        gitTitle = title[0];  
    }

    document.querySelector('#loaderTXT').style.display="none";
    document.querySelector('.loader').style.display="none";

    document.getElementById('wrapper').style.display="block";
    document.getElementById('wrapper').innerHTML+= `
        <div id="title">${gitTitle}</div>
        <div id="endTime">${minutes} min ${seconds} sec</div>

        <div id="buttonBackToQuiz" onclick="reloadQuiz()">back</div>
    `;
}

function reloadQuiz(){
    window.location.href="./quiz.html";
}



let intervalId; 
let stoppedTime = 0; 
let currentTime = 0; 

function startTimer(duration, display) {
    let timer = duration, minutes, seconds;

    // Setze den Intervall, damit er in `intervalId` gespeichert wird
    intervalId = setInterval(function () {
        currentTime = timer;  // Speichere die aktuelle Zeit in `currentTime`
        
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            loadEnd();
        }
    }, 1000);
}

// Diese Methode stoppt den Timer und speichert die gestoppte Zeit
function loadEnd() {
    // Stoppe den Timer
    clearInterval(intervalId);

    // Speichere die gestoppte Zeit in der globalen Variable
    stoppedTime = currentTime;

    // Berechne die gestoppte Zeit in Minuten und Sekunden
    let minutes = parseInt(stoppedTime / 60, 10);
    let seconds = stoppedTime % 60;

    // Zeige die gestoppte Zeit an (in der Konsole oder irgendwo anders)
    console.log("Timer gestoppt: " + minutes + " Minuten und " + seconds + " Sekunden");

    document.getElementById('wrapper').innerHTML=" ";
    document.getElementById('timerBox').style.display="none";
    document.querySelector('#loaderTXT').style.display="block";
    document.querySelector('.loader').style.display="block";
    
    setTimeout(() => {
        loadingResults(minutes, seconds);
    }, 5000);
}


function stopTimer() {
    clearInterval(intervalId);

    
    stoppedTime = currentTime;
    
    
    let minutes = parseInt(stoppedTime / 60, 10);
    let seconds = stoppedTime % 60;

    console.log("Timer gestoppt: " + minutes + " Minuten und " + seconds + " Sekunden");
}


window.onload = function () {
    var count = 180,
        display = document.querySelector('#time');
      
    document.getElementById('Basic').addEventListener('click', function () { 
        startTimer(count, display);
    });    

    document.getElementById('Advanced').addEventListener('click', function () { 
        startTimer(count, display);
    });

};



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
