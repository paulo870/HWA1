document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // GLOBAL VARIABLES
    // ==========================

    let selectedTopic = null;

    let selectedUnit = null;

    let remainingPlayers = [];

    let playOrder = [];

    let players = [];

    let scores = {};

    let currentQuestions = [];

    let currentQuestion = null;

    let currentPlayerIndex = 0;

    let currentRotation = 0;

    let spinning = false;

    // ==========================
    // QUESTION DATABASE
    // ==========================

    const gameData = {

        unit1: {

            vocabulary: [

                {
                    question: "agendaMoney the bank lends and someone borrows",

                    options: [
                        "meeting plan",
                        "loan",
                        "printer",
                        "office"
                    ],

                    answer: "large amount of money to start a business"
                },

                {
                    question: "people who would like to start their first business",

                    options: [
                        "money plan",
                        "employee",
                        "computer",
                        "manager"
                    ],

                    answer: "monney plan"
                },

                {
                    question: "People (or organizations) who might put money into a business to make more money",

                    options: [
                        "final date",
                        "coffee break",
                        "manager",
                        "printer"
                    ],

                    answer: "final date"
                },
                {
                    question: "profits that a company pays to people who own shares in the business",

                    options: [
                        "final date",
                        "coffee break",
                        "manager",
                        "printer"
                    ],

                    answer: "final date"
                },
                {
                    question: "predictions about how much money a company might make in the future",

                    options: [
                        "final date",
                        "coffee break",
                        "manager",
                        "printer"
                    ],

                    answer: "final date"
                },
                {
                    question: "a payment to someone who sells the goods or service on your behalf",

                    options: [
                        "final date",
                        "coffee break",
                        "manager",
                        "printer"
                    ],

                    answer: "final date"
                },
                {
                    question: "units which a company can be divided into and sold to raise money",

                    options: [
                        "final date",
                        "coffee break",
                        "manager",
                        "printer"
                    ],

                    answer: "final date"
                },
                 {
                    question: "shares in a company",

                    options: [
                        "final date",
                        "coffee break",
                        "manager",
                        "printer"
                    ],

                    answer: "final date"
                },
            ],

            grammar: [

                {
                    question:
                        "Choose the correct sentence",

                    options: [
                        "I will travel tomorrow",
                        "I travels tomorrow",
                        "I traveling tomorrow",
                        "I travel yesterday"
                    ],

                    answer:
                        "I will travel tomorrow"
                }

            ],

            business_communication: [

                {
                    question:
                        "What is a meeting?",

                    options: [
                        "discussion",
                        "salary",
                        "printer",
                        "contract"
                    ],

                    answer: "discussion"
                }

            ]
        }
    };

    // ==========================
    // ELEMENTS
    // ==========================

    const fullscreenBtn =
        document.getElementById("fullscreen-btn");

    const unitGrid =
        document.getElementById("unit-grid");

    const playerCount =
        document.getElementById("player-count");

    const playerInputs =
        document.getElementById("player-inputs");

    const startBtn =
        document.getElementById("start-btn");

    const wheelCanvas =
        document.getElementById("wheel");

    const spinBtn =
        document.getElementById("spin-btn");

    const wheelResult =
        document.getElementById("wheel-result");

    const ctx =
        wheelCanvas.getContext("2d");

    // ==========================
    // FULLSCREEN
    // ==========================

    fullscreenBtn.addEventListener("click", () => {

        if (!document.fullscreenElement) {

            document.documentElement.requestFullscreen();

        } else {

            document.exitFullscreen();
        }
    });

    // ==========================
    // SCREEN SWITCHING
    // ==========================

    function showScreen(screenId){

        document.querySelectorAll(".screen")
            .forEach(screen => {

                screen.classList.remove("active");
            });

        document.getElementById(screenId)
            .classList.add("active");
    }

    // ==========================
    // UNIT SELECTION
    // ==========================

    for(let i = 1; i <= 12; i++){

        const card =
            document.createElement("div");

        card.classList.add("unit-card");

        card.textContent = `Unit ${i}`;

        card.addEventListener("click", () => {

            selectedUnit = i;

            showScreen("player-screen");
        });

        unitGrid.appendChild(card);
    }

    // ==========================
    // PLAYER INPUTS
    // ==========================

    playerCount.addEventListener(
        "change",
        createPlayerInputs
    );

    createPlayerInputs();

    function createPlayerInputs(){

        playerInputs.innerHTML = "";

        const count =
            Number(playerCount.value);

        for(let i = 1; i <= count; i++){

            const input =
                document.createElement("input");

            input.type = "text";

            input.placeholder =
                `Player ${i}`;

            input.classList.add("player-input");

            playerInputs.appendChild(input);
        }
    }

    // ==========================
    // START BUTTON
    // ==========================

    startBtn.addEventListener("click", () => {

        players = [];

        const inputs =
            document.querySelectorAll(".player-input");

        inputs.forEach((input, index) => {

            let name =
                input.value.trim();

            if(name === ""){

                name =
                    `Player ${index + 1}`;
            }

            players.push(name);
        });

        remainingPlayers = [...players];

        playOrder = [];

        showScreen("topic-screen");
    });

    // ==========================
    // TOPIC SELECTION
    // ==========================

    const topicCards =
        document.querySelectorAll(".topic-card");

    topicCards.forEach(card => {

        card.addEventListener("click", () => {

            selectedTopic =
                card.dataset.topic;

            drawWheel();

            spinBtn.disabled = false;

            wheelResult.innerHTML = "";

            showScreen("wheel-screen");
        });
    });

    // ==========================
    // DRAW WHEEL
    // ==========================

    function drawWheel(){

        const total =
            remainingPlayers.length;

        const arc =
            (Math.PI * 2) / total;

        ctx.clearRect(
            0,
            0,
            wheelCanvas.width,
            wheelCanvas.height
        );

        const colors = [
            "#00c6ff",
            "#00e676",
            "#ffca28",
            "#ff7043",
            "#ab47bc",
            "#26c6da",
            "#ec407a",
            "#7e57c2"
        ];

        for(let i = 0; i < total; i++){

            const angle =
                i * arc;

            ctx.beginPath();

            ctx.moveTo(250, 250);

            ctx.arc(
                250,
                250,
                240,
                angle,
                angle + arc
            );

            ctx.closePath();

            ctx.fillStyle =
                colors[i % colors.length];

            ctx.fill();

            ctx.lineWidth = 4;

            ctx.strokeStyle = "white";

            ctx.stroke();

            ctx.save();

            ctx.translate(250, 250);

            ctx.rotate(angle + arc / 2);

            ctx.fillStyle = "white";

            ctx.font =
                "bold 24px Arial";

            ctx.textAlign = "right";

            ctx.fillText(
                remainingPlayers[i],
                210,
                10
            );

            ctx.restore();
        }
    }

    // ==========================
    // SPIN BUTTON
    // ==========================

    spinBtn.addEventListener("click", () => {

        if(spinning) return;

        spinBtn.disabled = true;

        autoSpin();
    });

    // ==========================
    // AUTO SPIN
    // ==========================

    function autoSpin(){

        if(remainingPlayers.length === 1){

            playOrder.push(
                remainingPlayers[0]
            );

            setTimeout(() => {

                showScreen("game-screen");

                startRealGame();

            }, 1500);

            return;
        }

        spinning = true;

        const randomDeg =
            Math.floor(
                3000 + Math.random() * 3000
            );

        currentRotation += randomDeg;

        wheelCanvas.style.transition =
            "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)";

        wheelCanvas.style.transform =
            `rotate(${currentRotation}deg)`;

        setTimeout(() => {

            determineWinner();

            wheelCanvas.style.transition =
                "none";

            wheelCanvas.style.transform =
                "rotate(0deg)";

            currentRotation = 0;

            setTimeout(() => {

                autoSpin();

            }, 1000);

        }, 4000);
    }

    // ==========================
    // DETERMINE WINNER
    // ==========================

    function determineWinner(){

    const total =
        remainingPlayers.length;

    const slice =
        360 / total;

    // IMPORTANT:
    // We use MOD because wheel is visually rotated AND reset each time
    const finalRotation =
        ((currentRotation % 360) + 360) % 360;

    // Pointer is at TOP (12 o'clock) in canvas math
    // so NO +90 correction needed in YOUR current setup
    const adjusted =
        (360 - finalRotation) % 360;

    const index =
        Math.floor(adjusted / slice) % total;

    const winner =
        remainingPlayers[index];

    playOrder.push(winner);

    remainingPlayers.splice(index, 1);

    wheelResult.innerHTML =
        `
        <h2>Current Order</h2>
        ${playOrder.map((player, i) =>
            `<div>${i + 1}. ${player}</div>`
        ).join("")}
        `;

    drawWheel();
}

    // ==========================
    // START REAL GAME
    // ==========================

    function startRealGame(){

        scores = {};

        currentPlayerIndex = 0;

        playOrder.forEach(player => {

            scores[player] = 0;
        });

        const unitKey =
            `unit${selectedUnit}`;

        const unitData =
            gameData[unitKey];

        if(selectedTopic === "All"){

            currentQuestions = [

                ...unitData.vocabulary,

                ...unitData.grammar,

                ...unitData.business_communication
            ];

        } else {

            const topicKey =
                selectedTopic
                    .toLowerCase()
                    .replace(" ", "_");

            currentQuestions =
                [...unitData[topicKey]];
        }

        shuffleArray(currentQuestions);

        updateScoreBoard();

        loadQuestion();
    }

    // ==========================
    // LOAD QUESTION
    // ==========================

    function loadQuestion(){

        if(currentQuestions.length === 0){

            endGame();

            return;
        }

        currentQuestion =
            currentQuestions.pop();

        const currentPlayer =
            playOrder[currentPlayerIndex];

        document.getElementById(
            "current-player"
        ).textContent =
            `${currentPlayer}'s Turn`;

        document.getElementById(
            "question-word"
        ).textContent =
            currentQuestion.question;

        const answerButtons =
            document.getElementById(
                "answer-buttons"
            );

        answerButtons.innerHTML = "";

        const shuffledOptions =
            [...currentQuestion.options];

        shuffleArray(shuffledOptions);

        shuffledOptions.forEach(option => {

            const btn =
                document.createElement("button");

            btn.textContent = option;

            btn.classList.add("answer-btn");

            btn.addEventListener("click", () => {

                checkAnswer(option);
            });

            answerButtons.appendChild(btn);
        });
    }

    // ==========================
    // CHECK ANSWER
    // ==========================

    function checkAnswer(selectedAnswer){

    const currentPlayer =
        playOrder[currentPlayerIndex];

    const correct =
        selectedAnswer === currentQuestion.answer;

    if(correct){

        scores[currentPlayer]++;
    }

    updateScoreBoard();

    const answerButtons =
        document.getElementById(
            "answer-buttons"
        );

    answerButtons.innerHTML = "";

    const resultBox =
        document.createElement("div");

    resultBox.id = "result-box";

    resultBox.innerHTML =
        `
        <h2>
            ${correct ? "✅ Correct!" : "❌ Wrong!"}
        </h2>

        <p>
            Correct Answer:
            <strong>
                ${currentQuestion.answer}
            </strong>
        </p>
        `;

    answerButtons.appendChild(resultBox);

    // ==========================
// SPEECH
// ==========================

speechSynthesis.cancel();

// QUESTION

const questionSpeech =
    new SpeechSynthesisUtterance(
        currentQuestion.question
    );

questionSpeech.lang = "en-US";

questionSpeech.rate = 0.7;

questionSpeech.pitch = 1;

speechSynthesis.speak(questionSpeech);

// ANSWER AFTER PAUSE

setTimeout(() => {

    const answerSpeech =
        new SpeechSynthesisUtterance(
            `${currentQuestion.answer}`
        );

    answerSpeech.lang = "en-US";

    answerSpeech.rate = 0.65;

    answerSpeech.pitch = 1;

    speechSynthesis.speak(answerSpeech);

}, 3500);

    // ==========================
    // CONTROL BUTTONS
    // ==========================

    const controls =
        document.createElement("div");

    controls.id = "result-controls";

    controls.innerHTML =
        `
        <button id="continue-btn">
            Continue
        </button>

        <button id="finish-btn">
            Finish Game
        </button>
        `;

    answerButtons.appendChild(controls);

    // CONTINUE

    document.getElementById(
        "continue-btn"
    ).addEventListener("click", () => {

        currentPlayerIndex++;

        if(currentPlayerIndex >= playOrder.length){

            currentPlayerIndex = 0;
        }

        loadQuestion();
    });

    // FINISH GAME

    document.getElementById(
        "finish-btn"
    ).addEventListener("click", () => {

        showFinalScreen();
    });
}
    // ==========================
    // SCOREBOARD
    // ==========================

    function updateScoreBoard(){

        const scoreBoard =
            document.getElementById(
                "score-board"
            );

        scoreBoard.innerHTML = "";

        playOrder.forEach(player => {

            const div =
                document.createElement("div");

            div.textContent =
                `${player}: ${scores[player]}`;

            scoreBoard.appendChild(div);
        });
    }

    // ==========================
    // END GAME
    // ==========================

    function endGame(){

        let winner =
            playOrder[0];

        playOrder.forEach(player => {

            if(scores[player] > scores[winner]){

                winner = player;
            }
        });

        alert(
            `${winner} wins the game!`
        );
    }
function showFinalScreen(){

    showScreen("final-screen");

    const finalResults =
        document.getElementById(
            "final-results"
        );

    const sortedPlayers =
        [...playOrder].sort((a, b) =>
            scores[b] - scores[a]
        );

    finalResults.innerHTML = "";

    sortedPlayers.forEach((player, index) => {

        const div =
            document.createElement("div");

        div.classList.add("final-player");

        if(index === 0){

            div.classList.add("winner");
        }

        div.innerHTML =
            `
            <h2>
                ${index + 1}. ${player}
            </h2>

            <p>
                ${scores[player]} points
            </p>
            `;

        finalResults.appendChild(div);
    });
}
    // ==========================
    // SHUFFLE
    // ==========================

    function shuffleArray(array){

        for(let i = array.length - 1; i > 0; i--){

            const j =
                Math.floor(
                    Math.random() * (i + 1)
                );

            [array[i], array[j]] =
                [array[j], array[i]];
        }
    }

});