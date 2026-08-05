// ==========================
// WORDS
// ==========================

const words = [
"agenda", "agreement", "analysis", "annual", "applicant",
"application", "approval", "assets", "balance", "benefit",
"budget", "business", "candidate", "capital", "career",
"client", "company", "compensation", "competition", "contract",
"cost", "credit", "customer", "deadline", "decision",
"department", "development", "distribution", "document", "earnings",
"economy", "employee", "employer", "employment", "enterprise",
"evaluation", "expense", "finance", "forecast", "goal",
"growth", "income", "industry", "inflation", "initiative",
"innovation", "inquiry", "insurance", "investment", "invoice",
"issue", "labor", "launch", "leader", "management",
"manager", "market", "marketing", "meeting", "negotiation",
"objective", "opportunity", "organization", "output", "partner",
"payment", "performance", "policy", "portfolio", "position",
"profit", "project", "proposal", "prospect", "purchase",
"quality", "quarter", "recruitment", "revenue", "salary",
"schedule", "service", "share", "strategy", "supplier",
"target", "task", "team", "tender", "trade",
"training", "transaction", "transfer", "transport", "value",
"wage", "workforce", "workshop"
];
const hints = {
    agenda: "A list of topics for a meeting.",
    agreement: "A formal arrangement between two or more parties.",
    analysis: "Careful study of something to understand it.",
    annual: "Happening once every year.",
    applicant: "A person who applies for a job or position.",
    application: "A formal request for something.",
    approval: "Permission or official agreement.",
    assets: "Things of value owned by a person or company.",
    balance: "The amount of money in an account or equal parts.",
    benefit: "Something that helps or improves a situation.",

    budget: "A plan of income and expenses.",
    business: "An organization that sells goods or services.",
    candidate: "A person being considered for a job.",
    capital: "Money used to start or run a business.",
    career: "A person's long-term professional work life.",

    client: "A person or company that receives services.",
    company: "A business organization.",
    compensation: "Payment given for work or loss.",
    competition: "A situation where businesses or people try to win.",
    contract: "A legal agreement between parties.",

    cost: "The amount of money needed for something.",
    credit: "Money added to an account or trust given to borrow.",
    customer: "A person who buys goods or services.",
    deadline: "The final time to complete something.",
    decision: "A choice made after thinking.",

    department: "A section of a company or organization.",
    development: "Growth or improvement over time.",
    distribution: "The process of delivering goods.",
    document: "A written or printed piece of information.",
    earnings: "Money gained from work or business.",

    economy: "The system of production and trade in a country.",
    employee: "A person who works for a company.",
    employer: "A person or company that hires workers.",
    employment: "The state of having a job.",
    enterprise: "A business or company.",

    evaluation: "Judging or assessing something.",
    expense: "Money spent on something.",
    finance: "Management of money.",
    forecast: "A prediction of future events.",
    goal: "An aim or target.",

    growth: "Increase in size, value, or importance.",
    income: "Money earned.",
    industry: "A group of companies producing similar goods.",
    inflation: "Increase in prices over time.",
    initiative: "A new plan or action.",

    innovation: "A new idea or method.",
    inquiry: "An official investigation or question.",
    insurance: "Protection against financial loss.",
    investment: "Putting money into something to gain profit.",
    invoice: "A bill for goods or services.",

    issue: "A problem or topic for discussion.",
    labor: "Work, especially physical work.",
    launch: "To start or introduce something new.",
    leader: "A person who guides others.",
    management: "Controlling and organizing a business.",

    manager: "A person in charge of a team or company.",
    market: "A place where goods are bought and sold.",
    marketing: "Promoting and selling products.",
    meeting: "A gathering to discuss something.",
    negotiation: "Discussion to reach an agreement.",

    objective: "A goal or aim.",
    opportunity: "A chance to do something.",
    organization: "A structured group of people.",
    output: "The amount produced.",
    partner: "A person or group working together.",

    payment: "Money given for something.",
    performance: "How well someone or something works.",
    policy: "A set of rules or guidelines.",
    portfolio: "A collection of work or investments.",
    position: "A job or place in a company.",

    profit: "Money earned after costs.",
    project: "A planned task or activity.",
    proposal: "A plan or suggestion.",
    prospect: "A possibility or chance for success.",
    purchase: "To buy something.",

    quality: "How good something is.",
    quarter: "A period of three months.",
    recruitment: "The process of hiring people.",
    revenue: "Total income of a company.",
    salary: "Fixed payment for work.",

    schedule: "A planned timetable.",
    service: "Work done for someone.",
    share: "A part of something or stock in a company.",
    strategy: "A plan to achieve goals.",
    supplier: "A company that provides goods.",

    target: "A goal or objective.",
    task: "A piece of work to be done.",
    team: "A group working together.",
    tender: "A formal offer to do work.",
    trade: "Buying and selling goods.",

    training: "Learning skills for work.",
    transaction: "An exchange of money or goods.",
    transfer: "Moving something from one place to another.",
    transport: "Moving goods or people.",
    value: "Worth or importance.",

    wage: "Payment for work, usually hourly.",
    workforce: "All employees in a company.",
    workshop: "A training or learning session."
};

// ==========================
// GAME VARIABLES
// ==========================

let selectedWord = "";
let selectedHint = "";

let guessedLetters = [];

let attemptsLeft = 6;

let score = 0;

let gameOver = false;

// ==========================
// ELEMENTS
// ==========================

const fullscreenBtn =
    document.getElementById("fullscreen-btn");

const wordDisplay =
    document.getElementById("word-display");

const hintDisplay =
    document.getElementById("hint");

