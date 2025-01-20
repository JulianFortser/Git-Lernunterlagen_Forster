let answersD = [
    /*1*/
    /*2*/
    /*3*/
    /*4*/
]
let questionsD = [
    /*1*/
    /*2*/
    /*3*/
    /*4*/
]
let answersE = [
    /*1*/ { A: "git init", B: "git start", C: "", D: "" },
    /*2*/ { A: "", B: "", C: "", D: "" },
    /*3*/ { A: "", B: "", C: "", D: "" },
    /*4*/ { A: "", B: "", C: "", D: "" }
]
let questionsE = [
    /*1*/ "What command would you use to create a new Git repository in your current directory?",
    /*2*/ "",
    /*3*/ "",
    /*4*/ ""
]

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