const attemptsDisplay =
    document.getElementById("attempts");

const keyboard =
    document.getElementById("keyboard");

const newGameBtn =
    document.getElementById("new-game-btn");

const scoreDisplay =
    document.getElementById("score");

// ==========================
// POPUP
// ==========================

const resultPopup =
    document.getElementById("result-popup");

const popupMessage =
    document.getElementById("popup-message");

const popupWord =
    document.getElementById("popup-word");

const popupButton =
    document.getElementById("popup-button");

// ==========================
// HANGMAN BODY PARTS
// ==========================

const bodyParts = [

    document.getElementById("head"),

    document.getElementById("body"),

    document.getElementById("left-arm"),

    document.getElementById("right-arm"),

    document.getElementById("left-leg"),

    document.getElementById("right-leg")
];

// ==========================
// AUDIO
// ==========================

const correctSound =
    new Audio("audio/correct.mp3");

const wrongSound =
    new Audio("audio/wrong.mp3");

const winSound =
    new Audio("audio/win.mp3");

const loseSound =
    new Audio("audio/lose.mp3");

const clickSound =
    new Audio("audio/click.mp3");

// ==========================
// SPEAK WORD
// ==========================

function speakWord(word) {

    const speech =
        new SpeechSynthesisUtterance(word);

    speech.lang = "en-US";

    speech.rate = 0.9;

    speech.pitch = 1;

    speech.volume = 1;

    speechSynthesis.speak(speech);
}

// ==========================
// START GAME
// ==========================

function startGame() {

    guessedLetters = [];

    attemptsLeft = 6;

    gameOver = false;

    resultPopup.style.display = "none";

    // Hide body parts
    bodyParts.forEach(part => {

        part.style.display = "none";
    });

    // Random word
    const random =
        words[Math.floor(Math.random() * words.length)];

    selectedWord =
        random.toUpperCase();;

    selectedHint =
       selectedHint = hints[random.word];

    hintDisplay.textContent =
        "Hint: " + selectedHint;

    createKeyboard();

    updateWordDisplay();

    updateAttempts();

    updateScore();
}

// ==========================
// CREATE KEYBOARD
// ==========================

function createKeyboard() {

    keyboard.innerHTML = "";

    const letters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    letters.split("").forEach(letter => {

        const btn =
            document.createElement("button");

        btn.textContent = letter;

        btn.classList.add("letter-btn");

        btn.addEventListener("click", () => {

            if (gameOver) return;

            clickSound.play();

            handleGuess(letter);

            btn.disabled = true;
        });

        keyboard.appendChild(btn);
    });
}

// ==========================
// HANDLE LETTER GUESS
// ==========================

function handleGuess(letter) {

    if (gameOver) return;

    guessedLetters.push(letter);

    // ======================
    // CORRECT LETTER
    // ======================

    if (selectedWord.includes(letter)) {

        correctSound.play();

        score += 10;

        updateScore();
    }

    // ======================
    // WRONG LETTER
    // ======================

    else {

        attemptsLeft--;

        wrongSound.play();

        score -= 1;

        updateScore();

        updateAttempts();

        const partIndex =
            6 - attemptsLeft - 1;

        if (bodyParts[partIndex]) {

            bodyParts[partIndex].style.display = "block";
        }
    }

    updateWordDisplay();

    checkGame();
}

// ==========================
// UPDATE WORD DISPLAY
// ==========================

function updateWordDisplay() {

    let display = "";

    for (let letter of selectedWord) {

        if (guessedLetters.includes(letter)) {

            display += letter + " ";
        }

        else {

            display += "_ ";
        }
    }

    wordDisplay.textContent = display;
}

// ==========================
// UPDATE ATTEMPTS
// ==========================

function updateAttempts() {

    attemptsDisplay.textContent =
        "Attempts Left: " + attemptsLeft;
}

// ==========================
// UPDATE SCORE
// ==========================

function updateScore() {

    scoreDisplay.textContent =
        "Score: " + score;
}

// ==========================
// CHECK GAME
// ==========================

function checkGame() {

    // WIN CONDITION

    const won =
        selectedWord
            .split("")
            .every(letter =>
                guessedLetters.includes(letter)
            );

 if (won) {

    gameOver = true;

    winSound.play();

    disableKeyboard();

    showPopup(
        "YOU WIN!",
        selectedWord
    );

    setTimeout(() => {

        speakWord(selectedWord);

    }, 600);

    return;
}

    // LOSE CONDITION

    if (attemptsLeft <= 0) {

    gameOver = true;

    loseSound.play();

    disableKeyboard();

    showPopup(
        "YOU LOST!",
        selectedWord
    );

    setTimeout(() => {

        speakWord(selectedWord);

    }, 600);
}
}

// ==========================
// DISABLE KEYBOARD
// ==========================

function disableKeyboard() {

    const buttons =
        document.querySelectorAll(".letter-btn");

    buttons.forEach(btn => {

        btn.disabled = true;
    });
}

// ==========================
// SHOW POPUP
// ==========================

function showPopup(title, word) {

    popupMessage.textContent = title;

    popupWord.textContent = word;

    resultPopup.style.display = "flex";
}

// ==========================
// POPUP BUTTON
// ==========================

popupButton.addEventListener("click", () => {

    startGame();
});

// ==========================
// FULLSCREEN BUTTON
// ==========================

fullscreenBtn.addEventListener("click", () => {

    if (!document.fullscreenElement) {

        document.documentElement.requestFullscreen();
    }

    else {

        document.exitFullscreen();
    }
});

// ==========================
// START GAME
// ==========================

startGame();